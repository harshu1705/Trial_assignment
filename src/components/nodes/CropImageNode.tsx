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
