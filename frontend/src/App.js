import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VLauncherDocs from './pages/VLauncherDocs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/v-launcher" element={<VLauncherDocs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
