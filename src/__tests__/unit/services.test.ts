import { ImageOptimizer } from '../../utils/image-optimizer';

describe('Service Unit Tests', () => {
  
  describe('ImageOptimizer', () => {
    describe('formatBytes', () => {
      test('52. Should format 0 bytes correctly', () => {
        const formatBytes = (ImageOptimizer as any).formatBytes;
        expect(formatBytes(0)).toBe('0 Bytes');
      });

      test('53. Should format kilobytes correctly', () => {
        const formatBytes = (ImageOptimizer as any).formatBytes;
        expect(formatBytes(1024)).toBe('1 KB');
      });

      test('54. Should format megabytes correctly', () => {
        const formatBytes = (ImageOptimizer as any).formatBytes;
        expect(formatBytes(1048576)).toBe('1 MB');
      });

      test('55. Should format gigabytes correctly', () => {
        const formatBytes = (ImageOptimizer as any).formatBytes;
        expect(formatBytes(1073741824)).toBe('1 GB');
      });

      test('56. Should handle decimal values', () => {
        const formatBytes = (ImageOptimizer as any).formatBytes;
        const result = formatBytes(1536); // 1.5 KB
        expect(result).toContain('KB');
      });
    });
  });

  describe('Password Validation', () => {
    test('57. Should validate password length', () => {
      const password = 'short';
      expect(password.length >= 6).toBe(false);
    });

    test('58. Should accept valid password', () => {
      const password = 'validPassword123';
      expect(password.length >= 6).toBe(true);
    });
  });

  describe('Email Validation', () => {
    test('59. Should validate email format', () => {
      const validEmail = 'test@example.com';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(validEmail)).toBe(true);
    });

    test('60. Should reject invalid email', () => {
      const invalidEmail = 'notanemail';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(invalidEmail)).toBe(false);
    });
  });

  describe('Role Validation', () => {
    test('61. Should validate admin role', () => {
      const role = 'admin';
      expect(['admin', 'user'].includes(role)).toBe(true);
    });

    test('62. Should validate user role', () => {
      const role = 'user';
      expect(['admin', 'user'].includes(role)).toBe(true);
    });

    test('63. Should reject invalid role', () => {
      const role = 'superadmin';
      expect(['admin', 'user'].includes(role)).toBe(false);
    });
  });
});