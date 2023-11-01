import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react";
import Auth from './Auth.js';
import Start from './Start.js';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
