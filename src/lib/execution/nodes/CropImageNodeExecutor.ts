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
      // SIMULATION: Direct Mock execution to ensure stability without Trigger.dev/FFmpeg
      // Real implementation would use: fetch('/api/execute/crop-image', ...)

      console.log("Crop input image_url:", imageUrl);
      console.log("Crop params:", x, y, width, height);

      // Return the original image or a placeholder to signify "processed"
      // Appending a query param is a good trick to make the browser treat it as "new"
      const separator = imageUrl.includes('?') ? '&' : '?';
      const mockCroppedUrl = `${imageUrl}${separator}cropped=true&t=${Date.now()}`;

      return {
        croppedImageUrl: mockCroppedUrl,
        coordinates: { x, y, width, height },
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Crop failed');
    }
  }
}
