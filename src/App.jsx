import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Notes from "./components/Notes";
import ProtectedRoutes from "./routes/ProtectedRoutes";


function App() {
  return (
   <Router>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/notes" element={<ProtectedRoutes><Notes/></ProtectedRoutes>}/>
      </Routes>
   </Router>
  )
}

export default App
