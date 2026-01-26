import { ExecutableNode } from "./types";
import { DebugNodeExecutor } from "./nodes/DebugNodeExecutor";
import { TextNodeExecutor } from "./nodes/TextNodeExecutor";

export const executorRegistry: Record<string, new () => ExecutableNode> = {
    "debug": DebugNodeExecutor,
    "text": TextNodeExecutor,
};
