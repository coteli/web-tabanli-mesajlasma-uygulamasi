import React from 'react';

import './App.css';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="app">
      <div className="app__body">
        {/* Kenar Barı */}
        <Sidebar />
        {/* Sohbet Alanı */}
      </div>
    </div>
  );
}

export default App;
