import { ImageOptimizer } from '../../utils/image-optimizer';
import fs from 'fs';
import path from 'path';

describe('ImageOptimizer Unit Tests', () => {
  const testImagePath = path.join(__dirname, '../fixtures/test-image.jpg');
  const outputPath = path.join(__dirname, '../fixtures/optimized-test.jpg');

  afterEach(() => {
    // Clean up test files
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });

  describe('formatBytes', () => {
    it('should format bytes correctly', () => {
      // Access private method via any
      const formatBytes = (ImageOptimizer as any).formatBytes;

      expect(formatBytes(0)).toBe('0 Bytes');
      expect(formatBytes(1024)).toBe('1 KB');
      expect(formatBytes(1048576)).toBe('1 MB');
      expect(formatBytes(1073741824)).toBe('1 GB');
    });
  });

  describe('optimizeImage', () => {
    it('should reduce image file size', async () => {
      // Skip if test image doesn't exist
      if (!fs.existsSync(testImagePath)) {
        console.log('⚠️ Test image not found, skipping');
        return;
      }

      const originalSize = fs.statSync(testImagePath).size;

      await ImageOptimizer.optimizeImage(testImagePath, outputPath, 1200, 80);

      const optimizedSize = fs.statSync(outputPath).size;

      expect(optimizedSize).toBeLessThan(originalSize);
      expect(fs.existsSync(outputPath)).toBe(true);
    });

    it('should maintain aspect ratio', async () => {
      if (!fs.existsSync(testImagePath)) {
        return;
      }

      const sharp = require('sharp');
      const originalMetadata = await sharp(testImagePath).metadata();

      await ImageOptimizer.optimizeImage(testImagePath, outputPath, 1200, 80);

      const optimizedMetadata = await sharp(outputPath).metadata();

      const originalRatio = originalMetadata.width / originalMetadata.height;
      const optimizedRatio = optimizedMetadata.width / optimizedMetadata.height;

      expect(Math.abs(originalRatio - optimizedRatio)).toBeLessThan(0.01);
    });
  });
});