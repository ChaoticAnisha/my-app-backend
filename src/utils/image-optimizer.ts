import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export class ImageOptimizer {
  
  /**
   * Compress and resize image
   * @param inputPath - Original image path
   * @param outputPath - Optimized image path
   * @param maxWidth - Maximum width (default: 1200px)
   * @param quality - JPEG/WebP quality (default: 80)
   */
  static async optimizeImage(
    inputPath: string,
    outputPath?: string,
    maxWidth: number = 1200,
    quality: number = 80
  ): Promise<string> {
    try {
      const output = outputPath || inputPath;
      const tempPath = inputPath + '.tmp'; // Use temporary file
      const metadata = await sharp(inputPath).metadata();
      
      console.log('📸 Optimizing image:', path.basename(inputPath));
      console.log('Original size:', this.formatBytes(fs.statSync(inputPath).size));
      console.log('Original dimensions:', `${metadata.width}x${metadata.height}`);

      // Optimize to temporary file first
      await sharp(inputPath)
        .resize(maxWidth, null, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality, progressive: true, mozjpeg: true })
        .toFile(tempPath);

      const optimizedSize = fs.statSync(tempPath).size;
      const optimizedMetadata = await sharp(tempPath).metadata();
      
      console.log('✅ Optimized size:', this.formatBytes(optimizedSize));
      console.log('✅ Optimized dimensions:', `${optimizedMetadata.width}x${optimizedMetadata.height}`);
      console.log('✅ Compression ratio:', `${((1 - optimizedSize / fs.statSync(inputPath).size) * 100).toFixed(2)}%`);

      // Replace original with optimized
      fs.unlinkSync(inputPath); // Delete original
      fs.renameSync(tempPath, output); // Rename temp to original

      return output;
    } catch (error) {
      console.error('❌ Image optimization failed:', error);
      throw error;
    }
  }

  /**
   * Create multiple sizes (thumbnail, medium, large)
   */
  static async createMultipleSizes(
    inputPath: string,
    outputDir: string,
    filename: string
  ): Promise<{ thumbnail: string; medium: string; large: string; original: string }> {
    try {
      const ext = path.extname(filename);
      const nameWithoutExt = path.basename(filename, ext);

      const sizes = {
        thumbnail: { width: 150, path: path.join(outputDir, `${nameWithoutExt}_thumb${ext}`) },
        medium: { width: 600, path: path.join(outputDir, `${nameWithoutExt}_medium${ext}`) },
        large: { width: 1200, path: path.join(outputDir, `${nameWithoutExt}_large${ext}`) },
      };

      console.log('📸 Creating multiple sizes for:', filename);

      // Create thumbnail
      await sharp(inputPath)
        .resize(sizes.thumbnail.width, sizes.thumbnail.width, { fit: 'cover' })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(sizes.thumbnail.path);

      // Create medium
      await sharp(inputPath)
        .resize(sizes.medium.width, null, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(sizes.medium.path);

      // Create large
      await sharp(inputPath)
        .resize(sizes.large.width, null, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(sizes.large.path);

      console.log('✅ Created thumbnail:', path.basename(sizes.thumbnail.path));
      console.log('✅ Created medium:', path.basename(sizes.medium.path));
      console.log('✅ Created large:', path.basename(sizes.large.path));

      return {
        thumbnail: sizes.thumbnail.path,
        medium: sizes.medium.path,
        large: sizes.large.path,
        original: inputPath,
      };
    } catch (error) {
      console.error('❌ Failed to create multiple sizes:', error);
      throw error;
    }
  }

  /**
   * Convert to WebP format (best compression)
   */
  static async convertToWebP(
    inputPath: string,
    quality: number = 80
  ): Promise<string> {
    try {
      const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      await sharp(inputPath)
        .webp({ quality })
        .toFile(outputPath);

      console.log('✅ Converted to WebP:', path.basename(outputPath));
      
      // Delete original
      fs.unlinkSync(inputPath);
      
      return outputPath;
    } catch (error) {
      console.error('❌ WebP conversion failed:', error);
      throw error;
    }
  }

  /**
   * Format bytes to human-readable
   */
  private static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}
