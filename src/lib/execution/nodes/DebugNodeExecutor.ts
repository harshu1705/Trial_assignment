import { ExecutableNode, ExecutionContext } from "../types";

export class DebugNodeExecutor implements ExecutableNode {
    async execute(input: Record<string, unknown>, context: ExecutionContext): Promise<Record<string, unknown>> {
        context.log("debug", "Executing Debug Node...");

        // Log all inputs to the console/context
        const inputs = Object.entries(input).map(([key, val]) => `${key}: ${val}`).join(", ");
        context.log("debug", `Received inputs: { ${inputs} }`);

        // Pass input through as output (identity)
        return input;
    }
}
