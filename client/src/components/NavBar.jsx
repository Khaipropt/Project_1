import React, { useState } from 'react';
import { Navbar, Nav, Container, Stack, Button } from 'react-bootstrap';
import {Link} from "react-router-dom"
const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar className="nav-bar" >
      <Container>
            <h2 style={{
                color: 'white',
                margin: 10,
                padding: 5
            }}>
               HUST GRAPH
            </h2>
          {/* <Nav>
            <Stack direction="horizontal" gap={3} className="align-items-center">
                <Button variant="primary">Button 1</Button>
                <Button variant="secondary">Button 2</Button>
                <Button variant="success">Button 3</Button>
            </Stack>
          </Nav> */}
      </Container>
      
    </Navbar>
  );
};

export default NavigationBar;