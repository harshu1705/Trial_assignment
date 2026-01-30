import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Handle, Position, useReactFlow, NodeProps } from '@xyflow/react';
import { Upload, Image as ImageIcon, AlertCircle, X } from 'lucide-react';
import { transloadit } from '@/lib/transloadit';

// Define the data structure for this node
interface UploadImageNodeData extends Record<string, unknown> {
  imageUrl?: string;
  preview?: {
    url: string;
    size: string;
    dimensions: string;
  };
}

export const UploadImageNode = ({ id, data, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();
  // Safe cast
  const nodeData = data as UploadImageNodeData;

  const [preview, setPreview] = useState<UploadImageNodeData['preview']>(nodeData.preview);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync local state if external data changes (e.g. undo/redo)
  useEffect(() => {
    if (nodeData.preview) {
      setPreview(nodeData.preview);
    }
  }, [nodeData.preview]);

  const handleFileSelect = useCallback(
    async (file: File) => {
      // 1. Validation
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      if (file.size > 50 * 1024 * 1024) { // 50MB
        setError('File size must be less than 50MB');
        return;
      }

      setUploading(true);
      setError(null);

      // 2. Create Local Preview Immediately (Optimistic UI)
      const objectUrl = URL.createObjectURL(file);
      const localPreview = {
        url: objectUrl,
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        dimensions: 'calculating...',
      };

      // 3. Attempt Upload
      try {
        // Check for keys or force simulation
        const auth = transloadit.generateAuth();

        // SIMULATION MODE
        if (auth.isMock) {
          console.log("ℹ️ Simulation Mode: Using local object URL for UploadImageNode");
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 800));

          // Update Node Data with Local URL
          setNodes((nodes) =>
            nodes.map((n) => {
              if (n.id === id) {
                return {
                  ...n,
                  data: {
                    ...n.data,
                    imageUrl: objectUrl, // Critical: Downstream nodes read this
                    preview: { ...localPreview, dimensions: '(local)' }
                  }
                };
              }
              return n;
            })
          );
          setUploading(false);
          return;
        }

        // REAL UPLOAD MODE (Transloadit)
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

        // Update Node Data with Real URL
        setNodes((nodes) =>
          nodes.map((n) => {
            if (n.id === id) {
              return {
                ...n,
                data: {
                  ...n.data,
                  imageUrl: finalUrl,
                  preview: {
                    url: finalUrl,
                    size: localPreview.size,
                    dimensions: `${uploadedFile.meta?.width}x${uploadedFile.meta?.height}` || '(uploaded)'
                  }
                }
              };
            }
            return n;
          })
        );

      } catch (err: any) {
        console.error("Upload failed, falling back to local:", err);
        setError(`Upload failed (${err.message}). Using local preview.`);

        // Fallback: Still save the local URL so the workflow doesn't break
        setNodes((nodes) =>
          nodes.map((n) => n.id === id ? {
            ...n,
            data: { ...n.data, imageUrl: objectUrl, preview: { ...localPreview, dimensions: '(local fallback)' } }
          } : n)
        );
      } finally {
        setUploading(false);
      }
    },
    [id, setNodes]
  );

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(undefined);
    setNodes((nodes) =>
      nodes.map((n) => n.id === id ? { ...n, data: { ...n.data, imageUrl: undefined, preview: undefined } } : n)
    );
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`bg-white rounded-xl border-2 transition-all w-64 shadow-sm group
      ${selected ? 'border-blue-500 shadow-blue-100' : 'border-slate-200 hover:border-slate-300'}
    `}>
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
        <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
          <ImageIcon size={16} />
        </div>
        <span className="font-semibold text-sm text-slate-700">Upload Image</span>
      </div>

      {/* Body */}
      <div className="p-3">
        {preview ? (
          <div className="relative group/preview">
            <img
              src={preview.url}
              alt="Preview"
              className="w-full h-32 object-cover rounded-lg border border-slate-200 bg-slate-50"
            />
            <button
              onClick={clearImage}
              className="absolute top-1 right-1 p-1 bg-white/90 text-slate-500 hover:text-red-500 rounded-full shadow-sm opacity-0 group-hover/preview:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
            <div className="mt-2 flex justify-between text-[10px] text-slate-400 font-medium">
              <span>{preview.dimensions}</span>
              <span>{preview.size}</span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors
              ${uploading ? 'bg-slate-50 border-slate-300' : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/50'}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              disabled={uploading}
            />
            <div className={`p-3 rounded-full ${uploading ? 'bg-slate-100 animate-pulse' : 'bg-blue-50 text-blue-500'}`}>
              <Upload size={20} />
            </div>
            <span className="text-xs font-medium text-slate-500">
              {uploading ? 'Processing...' : 'Click to Upload'}
            </span>
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
        <span className="text-[10px] font-medium text-slate-400 mr-2 uppercase tracking-wide">Image URL</span>
        <Handle
          type="source"
          position={Position.Right}
          id="image-url"
          className="w-3 h-3 bg-blue-500 border-2 border-white"
        />
      </div>
    </div>
  );
};
