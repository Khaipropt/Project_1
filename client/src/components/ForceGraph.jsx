import React, { useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const ForceGraph = () => {
  const [data, setData] = useState({
    nodes: [
      { id: 'A', label: 'A' },
      { id: 'B', label: 'B' },
      { id: 'C', label: 'C' },
      { id: 'D', label: 'D' },
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
  const [removeNodeId, setRemoveNodeId] = useState('');
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [highlightedLinks, setHighlightedLinks] = useState([]);

  const addNode = () => {
    if (newNodeId && !data.nodes.find(node => node.id === newNodeId)) {
      const newNode = { id: newNodeId, label: newNodeId };
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
        link.source !== removeNodeId && link.target !== removeNodeId
      );
      setData({ ...data, nodes: updatedNodes, links: updatedLinks });
      setRemoveNodeId('');
    } else {
      alert('Node ID is required to remove a node.');
    }
  };

  const findConnectedComponents = (startNodeId) => {
    const visited = new Set();
    const stack = [startNodeId];
    const componentNodes = [];
    const componentLinks = [];

    while (stack.length) {
      const nodeId = stack.pop();
      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        componentNodes.push(nodeId);
        const connectedLinks = data.links.filter(link => link.source === nodeId || link.target === nodeId);
        connectedLinks.forEach(link => {
          componentLinks.push(link);
          const nextNodeId = link.source === nodeId ? link.target : link.source;
          if (!visited.has(nextNodeId)) {
            stack.push(nextNodeId);
          }
        });
      }
    }

    return { componentNodes, componentLinks };
  };

  const findShortestPath = (startNodeId, endNodeId) => {
    const queue = [startNodeId];
    const visited = new Set();
    const previous = {};
    visited.add(startNodeId);

    while (queue.length > 0) {
      const currentNodeId = queue.shift();
      if (currentNodeId === endNodeId) {
        break;
      }

      const neighbors = data.links
        .filter(link => link.source === currentNodeId || link.target === currentNodeId)
        .map(link => (link.source === currentNodeId ? link.target : link.source));

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          previous[neighbor] = currentNodeId;
        }
      }
    }

    // Reconstruct the path
    const path = [];
    let currentNodeId = endNodeId;
    while (currentNodeId) {
      path.unshift(currentNodeId);
      currentNodeId = previous[currentNodeId];
    }

    // Check if the path is valid
    if (path[0] === startNodeId) {
      setShortestPath(path);
      return path;
    } else {
      alert('No path found between the selected nodes.');
      return [];
    }
  };
  const highlightShortestPath = () => {
    if (sourceNodeId && targetNodeId) {
      const path = findShortestPath(sourceNodeId, targetNodeId);
      setHighlightedNodes(path);
      setHighlightedLinks(data.links.filter(link => 
        path.includes(link.source) && path.includes(link.target)
      ));
    } else {
      alert('Both source and target node IDs are required to find the shortest path.');
    }
  };
  const highlightComponent = (nodeId) => {
    const { componentNodes, componentLinks } = findConnectedComponents(nodeId);
    setHighlightedNodes(componentNodes);
    setHighlightedLinks(componentLinks);
    // alert(1);
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
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Enter node ID to highlight component"
          onChange={(e) => highlightComponent(e.target.value)}
        />
        {/* <button onClick={() => highlightComponent(sourceNodeId)}>Highlight Component</button> */}
        <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={sourceNodeId}
          onChange={(e) => setSourceNodeId(e.target.value)}
          placeholder="Enter source node ID for shortest path"
        />
        <input
          type=" text"
          value={targetNodeId}
          onChange={(e) => setTargetNodeId(e.target.value)}
          placeholder="Enter target node ID for shortest path"
        />
        <button onClick={highlightShortestPath}>Find Shortest Path</button>
        </div>
      </div>
      <div style={{ 
        // background: 'red',
        width: '800px', height: '600px' }}>
        <ForceGraph2D
          graphData={{
            nodes: data.nodes.map(node => ({
              ...node,
              color: highlightedNodes.includes(node.id) ? 'red' : undefined,
            })),
            links: data.links.map(link => ({
              ...link,
              color: highlightedLinks.includes(link) ? 'red' : undefined,
            })),
          }}
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