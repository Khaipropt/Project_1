import {Routes, Route, Navigate} from "react-router-dom"
import React from 'react';
import ForceGraph from './components/ForceGraph';
import NavigationBar from './components/NavBar';
import { Button, Container, Stack } from 'react-bootstrap';
import GraphDraw from "./page/GraphDraw";
import Login from "./page/Login";
function App() {
  return (
    <>
    <NavigationBar/>
    <Container>
      <Routes>
          <Route path = "/" element ={0 ?  <Login/> :  <GraphDraw/>}/> 
      </Routes>
    </Container>
    </>  
  );
};

export default App;
