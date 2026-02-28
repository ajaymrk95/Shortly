import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './Navbar'
import Shortener from './Shortener'
import Analytics from './Analytics'
import './App.css'


function App() {


  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Shortener/>}></Route>
            <Route path='/analytics' element={<Analytics/>}></Route>
        </Routes> 
      </div>
    </BrowserRouter>
  )
}

export default App
