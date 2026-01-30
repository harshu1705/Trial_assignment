import { task } from '@trigger.dev/sdk/v3';
import * as fs from 'fs/promises';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const ffmpegCropTask = task({
  id: 'ffmpeg-crop',
  maxDuration: 300,
  run: async (payload: {
    imageUrl: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    const { imageUrl, x, y, width, height } = payload;

    try {
      // Download image
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image');

      const buffer = await response.arrayBuffer();
      const inputPath = path.join('/tmp', `crop-input-${Date.now()}.jpg`);
      const outputPath = path.join('/tmp', `crop-output-${Date.now()}.jpg`);

      // Save input image
      await fs.writeFile(inputPath, Buffer.from(buffer));

      // Run FFmpeg crop command
      const cropCmd = `ffmpeg -i ${inputPath} -vf "crop=${width}:${height}:${x}:${y}" ${outputPath}`;
      await execAsync(cropCmd);

      // Read output
      const croppedBuffer = await fs.readFile(outputPath);

      // Upload to temporary storage (S3 or similar)
      const croppedUrl = await uploadToStorage(croppedBuffer);

      // Cleanup
      await fs.unlink(inputPath);
      await fs.unlink(outputPath);

      return {
        success: true,
        croppedUrl,
      };
    } catch (error) {
      throw error;
    }
  },
});

export const ffmpegExtractFrameTask = task({
  id: 'ffmpeg-extract-frame',
  maxDuration: 300,
  run: async (payload: {
    videoUrl: string;
    timestamp: string;
  }) => {
    const { videoUrl, timestamp } = payload;

    try {
      // Download video
      const response = await fetch(videoUrl);
      if (!response.ok) throw new Error('Failed to fetch video');

      const buffer = await response.arrayBuffer();
      const inputPath = path.join('/tmp', `extract-input-${Date.now()}.mp4`);
      const outputPath = path.join('/tmp', `frame-${Date.now()}.jpg`);

      // Save input video
      await fs.writeFile(inputPath, Buffer.from(buffer));

      // Run FFmpeg extract frame command
      const extractCmd = `ffmpeg -ss ${timestamp} -i ${inputPath} -vframes 1 ${outputPath}`;
      await execAsync(extractCmd);

      // Read output
      const frameBuffer = await fs.readFile(outputPath);

      // Upload to temporary storage
      const frameUrl = await uploadToStorage(frameBuffer);

      // Cleanup
      await fs.unlink(inputPath);
      await fs.unlink(outputPath);

      return {
        success: true,
        frameUrl,
      };
    } catch (error) {
      throw error;
    }
  },
});

async function uploadToStorage(buffer: Buffer): Promise<string> {
  // TODO: Implement S3 upload or use Transloadit
  // For now, return a mock URL
  return `https://example.com/processed-${Date.now()}.jpg`;
}
