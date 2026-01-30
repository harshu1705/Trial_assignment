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
