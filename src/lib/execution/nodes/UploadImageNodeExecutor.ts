import { ExecutableNode, ExecutionContext } from "../types";

export class UploadImageNodeExecutor implements ExecutableNode {
    async execute(input: Record<string, unknown>, context: ExecutionContext): Promise<Record<string, unknown>> {
        context.log("uploadImage", "Executing Upload Image Node...");

        const imageUrl = input.imageUrl as string;

        if (!imageUrl) {
            context.log("uploadImage", "⚠️ No image URL found in node data.");
        } else {
            context.log("uploadImage", `Outputting image URL: "${imageUrl.substring(0, 50)}..."`);
        }

        // Pass through the imageUrl to downstream nodes (like Crop or Vision)
        return {
            imageUrl: imageUrl || "",
            // Also provide 'text' in case it's connected to a text input, though less likely
            text: imageUrl || ""
        };
    }
}
