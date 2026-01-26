import { ExecutableNode } from "./types";
import { TextNodeExecutor } from "./nodes/TextNodeExecutor";
import { DebugNodeExecutor } from "./nodes/DebugNodeExecutor";
import { LLMNodeExecutor } from "./nodes/LLMNodeExecutor";
import { VisionNodeExecutor } from "./nodes/VisionNodeExecutor";

export const executorRegistry: Record<string, new () => ExecutableNode> = {
    text: TextNodeExecutor,
    debug: DebugNodeExecutor,
    llm: LLMNodeExecutor,
    vision: VisionNodeExecutor,
};
