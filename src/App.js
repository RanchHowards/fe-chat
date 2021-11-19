import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import ChatRoom from './components/ChatRoom'
import Home from './components/Home'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/:id" element={<ChatRoom />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
