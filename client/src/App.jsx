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
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
        { id: 'D', label: 'D' },
        { id: 'E', label: 'E' },
        { id: 'R', label: 'R' },
    ],
    links: [
      { source: 'B', target: 'A', value: 1 },
      { source: 'A', target: 'E', value: 1 },
      { source: 'E', target: 'C', value: 1 },
      { source: 'A', target: 'C', value: 1 },
      { source: 'D', target: 'B', value: 2 },
      { source: 'C', target: 'D', value: 3 },
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
