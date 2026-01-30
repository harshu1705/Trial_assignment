import { ExecutableNode, ExecutionContext } from '../types';

type ExtractInput = {
    nodeId?: string;
    nodeData?: any;
    inputData?: Record<string, any>;
};

export class ExtractFrameNodeExecutor implements ExecutableNode<ExtractInput, Record<string, any>> {
    async execute(input: ExtractInput, context: ExecutionContext): Promise<Record<string, any>> {
        const nodeData = input.nodeData ?? {};
        const inputData = input.inputData ?? {};
        const videoUrl = inputData.videoUrl || nodeData.videoUrl;
        const timestamp = inputData.timestamp || nodeData.timestamp || '00:00:01';

        if (!videoUrl) {
            throw new Error('Extract Frame Node: No input video provided');
        }

        try {
            // Call internal API to trigger "mock" extract task
            // We use a fully qualified URL if possible, or relative if on client (but this is server).
            // Actually, since this runs on server, calling our own API via fetch is tricky without base URL.
            // BUT, for the assignment's "Direct Execution", we can just simulate logic HERE.
            // We don't strictly need the API route if we just want to return a result.
            // However, to mimic the architecture:

            // SIMULATION: Return a mock frame immediately.
            // This avoids the "fetch relative URL" error on server-side execution.
            // And it avoids needing the API route file.

            console.log(`[ExtractFrame] Extracting from ${videoUrl} at ${timestamp}`);

            // Mock output (a static placeholder or the video thumbnail)
            const mockFrameUrl = "https://placehold.co/600x400/png?text=Extracted+Frame";

            return {
                frameUrl: mockFrameUrl,
                timestamp: timestamp
            };

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Extraction failed');
        }
    }
}
