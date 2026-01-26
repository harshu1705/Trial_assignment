import { NodeTypes } from "@xyflow/react";
import { DebugNode } from "./DebugNode";
import { TextNode } from "./TextNode";

export const nodeRegistry: NodeTypes = {
    debug: DebugNode,
    text: TextNode,
};
