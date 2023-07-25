import { useEffect, useContext } from 'react';
import ReactDOM from "react-dom/client";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './index';
import { Context } from './Context';
import { Navigate } from "react-router-dom";
import Explore from "./component/Explore.jsx"
import Landingpage from "./Landingpage"

const provider = new GoogleAuthProvider();

export default function App() {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
        </Routes>
  
    </BrowserRouter>
  );
}
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

