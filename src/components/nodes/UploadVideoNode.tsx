import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Handle, Position, useReactFlow, NodeProps } from '@xyflow/react';
import { Upload, Video as VideoIcon, AlertCircle, Play, X, Pause } from 'lucide-react';
import { transloadit } from '@/lib/transloadit';

// Define the data structure for this node
interface UploadVideoNodeData extends Record<string, unknown> {
  videoUrl?: string;
  preview?: {
    url: string;
    duration: string;
    size: string;
  };
}

export const UploadVideoNode = ({ id, data, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();
  // Safe cast
  const nodeData = data as UploadVideoNodeData;

  const [preview, setPreview] = useState<UploadVideoNodeData['preview']>(nodeData.preview);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync local state
  useEffect(() => {
    if (nodeData.preview) {
      setPreview(nodeData.preview);
    }
  }, [nodeData.preview]);

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.onerror = () => resolve(0); // Fallback
    });
  };

  const formatDuration = (seconds: number): string => {
    if (!seconds) return 'unknown';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileSelect = useCallback(
    async (file: File) => {
      // 1. Validation
      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file (mp4, mov, webm)');
        return;
      }
      if (file.size > 500 * 1024 * 1024) { // 500MB
        setError('File size must be less than 500MB');
        return;
      }

      setUploading(true);
      setError(null);

      try {
        // 2. Metadata & Local Preview
        const duration = await getVideoDuration(file);
        const objectUrl = URL.createObjectURL(file);

        const localPreview = {
          url: objectUrl,
          duration: formatDuration(duration),
          size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        };

        const auth = transloadit.generateAuth();

        // SIMULATION MODE
        if (auth.isMock) {
          console.log("ℹ️ Simulation Mode: Using local object URL for UploadVideoNode");
          await new Promise(resolve => setTimeout(resolve, 1500)); // Network delay

          setNodes((nodes) =>
            nodes.map((n) => {
              if (n.id === id) {
                return {
                  ...n,
                  data: {
                    ...n.data,
                    videoUrl: objectUrl, // Critical for downstream
                    preview: localPreview
                  }
                };
              }
              return n;
            })
          );
          setUploading(false);
          return;
        }

        // REAL UPLOAD MODE
        const formData = new FormData();
        formData.append('files[]', file);
        formData.append('params', JSON.stringify({
          auth_token: auth.auth_token,
          auth_expires: auth.auth_expires,
        }));

        const response = await fetch('https://api2.transloadit.com/uploads', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);
        const uploadData = await response.json();
        const uploadedFile = uploadData?.results?.uploads?.[0];

        if (!uploadedFile?.ssl_url) throw new Error('Invalid response from Transloadit');

        const finalUrl = uploadedFile.ssl_url;

        setNodes((nodes) =>
          nodes.map((n) =>
            n.id === id ? {
              ...n,
              data: {
                ...n.data,
                videoUrl: finalUrl,
                preview: {
                  url: finalUrl,
                  duration: localPreview.duration,
                  size: localPreview.size
                }
              }
            } : n
          )
        );

      } catch (err: any) {
        console.error("Upload failed, falling back to local:", err);
        setError(`Upload failed. Using local preview.`);
        // Fallback to local URL
        const objectUrl = URL.createObjectURL(file);
        setNodes((nodes) =>
          nodes.map((n) => n.id === id ? {
            ...n,
            data: {
              ...n.data, videoUrl: objectUrl, preview: {
                url: objectUrl,
                duration: 'unknown',
                size: 'local'
              }
            }
          } : n)
        );
      } finally {
        setUploading(false);
      }
    },
    [id, setNodes]
  );

  const clearVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(undefined);
    setIsPlaying(false);
    setNodes((nodes) =>
      nodes.map((n) => n.id === id ? { ...n, data: { ...n.data, videoUrl: undefined, preview: undefined } } : n)
    );
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`bg-white rounded-xl border-2 transition-all w-72 shadow-sm group
      ${selected ? 'border-purple-500 shadow-purple-100' : 'border-slate-200 hover:border-slate-300'}
    `}>
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
        <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
          <VideoIcon size={16} />
        </div>
        <span className="font-semibold text-sm text-slate-700">Upload Video</span>
      </div>

      {/* Body */}
      <div className="p-3">
        {preview ? (
          <div className="relative group/preview rounded-lg overflow-hidden bg-black aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              src={preview.url}
              className="w-full h-full object-contain"
              onEnded={() => setIsPlaying(false)}
            />

            {/* Controls Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity">
              <button
                onClick={togglePlay}
                className="p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-all transform hover:scale-110 active:scale-95"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="translate-x-0.5" />}
              </button>
            </div>

            <button
              onClick={clearVideo}
              className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors z-10 opacity-0 group-hover/preview:opacity-100"
            >
              <X size={12} />
            </button>

            <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-white/90 font-medium">
              <span className="bg-black/40 px-1.5 py-0.5 rounded">{preview.duration}</span>
              <span className="bg-black/40 px-1.5 py-0.5 rounded">{preview.size}</span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors
              ${uploading ? 'bg-slate-50 border-slate-300' : 'border-slate-200 hover:border-purple-400 hover:bg-purple-50/50'}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/quicktime,video/webm"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              disabled={uploading}
            />
            <div className={`p-3 rounded-full ${uploading ? 'bg-slate-100 animate-pulse' : 'bg-purple-50 text-purple-500'}`}>
              <Upload size={20} />
            </div>
            <span className="text-xs font-medium text-slate-500">
              {uploading ? 'Processing...' : 'Click to Upload'}
            </span>
            <span className="text-[10px] text-slate-400">MP4, MOV, WEBM (Max 500MB)</span>
          </div>
        )}

        {error && (
          <div className="mt-3 p-2 bg-red-50 border border-red-100 rounded-lg flex gap-2 items-start">
            <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
            <span className="text-[10px] text-red-600 leading-tight">{error}</span>
          </div>
        )}
      </div>

      {/* Handles */}
      <div className="py-2 px-3 border-t border-slate-100 flex justify-end items-center">
        <span className="text-[10px] font-medium text-slate-400 mr-2 uppercase tracking-wide">Video URL</span>
        <Handle
          type="source"
          position={Position.Right}
          id="video_url"
          className="w-3 h-3 bg-purple-500 border-2 border-white transition-transform hover:scale-125"
        />
      </div>
    </div>
  );
};
