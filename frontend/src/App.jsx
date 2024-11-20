import { useState } from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import {Container } from "react-bootstrap"
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container>
    <Routes>
      {/* <Route path = "/" element ={user ? <Chat/>: <Login/>}/>
      <Route path = "/register" element ={user ? <Chat/>:<Register/>}/>
      <Route path = "/login" element ={user ? <Chat/>: <Login/>}/> */}
      <Route path = "/" element ={<Login/>}/>
      {/* <Route path = "*" element ={<Navigate to="/"/>}/> */}
    </Routes>
    </Container>
  )
}

export default App
