import { ExecutableNode, ExecutionContext } from "../types";

export class UploadVideoNodeExecutor implements ExecutableNode {
    async execute(input: Record<string, unknown>, context: ExecutionContext): Promise<Record<string, unknown>> {
        context.log("uploadVideo", "Executing Upload Video Node...");

        const videoUrl = input.videoUrl as string;

        if (!videoUrl) {
            context.log("uploadVideo", "⚠️ No video URL found in node data.");
        } else {
            context.log("uploadVideo", `Outputting video URL: "${videoUrl.substring(0, 50)}..."`);
        }

        // Pass through the videoUrl to downstream nodes
        return {
            videoUrl: videoUrl || "",
        };
    }
}
