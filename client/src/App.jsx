import React from 'react';
import ForceGraph from './components/ForceGraph';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <div>
      <NavBar/>
      <h1>Đồ thị có hướng</h1>
      <ForceGraph/>
    </div>
  );
};

export default App;