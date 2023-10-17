import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginScreen from "./pages/login/login"
import CadScreen from "./pages/cadastrar/cadastrar"
import HomeScreen from "./pages/home/home"
import SellScreen from "./pages/sell/sell"
import BuyScreen from "./pages/Compra/compra"



function App() {


  return (
    <>
        <Routes>
          <Route path="/" Component={LoginScreen}></Route>
          <Route path='/cadastrar' Component={CadScreen}></Route>
          <Route path='/home' Component={HomeScreen}></Route>
          <Route path='/novavenda' Component={SellScreen}></Route>
          <Route path='/novacompra' Component={BuyScreen}></Route>
        </Routes>

    </>
  )
}

export default App;
