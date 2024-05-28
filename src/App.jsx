import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateProject from './components/CreateProject';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <main className="p-4">
          {/* Define routes using Routes component */}
          <Routes>
            {/* Route for Dashboard component */}
            <Route path="/" element={<Dashboard />} />
            {/* Route for CreateProject component */}
            <Route path="/create" element={<CreateProject />} />
            {/* Route for Chat component */}
            <Route path="/chat/:id" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
