import { NodeTypes } from "@xyflow/react";
import { DebugNode } from "./DebugNode";
import { TextNode } from "./TextNode";
import { LLMNode } from "./LLMNode";
import { VisionNode } from "./VisionNode";

export const nodeRegistry: NodeTypes = {
    debug: DebugNode,
    text: TextNode,
    llm: LLMNode,
    vision: VisionNode,
};
