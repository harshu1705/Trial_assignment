import { ExecutableNode, ExecutionContext } from "../types";

export class VisionNodeExecutor implements ExecutableNode {
    async execute(input: any, context: ExecutionContext): Promise<any> {
        context.log(this.constructor.name, "VisionNodeExecutor is currently disabled due to Groq migration.");

        throw new Error(
            "Vision Node is not yet supported in the Groq migration. Please check back later."
        );
    }
}
