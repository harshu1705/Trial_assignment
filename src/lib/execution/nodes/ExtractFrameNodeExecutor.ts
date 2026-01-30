import { ExecutableNode, ExecutionContext } from '../types';

export class ExtractFrameNodeExecutor implements ExecutableNode<Record<string, any>, Record<string, any>> {
    async execute(input: Record<string, any>, context: ExecutionContext): Promise<Record<string, any>> {
        // In engine.ts, 'input' is a flat merge of node.data and upstream results
        const videoUrl = input.videoUrl as string;
        const timestamp = (input.timestamp as string) || '50%';

        if (!videoUrl) {
            // User feedback
            throw new Error('Extract Frame Node: No input video provided. Please connect a Video node.');
        }

        try {
            console.log("Extract input video_url:", videoUrl);
            console.log(`[ExtractFrame] Extracting at ${timestamp}`);

            // SIMULATION: Return a mock frame immediately.
            const mockFrameUrl = "https://placehold.co/600x400/png?text=Extracted+Frame";

            return {
                imageUrl: mockFrameUrl, // Matches requested output key
                timestamp: timestamp
            };

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Extraction failed');
        }
    }
}
