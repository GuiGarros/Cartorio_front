import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginScreen from "./pages/login/login"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={LoginScreen}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
