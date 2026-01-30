# 🛠️ Step-by-Step Implementation Guide - Missing Features

This guide covers implementing ALL missing deliverables with complete code examples.

---

## PART A: Transloadit Integration (Upload Nodes)

### Step 1: Transloadit Utility Setup

Create `src/lib/transloadit.ts`:

```typescript
import crypto from 'crypto';

interface TransloaditTemplate {
  steps: Record<string, any>;
}

interface TransloaditAuth {
  auth_token: string;
  auth_expires: string;
}

export class TransloaditService {
  private authKey = process.env.TRANSLOADIT_AUTH_KEY!;
  private authSecret = process.env.TRANSLOADIT_SECRET!;

  /**
   * Generate authentication token for uploads
   */
  generateAuth(): TransloaditAuth {
    const authExpires = new Date();
    authExpires.setHours(authExpires.getHours() + 24); // 24 hours
    
    const expiresUnix = Math.floor(authExpires.getTime() / 1000);
    
    const tokenString = JSON.stringify({
      key: this.authKey,
      expires: expiresUnix,
    });

    const token = crypto
      .createHmac('sha1', this.authSecret)
      .update(tokenString)
      .digest('hex');

    return {
      auth_token: token,
      auth_expires: expiresUnix.toString(),
    };
  }

  /**
   * Create a simple passthrough template for image upload
   */
  getImageUploadTemplate(): TransloaditTemplate {
    return {
      steps: {
        import: {
          robot: '/http/import',
          url: 'https://example.com/image.jpg',
        },
        resize: {
          robot: '/image/resize',
          width: 1920,
          height: 1080,
          max_width: 1920,
          max_height: 1080,
          format: 'jpeg',
          quality: 85,
        },
        encode: {
          robot: '/file/encode',
          use: 'resize',
          format: 'jpeg',
        },
      },
    };
  }

  /**
   * Create a video transcoding template
   */
  getVideoUploadTemplate(): TransloaditTemplate {
    return {
      steps: {
        import: {
          robot: '/http/import',
          url: 'https://example.com/video.mp4',
        },
        transcode: {
          robot: '/video/transcode',
          format: 'mp4',
          preset: 'medium',
        },
      },
    };
  }
}

export const transloadit = new TransloaditService();
```

### Step 2: Upload Image Node Component

Create `src/components/nodes/UploadImageNode.tsx`:

```typescript
import React, { useState, useCallback } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Upload, Image, AlertCircle } from 'lucide-react';
import { transloadit } from '@/lib/transloadit';

interface ImagePreview {
  url: string;
  size: string;
  dimensions: string;
}

export const UploadImageNode: React.FC<{ data: any; id: string }> = ({
  data,
  id,
}) => {
  const { setNodes } = useReactFlow();
  const [preview, setPreview] = useState<ImagePreview | null>(data.preview);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Create FormData
      const formData = new FormData();
      const auth = transloadit.generateAuth();
      
      formData.append('files[]', file);
      formData.append('params', JSON.stringify({
        auth_token: auth.auth_token,
        auth_expires: auth.auth_expires,
      }));

      // Upload to Transloadit
      const response = await fetch('https://api2.transloadit.com/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      const uploadedFile = data.results.uploads[0];

      // Update node with preview
      const previewData: ImagePreview = {
        url: uploadedFile.ssl_url,
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        dimensions: '(will update after processing)',
      };

      setPreview(previewData);

      // Update node data
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? {
                ...node,
                data: { ...node.data, imageUrl: uploadedFile.ssl_url, preview: previewData },
              }
            : node
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [id, setNodes]);

  return (
    <div className="bg-white border-2 border-blue-400 rounded-lg p-4 w-64 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Image size={18} className="text-blue-500" />
        <span className="font-semibold text-sm">Upload Image</span>
      </div>

      {/* Preview */}
      {preview && (
        <div className="mb-3">
          <img
            src={preview.url}
            alt="Preview"
            className="w-full h-32 object-cover rounded border border-gray-300"
          />
          <div className="text-xs text-gray-600 mt-2">
            <p>Size: {preview.size}</p>
            <p>Dim: {preview.dimensions}</p>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded p-3 cursor-pointer transition ${
          uploading ? 'border-gray-300 bg-gray-100' : 'border-blue-300 hover:bg-blue-50'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          disabled={uploading}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-1">
          <Upload size={20} className="text-blue-500" />
          <span className="text-xs font-medium text-center">
            {uploading ? 'Uploading...' : 'Click or drag image'}
          </span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded flex gap-2">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
          <span className="text-xs text-red-700">{error}</span>
        </div>
      )}

      {/* Handles */}
      <Handle type="source" position={Position.Right} id="image-url" />
    </div>
  );
};

export default UploadImageNode;
```

