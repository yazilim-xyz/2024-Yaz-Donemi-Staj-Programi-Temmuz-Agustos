import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Chat from './pages/Chat';
//import GroupChat from './pages/GroupChat';
import About from './components/About';
import Contact from './components/Contact';
import GroupsPage from './components/GroupsPage'
import GroupChat from './pages/GroupChat';
import Settings from './components/Settings';
import Admin from './components/Admin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/messages" element={<Chat />}/>
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/groupchat" element={<GroupChat />} /> */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
