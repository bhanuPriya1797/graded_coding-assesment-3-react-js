import React from 'react';
import './App.css';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.css';
import Moviesection from './components/moviesection';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Background from './components/background';
import Moviedetails from './components/moviedetails';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Header/> 
          <Routes>
          <Route path='/'element={<Background/>} ></Route>
          <Route path='/:option' element={<Moviesection/>} ></Route>
          <Route path='/:moviesection/:details' element={<Moviedetails/>}></Route>
          </Routes>
       </BrowserRouter>
      
    </div>
  );
}

export default App;