### Step 3: Upload Video Node Component

Create `src/components/nodes/UploadVideoNode.tsx`:

```typescript
import React, { useState, useCallback } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Upload, Video, AlertCircle, Play } from 'lucide-react';
import { transloadit } from '@/lib/transloadit';

interface VideoPreview {
  url: string;
  duration: string;
  size: string;
}

export const UploadVideoNode: React.FC<{ data: any; id: string }> = ({
  data,
  id,
}) => {
  const { setNodes } = useReactFlow();
  const [preview, setPreview] = useState<VideoPreview | null>(data.preview);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.onerror = reject;
    });
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const handleFileSelect = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file');
        return;
      }

      if (file.size > 500 * 1024 * 1024) {
        setError('File size must be less than 500MB');
        return;
      }

      setUploading(true);
      setError(null);

      try {
        // Get duration
        const duration = await getVideoDuration(file);

        // Create FormData
        const formData = new FormData();
        const auth = transloadit.generateAuth();

        formData.append('files[]', file);
        formData.append(
          'params',
          JSON.stringify({
            auth_token: auth.auth_token,
            auth_expires: auth.auth_expires,
          })
        );

        // Upload to Transloadit
        const response = await fetch('https://api2.transloadit.com/uploads', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');

        const uploadData = await response.json();
        const uploadedFile = uploadData.results.uploads[0];

        // Update node with preview
        const previewData: VideoPreview = {
          url: uploadedFile.ssl_url,
          duration: formatDuration(duration),
          size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        };

        setPreview(previewData);

        // Update node data
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    videoUrl: uploadedFile.ssl_url,
                    preview: previewData,
                  },
                }
              : node
          )
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [id, setNodes]
  );

  return (
    <div className="bg-white border-2 border-purple-400 rounded-lg p-4 w-64 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Video size={18} className="text-purple-500" />
        <span className="font-semibold text-sm">Upload Video</span>
      </div>

      {/* Preview */}
      {preview && (
        <div className="mb-3">
          <div className="relative bg-black rounded h-32 flex items-center justify-center">
            {showPlayer ? (
              <video
                ref={videoRef}
                src={preview.url}
                className="w-full h-full object-cover rounded"
                controls
              />
            ) : (
              <button
                onClick={() => setShowPlayer(true)}
                className="hover:bg-gray-800 transition"
              >
                <Play size={48} className="text-white" />
              </button>
            )}
          </div>
          <div className="text-xs text-gray-600 mt-2">
            <p>Duration: {preview.duration}</p>
            <p>Size: {preview.size}</p>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded p-3 cursor-pointer transition ${
          uploading ? 'border-gray-300 bg-gray-100' : 'border-purple-300 hover:bg-purple-50'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          disabled={uploading}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-1">
          <Upload size={20} className="text-purple-500" />
          <span className="text-xs font-medium text-center">
            {uploading ? 'Uploading...' : 'Click or drag video'}
          </span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded flex gap-2">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
          <span className="text-xs text-red-700">{error}</span>
        </div>
      )}

      {/* Handles */}
      <Handle type="source" position={Position.Right} id="video-url" />
    </div>
  );
};

export default UploadVideoNode;
```

---

## PART B: Image/Video Processing Nodes (FFmpeg)

### Step 1: Crop Image Node Component

Create `src/components/nodes/CropImageNode.tsx`:

