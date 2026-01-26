import { ExecutableNode, ExecutionContext } from "../types";

export class TextNodeExecutor implements ExecutableNode {
    async execute(input: Record<string, unknown>, context: ExecutionContext): Promise<Record<string, unknown>> {
        context.log("text", "Executing Text Node...");

        // In a real scenario, input might come from the node data itself if passed in input
        // But for a source node, we usually rely on the node's configuration data 
        // which should be passed via the input or a separate config.
        // For now, let's assume the text value is passed in the input 'data' field 
        // or we simulate looking it up if we had access to the node config directly.

        // However, the cleanest way in this architecture is that the 'input' arg 
        // contains the node's own data as well (or we fetch it).
        // Let's assume input contains { value: "some text" } for this mock.

        const textValue = input.value as string || "Default Text";

        context.log("text", `Generated text: "${textValue}"`);

        return {
            text: textValue
        };
    }
}
