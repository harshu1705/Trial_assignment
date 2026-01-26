import { ExecutableNode, ExecutionContext } from "../types";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class VisionNodeExecutor implements ExecutableNode {
    async execute(input: any, context: ExecutionContext): Promise<any> {
        const imageUrl = input.imageUrl || input.image || "";
        const prompt = input.prompt || "Describe this image in detail";

        context.log(this.constructor.name, `Executing Vision Node for image: ${imageUrl}`);

        try {
            // Initialize Gemini Vision
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Fetch image (in production, handle various sources)
            const imageResponse = await fetch(imageUrl);
            const imageBuffer = await imageResponse.arrayBuffer();
            const base64Image = Buffer.from(imageBuffer).toString('base64');

            const imagePart = {
                inlineData: {
                    data: base64Image,
                    mimeType: imageResponse.headers.get('content-type') || 'image/jpeg'
                }
            };

            // Generate content with vision
            const result = await model.generateContent([prompt, imagePart]);
            const response = result.response;
            const description = response.text();

            context.log(this.constructor.name, `Generated description: ${description.substring(0, 100)}...`);

            return {
                description,
                imageUrl,
                prompt,
                model: "gemini-1.5-flash"
            };

        } catch (error: any) {
            context.log(this.constructor.name, `Error: ${error.message}`);
            throw new Error(`Vision execution failed: ${error.message}`);
        }
    }
}