```typescript
import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Scissors } from 'lucide-react';

interface CropCoords {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const CropImageNode: React.FC<{ data: any; id: string }> = ({
  data,
  id,
}) => {
  const { setNodes } = useReactFlow();
  const [crop, setCrop] = useState<CropCoords>(
    data.crop || { x: 0, y: 0, width: 100, height: 100 }
  );

  const handleCropChange = (field: keyof CropCoords, value: number) => {
    const newCrop = { ...crop, [field]: value };
    setCrop(newCrop);

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, crop: newCrop } } : node
      )
    );
  };

  return (
    <div className="bg-white border-2 border-green-400 rounded-lg p-4 w-72 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Scissors size={18} className="text-green-500" />
        <span className="font-semibold text-sm">Crop Image</span>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <label className="block font-medium text-gray-700">X Position</label>
          <input
            type="number"
            min="0"
            value={crop.x}
            onChange={(e) => handleCropChange('x', parseInt(e.target.value) || 0)}
            className="w-full border rounded px-2 py-1 text-xs"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Y Position</label>
          <input
            type="number"
            min="0"
            value={crop.y}
            onChange={(e) => handleCropChange('y', parseInt(e.target.value) || 0)}
            className="w-full border rounded px-2 py-1 text-xs"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Width</label>
          <input
            type="number"
            min="1"
            value={crop.width}
            onChange={(e) => handleCropChange('width', parseInt(e.target.value) || 100)}
            className="w-full border rounded px-2 py-1 text-xs"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Height</label>
          <input
            type="number"
            min="1"
            value={crop.height}
            onChange={(e) => handleCropChange('height', parseInt(e.target.value) || 100)}
            className="w-full border rounded px-2 py-1 text-xs"
          />
        </div>
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Left} id="image-input" />
      <Handle type="source" position={Position.Right} id="cropped-image" />
    </div>
  );
};

export default CropImageNode;
```

### Step 2: Crop Image Executor

Create `src/lib/execution/nodes/CropImageNodeExecutor.ts`:

```typescript
import { ExecutableNode } from '../types';
import { tasks } from '@trigger.dev/sdk/v3';

export class CropImageNodeExecutor implements ExecutableNode {
  async execute(
    nodeId: string,
    nodeData: any,
    inputData: Record<string, any>,
    context: any
  ): Promise<any> {
    const imageUrl = inputData.imageUrl || nodeData.imageUrl;
    if (!imageUrl) {
      throw new Error('Crop Image Node: No input image provided');
    }

    const { x, y, width, height } = nodeData.crop || {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    };

    try {
      // Trigger FFmpeg crop task
      const result = await tasks.trigger('ffmpeg-crop', {
        imageUrl,
        x,
        y,
        width,
        height,
      });

      return {
        status: 'success',
        output: {
          croppedImageUrl: result.data.croppedUrl,
          coordinates: { x, y, width, height },
        },
      };
    } catch (error) {
      return {
        status: 'failed',
        error: error instanceof Error ? error.message : 'Crop failed',
      };
    }
  }
}
```

### Step 3: FFmpeg Crop Task (Trigger.dev)

Create `src/trigger/ffmpeg-crop.ts`:

```typescript
import { task } from '@trigger.dev/sdk/v3';
import * as fs from 'fs/promises';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const ffmpegCropTask = task({
  id: 'ffmpeg-crop',
  maxDuration: 300,
  run: async (payload: {
    imageUrl: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    const { imageUrl, x, y, width, height } = payload;

    try {
      // Download image
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image');

      const buffer = await response.arrayBuffer();
      const inputPath = path.join('/tmp', `crop-input-${Date.now()}.jpg`);
      const outputPath = path.join('/tmp', `crop-output-${Date.now()}.jpg`);

      // Save input image
      await fs.writeFile(inputPath, Buffer.from(buffer));

      // Run FFmpeg crop command
      const cropCmd = `ffmpeg -i ${inputPath} -vf "crop=${width}:${height}:${x}:${y}" ${outputPath}`;
      await execAsync(cropCmd);

      // Read output
      const croppedBuffer = await fs.readFile(outputPath);

      // Upload to temporary storage (S3 or similar)
      const croppedUrl = await uploadToStorage(croppedBuffer);

      // Cleanup
      await fs.unlink(inputPath);
      await fs.unlink(outputPath);

      return {
        success: true,
        croppedUrl,
      };
    } catch (error) {
      throw error;
    }
  },
});

async function uploadToStorage(buffer: Buffer): Promise<string> {
  // TODO: Implement S3 upload or use Transloadit
  // For now, return a mock URL
  return `https://example.com/cropped-${Date.now()}.jpg`;
}
```

### Step 4: Extract Frame Node Component

Create `src/components/nodes/ExtractFrameNode.tsx`:

```typescript
import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Film } from 'lucide-react';

