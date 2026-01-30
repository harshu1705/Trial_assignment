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
      <Handle type="target" position={Position.Left} id="video_url" />
      <Handle type="source" position={Position.Right} id="frame-output" />
    </div>
  );
};

export default ExtractFrameNode;
