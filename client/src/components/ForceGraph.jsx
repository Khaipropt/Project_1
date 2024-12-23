import React from 'react';
import { ForceGraph2D } from 'react-force-graph';

const Graph = () => {
  // Dữ liệu cho đồ thị
  const data = {
    nodes: [
      { id: 'A' },
      { id: 'B' },
      { id: 'C' },
      { id: 'D' },
    ],
    links: [
      { source: 'A', target: 'B' },
      { source: 'A', target: 'C' },
      { source: 'B', target: 'D' },
      { source: 'C', target: 'D' },
    ],
  };

  return (
    <div style={{ width: '800px', height: '600px' }}>
      <ForceGraph2D
        graphData={data}
        nodeAutoColorBy="id"
        linkDirectionalParticles={4} // Hiệu ứng hạt cho các liên kết
        linkDirectionalParticleSpeed={d => d.value * 0.001} // Tốc độ hạt
      />
    </div>
  );
};

export default Graph;