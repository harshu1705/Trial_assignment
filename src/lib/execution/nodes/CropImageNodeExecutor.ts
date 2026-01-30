import { ExecutableNode } from '../types';

export class CropImageNodeExecutor implements ExecutableNode {
  async execute(
    nodeId: string,
    nodeData: any,
    inputData: Record<string, any>,
    context: any
  ): Promise<any> {
    const imageUrl = inputData.imageUrl || nodeData.imageUrl;
    if (!imageUrl) {
      throw new Error('Crop Image Node: No input image provided');
    }

    const { x, y, width, height } = nodeData.crop || {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    };

    try {
      // Call API to trigger FFmpeg crop task via Trigger.dev
      const response = await fetch('/api/execute/crop-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          x,
          y,
          width,
          height,
        }),
      });

      if (!response.ok) {
        throw new Error('Crop image request failed');
      }

      const result = await response.json();

      return {
        status: 'success',
        output: {
          croppedImageUrl: result.croppedUrl,
          coordinates: { x, y, width, height },
        },
      };
    } catch (error) {
      return {
        status: 'failed',
        error: error instanceof Error ? error.message : 'Crop failed',
      };
    }
  }
}
