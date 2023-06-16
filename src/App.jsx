import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Indicadores from './components/Indicadores'
import IndicadorApp from './IndicadorApp';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
 
  return (
    <Router>
    <Routes>
    <Route path="/" element={<IndicadorApp />} />
    </Routes>
    </Router>
  )
}

export default App
