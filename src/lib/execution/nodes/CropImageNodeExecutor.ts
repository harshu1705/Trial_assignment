import { ExecutableNode, ExecutionContext } from '../types';

export class CropImageNodeExecutor implements ExecutableNode<Record<string, any>, Record<string, any>> {
  async execute(input: Record<string, any>, context: ExecutionContext): Promise<Record<string, any>> {
    // In engine.ts, 'input' is a flat merge of node.data and upstream results
    const imageUrl = input.imageUrl as string;

    if (!imageUrl) {
      throw new Error('Crop Image Node: No input image provided. Please connect an Image node.');
    }

    // Default crop values from node data
    const crop = input.crop as { x: number, y: number, width: number, height: number } | undefined;
    const { x, y, width, height } = crop || {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    };

    try {
      console.log("Crop input image_url:", imageUrl);
      console.log("Crop params (percent):", x, y, width, height);

      // SIMULATION: Direct Mock execution
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
