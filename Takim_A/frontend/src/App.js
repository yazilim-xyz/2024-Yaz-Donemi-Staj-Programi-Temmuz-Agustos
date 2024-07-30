import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Chat from './pages/Chat';
import GroupChat from './components/GroupChat';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/messages" element={<Chat />}/>
        <Route path="/GroupChat" element={<GroupChat />} />
      </Routes>
    </Router>
  );
}

export default App;
