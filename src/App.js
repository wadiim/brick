import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react";
import Auth from './Auth.js';
import Start from './Start.js';
import Dashboard from './Dashboard.js';

function App() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Start setIsSignIn={(x) => setIsSignIn(x)} />} />
        <Route
          path="/auth"
          element={<Auth isSignIn={isSignIn} />} />
        <Route
          path="/dashboard"
          element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
