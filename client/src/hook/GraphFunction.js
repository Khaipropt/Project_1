export const addNode = (data, newNodeId) => {
    if (newNodeId && !data.nodes.find(node => node.id === newNodeId)) {
      const newNode = { id: newNodeId, label: newNodeId };
      const updatedNodes = [...data.nodes, newNode];
      data = { ...data, nodes: updatedNodes };
      console.log(data);
    } else {
      alert('Node ID and label are required and must be unique.');
      return data;
    }
    return data;
  };