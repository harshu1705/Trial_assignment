import { ExecutableNode } from "./types";
import { TextNodeExecutor } from "./nodes/TextNodeExecutor";
import { DebugNodeExecutor } from "./nodes/DebugNodeExecutor";
import { LLMNodeExecutor } from "./nodes/LLMNodeExecutor";
import { VisionNodeExecutor } from "./nodes/VisionNodeExecutor";
import { CropImageNodeExecutor } from "./nodes/CropImageNodeExecutor";
import { ExtractFrameNodeExecutor } from "./nodes/ExtractFrameNodeExecutor";
import { UploadImageNodeExecutor } from "./nodes/UploadImageNodeExecutor";

export const executorRegistry: Record<string, new () => ExecutableNode> = {
    text: TextNodeExecutor,
    debug: DebugNodeExecutor,
    llm: LLMNodeExecutor,
    vision: VisionNodeExecutor,
    uploadImage: UploadImageNodeExecutor,
    uploadVideo: TextNodeExecutor, // Video likely needs its own executor too if it extracts data
    cropImage: CropImageNodeExecutor,
    extractFrame: ExtractFrameNodeExecutor,
};
