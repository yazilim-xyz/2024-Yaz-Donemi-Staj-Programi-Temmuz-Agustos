import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
<<<<<<< HEAD
import Chat from './pages/Chat';
import GroupChat from './components/GroupChat';
=======
import Messages from './pages/Messages';
import ChatPage from './pages/ChatPage';

>>>>>>> 994369e73725ec346e0f5fb77087b67c6e5c1c91

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
<<<<<<< HEAD
        <Route path="/messages" element={<Chat />}/>
        <Route path="/GroupChat" element={<GroupChat />} />
=======
        <Route path="/Messages" element={<Messages />} />
        <Route path="/chat/:id" element={<ChatPage />} />
>>>>>>> 994369e73725ec346e0f5fb77087b67c6e5c1c91
      </Routes>
    </Router>
  );
}

export default App;
