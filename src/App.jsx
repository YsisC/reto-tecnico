import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Indicadores from './components/Indicadores'
import IndicadorApp from './IndicadorApp';
import Update from './components/Update';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
 
  return (
    <Router>
 
    <IndicadorApp/>
    <Routes>
    <Route path="/" element={<IndicadorApp />} />
    <Route path='/update' component={Update} />
    </Routes>
    </Router>
  )
}

export default App
