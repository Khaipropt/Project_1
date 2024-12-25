import React, { useState } from 'react';
import { Navbar, Nav, Container, Stack, Button } from 'react-bootstrap';
import {Link} from "react-router-dom"
const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar className="nav-bar" >
      <Container>
            <Link to='/' >
            <h2 style={{
                color: 'white',
                margin: 10,
                padding: 5
            }}>
               HUST GRAPH
            </h2>
            </Link>
            
      </Container>
      
    </Navbar>
  );
};

export default NavigationBar;