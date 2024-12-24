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
  const [linkValue, setLinkValue] = useState(1);
  const [isWeighted, setIsWeighted] = useState(false);
  const [isDirected, setIsDirected] = useState(false);
  const [removeSourceNodeId, setRemoveSourceNodeId] = useState('');
  const [removeTargetNodeId, setRemoveTargetNodeId] = useState('');
  const [removeNodeId, setRemoveNodeId] = useState(''); // New state for removing a node

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
      setLinkValue(1);
    } else {
      alert('Both source and target node IDs are required and must exist in the graph.');
    }
  };

  const removeLink = () => {
    if (removeSourceNodeId && removeTargetNodeId) {
      const updatedLinks = data.links.filter(link => 
        !(link.source === removeSourceNodeId && link.target === removeTargetNodeId) &&
        !(isDirected && link.source === removeTargetNodeId && link.target === removeSourceNodeId)
      );
      setData({ ...data, links: updatedLinks });
      setRemoveSourceNodeId('');
      setRemoveTargetNodeId('');
    } else {
      alert('Both source and target node IDs are required to remove a link.');
    }
  };

  const removeNode = () => {
    if (removeNodeId) {
      const updatedNodes = data.nodes.filter(node => node.id !== removeNodeId);
      const updatedLinks = data.links.filter(link => 
        link.source.id !== removeNodeId && link.target.id !== removeNodeId
      );
      setData({ ...data, nodes: updatedNodes, links: updatedLinks });
      setRemoveNodeId('');
    } else {
      alert('Node ID is required to remove a node.');
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
        <input
          type="text"
          value={removeSourceNodeId}
          onChange={(e) => setRemoveSourceNodeId(e.target.value)}
          placeholder="Enter source node ID to remove link"
        />
        <input
          type="text"
          value={removeTargetNodeId}
          onChange={(e) => setRemoveTargetNodeId(e.target.value)}
          placeholder="Enter target node ID to remove link"
        />
        <button onClick={removeLink}>Remove Link</button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={removeNodeId}
          onChange={(e) => setRemoveNodeId(e.target.value)}
          placeholder="Enter node ID to remove"
        />
        <button onClick={removeNode}>Remove Node</button>
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
          linkDirectionalParticles={isWeighted ? 4 : 0}
          linkDirectionalParticleSpeed={d => d.value * 0.001}
          nodeLabel={node => node.label}
          linkDirectionalArrowLength={isDirected ? 5 : 0}
          linkDirectionalArrowColor="rgba(0, 0, 0, 0.5)"
          linkLabel={link => isWeighted ? `Weight: ${link.value}` : ''}
        />
      </div>
    </div>
  );
};

export default ForceGraph; 