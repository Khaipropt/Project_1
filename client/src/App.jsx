import {Routes, Route, Navigate} from "react-router-dom"
import React from 'react';
import ForceGraph from './components/ForceGraph';
import NavigationBar from './components/NavBar';
import { Button, Container, Stack } from 'react-bootstrap';
import GraphDraw from "./page/GraphDraw";
import Login from "./page/Login";
function App() {
  const data = {
    nodes: [
        { id: 'A', label: 'Node A' },
        { id: 'B', label: 'Node B' },
        { id: 'C', label: 'Node C' },
        { id: 'D', label: 'Node D' },
        { id: 'E', label: 'Node E' },
    ],
    links: [
        { source: 'A', target: 'B', value: 1 },
        { source: 'A', target: 'C', value: 1 },
        { source: 'B', target: 'D', value: 1 },
        { source: 'C', target: 'D', value: 1 },
    ],
  };
  localStorage.setItem("Graph",JSON.stringify(data));
  return (
    <>
    {/* <ForceGraph/> */}
    <NavigationBar/>
    <Container>
      <Routes>
          <Route path="/test" element={<Login/>}/>
          <Route path = "/" element ={<GraphDraw/>}/> 
      </Routes>
    </Container>
    </>  
  );
};

export default App;
