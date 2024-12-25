import React from 'react';
import ForceGraph from './components/ForceGraph';
import NavigationBar from './components/NavBar';
import { Button, Stack } from 'react-bootstrap';
import BoxText from './components/BoxText';
const App = () => {
  return (
    <>
      <NavigationBar/>
      <h1>Đồ thị có hướng</h1>
        <Stack direction="horizontal" gap={2}>
          <ForceGraph/>
            <BoxText/>
            <BoxText/>
        </Stack>
      
    </>
  );
};

export default App;