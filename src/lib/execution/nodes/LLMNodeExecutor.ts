import { ExecutableNode, ExecutionContext } from "../types";

export class LLMNodeExecutor implements ExecutableNode {
    async execute(input: any, context: ExecutionContext): Promise<any> {
        context.log(this.constructor.name, "LLMNodeExecutor is deprecated. engine.ts now handles LLM nodes directly.");

        throw new Error(
            "LLMNodeExecutor should not be called directly. execution/engine.ts should intercept 'llm' nodes."
        );
    }
}
