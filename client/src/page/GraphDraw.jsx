import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import {Container, Button} from "react-bootstrap"

const GraphDraw = () => {
        const [data, setData] = useState(JSON.parse(localStorage.getItem("Graph")));
        const [statusBoxText, setStatusBoxText] = useState(true); // boxtext
        const [ketQua, setKetQua] = useState(1);
        const [kieuKetQua, setKieuKetQua] = useState([
      '',
      ,'liên thông',
      'chu trình',
      'đường đi ngắn nhất'
    ]); 
    const [luaChonChucNang, setLuaChonChucNang] = useState(2);
    const [statusKetQua, setStatusKetQua] = useState(false);
    const [isWeighted, setIsWeighted] = useState(false);
    const [isDirected, setIsDirected] = useState(false);
    const [sourceNodeId, setSourceNodeId] = useState('');
    const [targetNodeId, setTargetNodeId] = useState('');
    const [linkValue, setLinkValue] = useState(1);
    const [highlightedNodes, setHighlightedNodes] = useState([]);
    const [highlightedLinks, setHighlightedLinks] = useState([]);
    const [isConnectLink, setIsConnectLink] = useState(false);
    const [sourceResultNodeId, setSourceResultNodeId] = useState('');
    const [targetResultNodeId, setTargetResultNodeId] = useState('');
    //test 
    // console.log(data);
    
    // Liên thông
    const ConnectedComponents = (data) =>{
      const createAdjacencyList = (data) => {
          const adjacencyList = {};
          data.nodes.forEach(node => {
              adjacencyList[node.id] = [];
          });
          data.links.forEach(link => {
              adjacencyList[link.source].push(link.target);
              if (!isDirected) adjacencyList[link.target].push(link.source); // Nếu đồ thị vô hướng
          });
          return adjacencyList;
      };
      const dfs = (node, visited, adjacencyList, component) => {
          visited.add(node);
          component.push(node);
          adjacencyList[node].forEach(neighbor => {
              if (!visited.has(neighbor)) {
                  dfs(neighbor, visited, adjacencyList, component);
              }
          });
      };
      const adjacencyList = createAdjacencyList(data);
      const visited = new Set();
      const components = [];
  
      for (const node of data.nodes.map(n => n.id)) {
          if (!visited.has(node)) {
              const component = [];
              dfs(node, visited, adjacencyList, component);
              components.push(component);
          }
      }
  
      return components;
  };
    console.log(ConnectedComponents(data).at(0).join(","));
    // Chu trình

    // Đường đi ngắn nhất

    const findShortestPath = (graph, start, end) => {

        
      const adjList = {};
      graph.nodes.forEach(node => {
          adjList[node.id] = [];
      });
      
      graph.links.forEach(link => {
          adjList[link.source].push({ target: link.target, weight: link.value });
          if (!isDirected) adjList[link.target].push({ target: link.source, weight: link.value });
      });
  
      const distances = {};
      const visited = new Set();
      const parent = {};
      const priorityQueue = [];
  
      graph.nodes.forEach(node => {
          distances[node.id] = Infinity;
          parent[node.id] = null;
      });
      distances[start] = 0;
      priorityQueue.push({ node: start, distance: 0 });
      // Dijkstra's algorithm
      while (priorityQueue.length > 0) {
          priorityQueue.sort((a, b) => a.distance - b.distance);
          const { node: current } = priorityQueue.shift();
  
          if (current === end) {
              break;
          }
  
          if (visited.has(current)) {
              continue;
          }
          visited.add(current);
  
          for (const neighbor of adjList[current]) {
              const newDistance = distances[current] + neighbor.weight;
  
              if (newDistance < distances[neighbor.target]) {
                  distances[neighbor.target] = newDistance;
                  parent[neighbor.target] = current;
                  priorityQueue.push({ node: neighbor.target, distance: newDistance });
              }
          }
      }
  
      const path = [];
      let current = end;
  
      while (current !== null) {
          path.push(current);
          current = parent[current];
      }
  
      path.reverse();
      
      const totalDistance = distances[end];
      if (totalDistance === Infinity) return {path:"0",totalDistance};
      return { path, totalDistance };
  }

    
    //Ham chuc nang them
    const addNode = () => {
        if (sourceNodeId && !data.nodes.find(node => node.id === sourceNodeId)) {
          const newNode = { id: sourceNodeId, label: sourceNodeId };
          const updatedNodes = [...data.nodes, newNode];
          setData({ ...data, nodes: updatedNodes });
          setSourceNodeId('');
        } else {
          alert('ID nút là bắt buộc và phải là duy nhất.');
        }
      };

      const removeNode = () => {
        if (sourceNodeId && data.nodes.find(node => node.id === sourceNodeId)) {
          const updatedNodes = data.nodes.filter(node => node.id !== sourceNodeId);
          const updatedLinks = data.links.filter(link => 
            link.source !== sourceNodeId && link.target !== sourceNodeId
          );
          setData({ ...data, nodes: updatedNodes, links: updatedLinks });
          setSourceNodeId('');
        } else {
          alert('Yêu cầu phải có ID nút để xóa một nút.');
        }
      };

      const addLink = () => {
        if (sourceNodeId && targetNodeId && 
            data.nodes.find(node => node.id === sourceNodeId) && 
            data.nodes.find(node => node.id === targetNodeId) &&
            !data.links.find(link => 
              (isDirected && link.source.id === sourceNodeId && link.target.id === targetNodeId) || 
              (!isDirected && ((link.source.id === sourceNodeId && link.target.id === targetNodeId) || (link.source === targetNodeId && link.target === sourceNodeId)))
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
          alert('Cả ID nút nguồn và nút đích đều bắt buộc và phải tồn tại trong biểu đồ.');
        }
      };
      const removeLink = () => {
        if (sourceNodeId && targetNodeId ) {
          const updatedLinks = data.links.filter(link => 
            !(link.source === sourceNodeId && link.target === targetNodeId) &&
            !(isDirected && link.source === targetNodeId && link.target === sourceNodeId)
          );
          setData({ ...data, links: updatedLinks });
          setSourceNodeId('');
          setTargetNodeId('');
        } else {
          alert('Cả ID nút nguồn và nút đích và cạnh đều cần thiết để xóa liên kết.');
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

      const highlightComponent = (nodeId) => {
        const { componentNodes, componentLinks } = findConnectedComponents(nodeId);
        setHighlightedNodes(componentNodes);
        setHighlightedLinks(componentLinks);
        // alert(1);
      };
    return ( <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        
         

        {/* Boxtext */}
        <div class = "box-text">
          {!(ketQua-1) && 
          <>
          <Container style={{ 
            display: 'flex', 
            justifyContent: 'space-between' 
            }}>
            <h1 class="bt-h1-1" onClick={() => setStatusBoxText(true)}>Nhập</h1>
            <h1 class="bt-h1-1" onClick={() => setStatusBoxText(false)}>Chức năng</h1>
          </Container>
          <Container style={{
            marginLeft:20
          }}>
            {
              statusBoxText ? 
            //   <Nhap/>
            
                <div class="Nhap">
                    <div style={
                        {
                            height:180,
                            // backgroundColor:'red'
                        }}>
                        <h3>Loại đồ thị</h3>
                        <div style={{
                            marginLeft:30,
                        }
                        }>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between' 
                                }}>
                            <p style={{
                                width:120
                            }}>Hướng :</p>
                            <input type="radio" id="diem-ket-noi" name='huong' onClick={() => setIsDirected(true)}/>
                            <p>Có</p>
                            <input type="radio" id="diem-ket-noi" name='huong' onClick={() => setIsDirected(false)} checked={!isDirected}/>
                            <p>Không</p>
                            </div>
                            
                        <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between' 
                                }}>
                            <p style={{
                                width:120
                            }}>Trọng số :</p>
                            <input type="radio" id="diem-ket-noi" name='trong-so' onClick={() => setIsWeighted(true)} />
                            <p>Có</p>
                            <input type="radio" id="diem-ket-noi" name='trong-so' onClick={() => setIsWeighted(false)} checked={!isWeighted}/>
                            <p>Không</p>
                            
                        </div>
                        </div>
                    </div>

                    <div style={
                        {
                            // backgroundColor:'red',
                            marginTop:10,
                            height:225
                        }
                    }>
                        <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between' 
                        }}>
                            <h3>Nhập điểm</h3>
                            <input type="text" id="nhapChu" 
                            value={sourceNodeId}
                            onChange={(e) => setSourceNodeId(e.target.value)}
                            />
                        </div>
                            <div style={{
                                    marginLeft:10
                                }}>
                                <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between' 
                        }}>
                                    <p style={{
                                        width:150
                                    }}>Kết nối: </p>
                                    <input type="radio" id="diem-ket-noi" name='ket-noi' 
                      
                                    onClick={() => setIsConnectLink(true)}/>
                                    <p>Có</p>
                                    <input type="radio" id="diem-ket-noi" name='ket-noi' 
                                    onClick={() => setIsConnectLink(false)} checked={!isConnectLink}
                                    />
                                    <p>Không</p>
                                </div>
                                
                                <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between' 
                                }}>
                                    <p>Điểm kết nối</p>
                                    {isConnectLink ? <input type="text" id="nhapChu" 
                                    value={targetNodeId}
                                    onChange={(e) => setTargetNodeId(e.target.value)} 
                                    />
                                  : <input type="text" id="nhapChu" 
                                  value={targetNodeId}
                                  onChange={(e) => setTargetNodeId(e.target.value)} 
                                  disabled
                                  />
                                  }
                                    
                                </div>

                                <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between' 
                                }}>
                                    <p>Giá trị</p>
                                    {
                                      isWeighted ? <input type="text" id="nhapChu" 
                                      value={linkValue}
                                      onChange={(e) => setLinkValue(Number(e.target.value))}
                                      />
                                      :
                                      <input type="text" id="nhapChu" 
                                      value={linkValue}
                                      onChange={(e) => setLinkValue(Number(e.target.value))}
                                      disabled
                                      />
                                    }
  
                                </div>
                            </div>    
                    </div>
                    <div style={{
                        marginLeft: -280,
                        display: 'flex', 
                        justifyContent: ''
                        }}>

                        <Button onClick={isConnectLink ? addLink : addNode}>Thêm </Button>
                        <Button onClick={isConnectLink ? removeLink: removeNode}>Xóa </Button>
                    </div>
                    
                </div>
            
                : 
                // Chucnang

                <div class="Chuc-nang">
                <div style={
                    {
                        height:180,
                        // backgroundColor:'red'
                    }}>
                    <h3>Chức năng :</h3>
                    <div style={{
                        marginLeft:30,
                    }
                    }>
                        <div style={{ 
                            marginTop:-20,
                            display: 'flex', 
                            marginLeft: 50, 
                            }}>
                        
                        <input type="radio" id="diem-ket-noi" name='thuc-hien-chuc-nang' onClick={() =>setLuaChonChucNang(2)} checked={!(luaChonChucNang - 2)}/>
                        <p style={{
                            width:120,
                            marginLeft:50
                        }}>Liên thông</p>
                        </div>
                        <div style={{ 
                            marginTop:-20,
                            display: 'flex', 
                            marginLeft: 50, 
                            }}>
                        <input type="radio" id="diem-ket-noi" name='thuc-hien-chuc-nang' onClick={() =>setLuaChonChucNang(3)} checked={!(luaChonChucNang - 3)}/>
                        <p style={{
                            width:120,
                            marginLeft:50
                        }}>Chu trình</p>
                        </div>
                        <div style={{ 
                            marginTop:-20,
                            display: 'flex', 
                            marginLeft: 50, 
                            }}>
                        <input type="radio" id="diem-ket-noi" name='thuc-hien-chuc-nang' onClick={() =>setLuaChonChucNang(4)} checked={!(luaChonChucNang - 4)}/>
                        <p style={{
                            width:200,
                            marginLeft:50
                        }}>Đường đi ngắn nhất</p>
                        </div>
                        
                    </div>
                </div>
                <div style={
                    {
                        // backgroundColor:'red',
                        marginTop:10,
                        height:225
                    }
                }>
                  {
                    !(luaChonChucNang == 2) && <div>
                    <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between' 
                    }}>
                        <h3>Điểm đầu</h3>
                        <input type="text" id="nhapChu"  
                        value={sourceResultNodeId}
                        onChange={(e) => setSourceResultNodeId(e.target.value)}
                        />
                    </div>
                    <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between' 
                    }}>
                        <h3>Điểm cuối</h3>
                        <input type="text" id="nhapChu"  
                        value={targetResultNodeId}
                        onChange={(e) => setTargetResultNodeId(e.target.value)}
                        />
                    </div>
                  </div>
                  }
                    
    
                    <Button style={{
                        marginTop:10
                    }} onClick={() => setKetQua(luaChonChucNang)}>Kết Quả</Button>
                </div>
                
            </div>                    

            }
          </Container>
          </>
          }
          {(2<=ketQua) && (ketQua <=4) && <>
            
            <Container style={{ 
            display: 'flex', 
            justifyContent: 'center' 
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi-bi-house" viewBox="0 0 16 16"
            style={{
              marginTop: 40
            }
          } onClick={() => {setKetQua(1); highlightComponent("")}}
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
            </svg>
            <h2 class="bt-h2-2" onClick={() => changeStatus(true)}>Kết quả {kieuKetQua[ketQua]}</h2>
          </Container>
          <Container style={{
            marginLeft:20
          }}>
                {/* KetQua */}
                <div class='Ket-qua' style={{marginTop:20}}>
                {luaChonChucNang==2 && <>
                    <h3>Có {ConnectedComponents(data).length} {
                      kieuKetQua[ketQua]
                      }: </h3>
                <div style={{
                    margin:20
                }}>
                    {
                      ConnectedComponents(data).map((component, index) =>
                        <p class='chon' onClick={() => highlightComponent(component.at(0))}>{kieuKetQua[ketQua]} thứ {index + 1}: {component.join(",")} </p>
                      )
                    }

                    {/* Cần chỉnh sửa */}
                </div>
                </>
                }
                {
                  luaChonChucNang==4 && <>
                  <h3 style={{
                    marginTop:30
                }}> Đường đi ngắn nhất từ {sourceResultNodeId} đến {targetResultNodeId} là: </h3>
                  
                    <p>{findShortestPath(data, sourceResultNodeId, targetResultNodeId).path.join(", ")}</p>
                    <p>Có giá trị là: {findShortestPath(data, sourceResultNodeId, targetResultNodeId).totalDistance}</p>
                  </>
                }
                {
                    statusKetQua && <>
                    <h3>{kieuKetQua[ketQua]} thứ n : </h3>
                <div style={{
                    margin:20
                }}>
                    <p class='chon'>Nút thứ 1: giá trị </p>
                    <p class='chon'>Nút thứ 1: giá trị </p>
                </div>
                    </>
                }
                {/* <Button onClick={() => setStatusKetQua(!statusKetQua)}>Quay lại</Button> */}
            </div>
           
          </Container>
          </>}
        </div>

        {/* BoxGraph */}
        <div class="box-graph">
        <ForceGraph2D
        graphData={{
          nodes: data.nodes.map(node => ({
            ...node,
            color: highlightedNodes.includes(node.id) ? 'yellow' : undefined,
          })),
          links: data.links.map(link => ({
            ...link,
            color: highlightedLinks.includes(link) ? 'yellow' : undefined,
          })),
        }}
        nodeAutoColorBy="id"
        linkDirectionalParticles={isWeighted ? 4 : 1}
        linkDirectionalParticleSpeed={d => d.value * 0.001}
        nodeLabel={node => node.label}
        linkDirectionalArrowLength={isDirected ? 5 : 0}
        linkDirectionalArrowColor="rgba(0, 0, 0, 0.5)"
        linkLabel={link => isWeighted ? `Weight: ${link.value}` : ''}
        />
        </div>

    </div>
    </>
     );
}
 
export default GraphDraw;
