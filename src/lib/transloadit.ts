import crypto from 'crypto';

interface TransloaditTemplate {
  steps: Record<string, any>;
}

interface TransloaditAuth {
  auth_token: string;
  auth_expires: string;
}

export class TransloaditService {
  private authKey = process.env.TRANSLOADIT_AUTH_KEY!;
  private authSecret = process.env.TRANSLOADIT_SECRET!;

  /**
   * Generate authentication token for uploads
   */
  generateAuth(): TransloaditAuth {
    const authExpires = new Date();
    authExpires.setHours(authExpires.getHours() + 24); // 24 hours
    
    const expiresUnix = Math.floor(authExpires.getTime() / 1000);
    
    const tokenString = JSON.stringify({
      key: this.authKey,
      expires: expiresUnix,
    });

    const token = crypto
      .createHmac('sha1', this.authSecret)
      .update(tokenString)
      .digest('hex');

    return {
      auth_token: token,
      auth_expires: expiresUnix.toString(),
    };
  }

  /**
   * Create a simple passthrough template for image upload
   */
  getImageUploadTemplate(): TransloaditTemplate {
    return {
      steps: {
        import: {
          robot: '/http/import',
          url: 'https://example.com/image.jpg',
        },
        resize: {
          robot: '/image/resize',
          width: 1920,
          height: 1080,
          max_width: 1920,
          max_height: 1080,
          format: 'jpeg',
          quality: 85,
        },
        encode: {
          robot: '/file/encode',
          use: 'resize',
          format: 'jpeg',
        },
      },
    };
  }

  /**
   * Create a video transcoding template
   */
  getVideoUploadTemplate(): TransloaditTemplate {
    return {
      steps: {
        import: {
          robot: '/http/import',
          url: 'https://example.com/video.mp4',
        },
        transcode: {
          robot: '/video/transcode',
          format: 'mp4',
          preset: 'medium',
        },
      },
    };
  }
}

export const transloadit = new TransloaditService();
