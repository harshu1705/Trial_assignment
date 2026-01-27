import { ExecutableNode, ExecutionContext } from "../types";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class LLMNodeExecutor implements ExecutableNode {
    async execute(input: any, context: ExecutionContext): Promise<any> {
        const prompt = input.prompt || input.text || "";

        context.log(this.constructor.name, `Executing LLM Node with prompt: "${prompt.substring(0, 50)}..."`);

        try {
            // Initialize Gemini
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Generate content
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            context.log(this.constructor.name, `Generated ${text.length} characters`);

            return {
                response: text,
                text: text,
                llmResponse: {
                    text: text
                },
                prompt: prompt,
                model: "gemini-1.5-flash"
            };

        } catch (error: any) {
            context.log(this.constructor.name, `Error: ${error.message}`);
            throw new Error(`LLM execution failed: ${error.message}`);
        }
    }
}
