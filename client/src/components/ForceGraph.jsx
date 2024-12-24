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
      { source: 'A', target: 'B', value: 1 },
      { source: 'A', target: 'C', value: 2 },
      { source: 'B', target: 'D', value: 3 },
      { source: 'C', target: 'D', value: 4 },
    ],
  });

  const [newNodeId, setNewNodeId] = useState('');
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [sourceNodeId, setSourceNodeId] = useState('');
  const [targetNodeId, setTargetNodeId] = useState('');
  const [linkValue, setLinkValue] = useState(1); // Trọng số mặc định cho liên kết
  const [isWeighted, setIsWeighted] = useState(false); // Trạng thái cho loại đồ thị
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
        !data.links.find(link => 
          (isDirected && link.source === sourceNodeId && link.target === targetNodeId) || 
          (!isDirected && ((link.source === sourceNodeId && link.target === targetNodeId) || (link.source === targetNodeId && link.target === sourceNodeId)))
        )) {
      const newLink = { 
        source: sourceNodeId, 
        target: targetNodeId, 
        value: isWeighted ? linkValue : 1 
      };
      const updatedLinks = [...data.links, newLink];
      setData({ ...data, links: updatedLinks });
      setSourceNodeId('');
      setTargetNodeId('');
      setLinkValue(1); // Reset trọng số
    } else {
      alert('Both source and target node IDs are required and must exist in the graph.');
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
        {isWeighted && (
          <input
            type="number"
            value={linkValue}
            onChange={(e) => setLinkValue(Number(e.target.value))}
            placeholder="Enter link weight"
          />
        )}
        <button onClick={addLink}>Add Link</button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
           <input
            type="checkbox"
            checked={isWeighted}
            onChange={() => setIsWeighted(!isWeighted)}
          />
          Weighted Graph
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="checkbox"
            checked={isDirected}
            onChange={() => setIsDirected(!isDirected)}
          />
          Directed Graph
        </label>
      </div>
      <div style={{ width: '800px', height: '600px' }}>
        <ForceGraph2D
          graphData={data}
          nodeAutoColorBy="id"
          linkDirectionalParticles={isWeighted ? 4 : 0} // Hiệu ứng hạt cho các liên kết có trọng số
          linkDirectionalParticleSpeed={d => d.value * 0.001} // Tốc độ hạt
          nodeLabel={node => node.label} // Hiển thị tên node
          linkDirectionalArrowLength={isDirected ? 5 : 0} // Độ dài mũi tên cho đồ thị có hướng
          linkDirectionalArrowColor="rgba(0, 0, 0, 0.5)" // Màu sắc mũi tên
          linkLabel={link => isWeighted ? `Weight: ${link.value}` : ''} // Hiển thị trọng số trên các liên kết
        />
      </div>
    </div>
  );
};

export default ForceGraph;