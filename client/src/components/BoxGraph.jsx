import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { addNode } from '../hook/DrawFunction';
const BoxGraph = () => {
    addNode(JSON.parse(localStorage.getItem("Graph")),"22");
    const [data, setData] = useState(addNode(JSON.parse(localStorage.getItem("Graph")),"22"));
    return ( <div class="box-graph">
        <ForceGraph2D
        graphData={data}
        nodeAutoColorBy="id"
        linkDirectionalParticles={1} // Hiệu ứng hạt cho các liên kết
        linkDirectionalParticleSpeed={d => d.value * 0.001} // Tốc độ hạt
      />
    </div> );
}
 
export default BoxGraph;