import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import FreshdeskConnect from './components/TicketList';
import TicketDetails from './components/TicketDetails';
import WebhookLogs from './components/WebhookLogs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tickets" element={<FreshdeskConnect />} />
        <Route path="/ticket/:id" element={<TicketDetails />} />
        <Route path="/webhooks" element={<WebhookLogs />} />
      </Routes>
    </Router>
  );
};

export default App;
