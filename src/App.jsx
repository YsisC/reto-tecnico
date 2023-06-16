import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Indicadores from './components/Indicadores';
import Update from './components/Update';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
 
  return (
    <Router>
 
    <Indicadores/>
    <Routes>
    <Route path="/" element={<Indicadores />} />
    <Route path='/update' component={Update} />
    </Routes>
    </Router>
  )
}

export default App
