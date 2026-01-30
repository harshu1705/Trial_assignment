import { ExecutableNode } from "./types";
import { TextNodeExecutor } from "./nodes/TextNodeExecutor";
import { DebugNodeExecutor } from "./nodes/DebugNodeExecutor";
import { LLMNodeExecutor } from "./nodes/LLMNodeExecutor";
import { VisionNodeExecutor } from "./nodes/VisionNodeExecutor";
import { CropImageNodeExecutor } from "./nodes/CropImageNodeExecutor";
import { ExtractFrameNodeExecutor } from "./nodes/ExtractFrameNodeExecutor";
import { UploadImageNodeExecutor } from "./nodes/UploadImageNodeExecutor";
import { UploadVideoNodeExecutor } from "./nodes/UploadVideoNodeExecutor";

export const executorRegistry: Record<string, new () => ExecutableNode> = {
    text: TextNodeExecutor,
    debug: DebugNodeExecutor,
    llm: LLMNodeExecutor,
    vision: VisionNodeExecutor,
    uploadImage: UploadImageNodeExecutor,
    uploadVideo: UploadVideoNodeExecutor,
    cropImage: CropImageNodeExecutor,
    extractFrame: ExtractFrameNodeExecutor,
};
