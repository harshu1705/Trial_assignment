import { ExecutableNode, ExecutionContext } from '../types';

type CropInput = {
  nodeId?: string;
  nodeData?: any;
  inputData?: Record<string, any>;
};

export class CropImageNodeExecutor implements ExecutableNode<CropInput, Record<string, any>> {
  async execute(input: CropInput, context: ExecutionContext): Promise<Record<string, any>> {
    const nodeData = input.nodeData ?? {};
    const inputData = input.inputData ?? {};
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
      // Call internal API to trigger FFmpeg crop task
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
        croppedImageUrl: result.croppedUrl,
        coordinates: { x, y, width, height },
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Crop failed');
    }
  }
}
