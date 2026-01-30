import React, { useState, useCallback, useRef } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Upload, Image, AlertCircle } from 'lucide-react';
import { transloadit } from '@/lib/transloadit';

interface ImagePreview {
  url: string;
  size: string;
  dimensions: string;
}

export const UploadImageNode: React.FC<{ data?: any; id: string }> = ({
  data,
  id,
}) => {
  const safeData = data ?? {};
  const { setNodes } = useReactFlow();

  const [preview, setPreview] = useState<ImagePreview | null>(
    safeData.preview ?? null
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (file: File) => {
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
        const formData = new FormData();
        const auth = transloadit.generateAuth();

        // SIMULATION MODE: If keys are missing, simulate upload locally
        if (auth.isMock) {
          console.log("⚠️ Simulation Mode: Using local object URL");
          await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay

          const objectUrl = URL.createObjectURL(file);
          const previewData: ImagePreview = {
            url: objectUrl,
            size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
            dimensions: '(local preview)',
          };

          setPreview(previewData);
          setNodes((nodes) =>
            nodes.map((n) =>
              n.id === id ? { ...n, data: { ...n.data, imageUrl: objectUrl, preview: previewData } } : n
            )
          );
          return;
        }

        formData.append('files[]', file);
        formData.append(
          'params',
          JSON.stringify({
            auth_token: auth.auth_token,
            auth_expires: auth.auth_expires,
          })
        );

        const response = await fetch(
          'https://api2.transloadit.com/uploads',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) throw new Error('Upload failed');

        const uploadData = await response.json();
        const uploadedFile = uploadData?.results?.uploads?.[0];
        if (!uploadedFile) throw new Error('Invalid upload response');

        const previewData: ImagePreview = {
          url: uploadedFile.ssl_url,
          size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
          dimensions: '(pending)',
        };

        setPreview(previewData);

        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? {
                ...node,
                data: {
                  ...node.data,
                  imageUrl: uploadedFile.ssl_url,
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
    <div className="bg-white border-2 border-blue-400 rounded-lg p-4 w-64 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Image size={18} className="text-blue-500" />
        <span className="font-semibold text-sm">Upload Image</span>
      </div>

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

      <div
        className={`border-2 border-dashed rounded p-3 cursor-pointer transition ${uploading
          ? 'border-gray-300 bg-gray-100'
          : 'border-blue-300 hover:bg-blue-50'
          }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && handleFileSelect(e.target.files[0])
          }
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

      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded flex gap-2">
          <AlertCircle
            size={16}
            className="text-red-500 flex-shrink-0 mt-0.5"
          />
          <span className="text-xs text-red-700">{error}</span>
        </div>
      )}

      <Handle type="source" position={Position.Right} id="image-url" />
    </div>
  );
};

export default UploadImageNode;
