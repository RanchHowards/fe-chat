import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import ChatRoom from './components/ChatRoom'
import Rooms from './components/Rooms'
import Home from './components/Home'

function App() {
  const [user, setUser] = useState('')
  return (
    <div>
      <Routes>
        <Route path="/rooms/:id" element={<ChatRoom user={user} />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/home" element={<Home setUser={setUser} user={user} />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  )
}

export default App