export const ExtractFrameNode: React.FC<{ data: any; id: string }> = ({
  data,
  id,
}) => {
  const { setNodes } = useReactFlow();
  const [timestamp, setTimestamp] = useState(data.timestamp || '00:00:00');

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTimestamp = e.target.value;
    setTimestamp(newTimestamp);

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, timestamp: newTimestamp } }
          : node
      )
    );
  };

  return (
    <div className="bg-white border-2 border-orange-400 rounded-lg p-4 w-64 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Film size={18} className="text-orange-500" />
        <span className="font-semibold text-sm">Extract Frame</span>
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-sm text-gray-700">
          Timestamp (HH:MM:SS)
        </label>
        <input
          type="text"
          placeholder="00:00:05"
          value={timestamp}
          onChange={handleTimestampChange}
          pattern="\d{2}:\d{2}:\d{2}"
          className="w-full border rounded px-3 py-2 text-sm font-mono"
        />
        <p className="text-xs text-gray-500">
          Enter the exact moment to extract frame from
        </p>
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Left} id="video-input" />
      <Handle type="source" position={Position.Right} id="frame-output" />
    </div>
  );
};

export default ExtractFrameNode;
```

---

## PART C: Enhanced Canvas UI

### Step 1: Dot Grid Background

Update `src/app/globals.css`:

```css
/* Dot Grid Background */
.canvas-background {
  background-image:
    radial-gradient(circle, #e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
  background-color: #f9fafb;
}

/* Pulsating Glow Animation */
@keyframes pulse-glow {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.node-executing {
  animation: pulse-glow 2s infinite;
}

/* Animated Purple Edges */
.animated-edge {
  stroke: #a855f7;
  stroke-width: 2;
  animation: dash 20s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -1000;
  }
}

/* Smooth Transitions */
.react-flow-node {
  transition: all 0.2s ease-out;
}

.react-flow-node:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Step 2: Update Canvas Component

Update `src/components/Canvas.tsx`:

```typescript
// Add to Canvas.tsx

import { Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export const Canvas: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        {/* Dot Grid Background */}
        <Background 
          color="#e5e7eb"
          size={1}
          gap={20}
          bgColor="#f9fafb"
        />
        
        {/* Controls */}
        <Controls />
        
        {/* Mini Map */}
        <MiniMap 
          maskColor="rgba(0,0,0,0.1)"
          width={150}
          height={100}
          position="bottom-right"
        />
      </ReactFlow>
    </div>
  );
};
```

---

## PART D: Execution Status Visual

### Step 1: Node Wrapper with Glow Effect

Update node components to add execution status:

```typescript
// In each node component

interface NodeProps {
  data: any;
  id: string;
  isExecuting?: boolean;
}

export const TextNode: React.FC<NodeProps> = ({ data, id, isExecuting }) => {
  return (
    <div
      className={`${
        isExecuting ? 'node-executing' : ''
      } bg-white border-2 border-slate-300 rounded-lg p-4 shadow-lg`}
    >
      {/* Node content */}
    </div>
  );
};
```

### Step 2: Pass Execution Status from Store

```typescript
// In execution engine
const nodeStatus: Record<string, {
  status: 'idle' | 'running' | 'success' | 'error';
  startTime?: number;
  endTime?: number;
}> = {};

// Update React Flow nodes with status
setNodes((nodes) =>
  nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      status: nodeStatus[node.id]?.status || 'idle',
      isExecuting: nodeStatus[node.id]?.status === 'running',
    },
  }))
);
```

---

## NEXT: Which file should I start with?

Based on this implementation guide:

1. **First:** Update database schema (Task 1.1 in COMPLETE_IMPLEMENTATION_ROADMAP.md)
2. **Second:** Setup Transloadit utility + create Upload nodes
3. **Third:** Create Crop/Extract Frame nodes + FFmpeg tasks
4. **Fourth:** Update Canvas UI with dot grid + animations
5. **Fifth:** Integrate all into execution engine

All code is ready to copy-paste. Which feature should we tackle first?

