import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TasksPage from './pages/IdeasPage';
import IdeasPage from './pages/InboxPage';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/tasks">Tasks</Link> |
        <Link to="/ideas">Ideas</Link>
      </nav>
      <Routes>
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/ideas" element={<IdeasPage />} />
      </Routes>
    </Router>
  );
}
