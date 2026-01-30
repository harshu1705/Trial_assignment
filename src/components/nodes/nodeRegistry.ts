import { NodeTypes } from "@xyflow/react";
import { DebugNode } from "./DebugNode";
import { TextNode } from "./TextNode";
import { LLMNode } from "./LLMNode";
import { VisionNode } from "./VisionNode";
import { UploadImageNode } from "./UploadImageNode";
import { UploadVideoNode } from "./UploadVideoNode";
import { CropImageNode } from "./CropImageNode";
import { ExtractFrameNode } from "./ExtractFrameNode";

export const nodeRegistry: NodeTypes = {
    debug: DebugNode,
    text: TextNode,
    llm: LLMNode,
    vision: VisionNode,
    uploadImage: UploadImageNode,
    uploadVideo: UploadVideoNode,
    cropImage: CropImageNode,
    extractFrame: ExtractFrameNode,
};
