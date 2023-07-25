
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

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