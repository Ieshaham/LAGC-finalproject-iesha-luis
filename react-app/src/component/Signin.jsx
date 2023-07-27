
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './index';
import { Context } from './Context';

// const username  =useState(username,useState );
export default function Explore() {
    const navigate = useNavigate();

    return (
        <div>
            <label htmlFor="username">username
            </label>
            <input id="username" />

            <label htmlFor="password">password
            </label>
            <input id="password" />
        </div>

    )
}