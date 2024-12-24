import React, { useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const ForceGraph = () => {
  const [data, setData] = useState({
    nodes: [
      { id: 'A', label: 'Node A' },
      { id: 'B', label: 'Node B' },
      { id: 'C', label: 'Node C' },
      { id: 'D', label: 'Node D' },
    ],
    links: [
      { source: 'A', target: 'B' },
      { source: 'A', target: 'C' },
      { source: 'B', target: 'D' },
      { source: 'C', target: 'D' },
    ],
  });

  const [newNodeId, setNewNodeId] = useState('');
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [sourceNodeId, setSourceNodeId] = useState('');
  const [targetNodeId, setTargetNodeId] = useState('');
  const [isDirected, setIsDirected] = useState(false); // Trạng thái cho loại đồ thị

  const addNode = () => {
    if (newNodeId && newNodeLabel && !data.nodes.find(node => node.id === newNodeId)) {
      const newNode = { id: newNodeId, label: newNodeLabel };
      const updatedNodes = [...data.nodes, newNode];
      setData({ ...data, nodes: updatedNodes });
      setNewNodeId('');
      setNewNodeLabel('');
    } else {
      alert('Node ID and label are required and must be unique.');
    }
  };

  const addLink = () => {
    if (sourceNodeId && targetNodeId && 
        data.nodes.find(node => node.id === sourceNodeId) && 
        data.nodes.find(node => node.id === targetNodeId) &&
        !data.links.find(link => link.source === sourceNodeId && link.target === targetNodeId)) {
      const newLink = { source: sourceNodeId, target: targetNodeId };
      const updatedLinks = [...data.links, newLink];
      setData({ ...data, links: updatedLinks });
      setSourceNodeId('');
      setTargetNodeId('');
    } else {
      alert('Both source and target node IDs are required and must exist in the graph.');
    }
  };

  const toggleGraphType = () => {
    setIsDirected(!isDirected);
    // Nếu chuyển từ có hướng sang vô hướng, xóa các liên kết có hướng
    if (isDirected) {
      const undirectedLinks = data.links.filter(link => link.source !== link.target);
      setData({ ...data, links: undirectedLinks });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={newNodeId}
          onChange={(e) => setNewNodeId(e.target.value)}
          placeholder="Enter new node ID"
        />
        <input
          type="text"
          value={newNodeLabel}
          onChange={(e) => setNewNodeLabel(e.target.value)}
          placeholder="Enter new node label"
        />
        <button onClick={addNode}>Add Node</button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={sourceNodeId}
          onChange={(e) => setSourceNodeId(e.target.value)}
          placeholder="Enter source node ID"
        />
        <input
          type="text"
          value={targetNodeId}
          onChange={(e) => setTargetNodeId(e.target.value)}
          placeholder="Enter target node ID"
        />
        <button onClick={addLink}>Add Link</button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          <input
            type="checkbox"
            checked={isDirected}
            onChange ={(e) => toggleGraphType(e.target.checked)}
          />
          Directed Graph
        </label>
      </div>
      <div style={{ width: '800px', height: '600px' }}>
        <ForceGraph2D
          graphData={data}
          nodeAutoColorBy="id"
          linkDirectionalParticles={isDirected ? 4 : 0} // Hiệu ứng hạt cho các liên kết có hướng
          linkDirectionalParticleSpeed={d => d.value * 0.001} // Tốc độ hạt
          nodeLabel={node => node.label} // Hiển thị tên node
          linkDirectionalArrowLength={isDirected ? 5 : 0} // Độ dài mũi tên
          linkDirectionalArrowColor="rgba(0, 0, 0, 0.5)" // Màu sắc mũi tên
        />
      </div>
    </div>
  );
};

export default ForceGraph;