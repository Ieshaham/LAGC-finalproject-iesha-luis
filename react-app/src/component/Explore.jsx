
import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import "../App.css"

// const username  =useState(username,useState );
export default function Explore() {
    const navigate = useNavigate();

    return (
        
        <div className="form-group">
            <label htmlFor="place">Where to go:
            </label>
            <input id="place" />
            <label htmlFor="initialdate">start Date
            </label>
            <input id="initialdate" />
            <label htmlFor="endate">End Date
            </label>
            <input id="endate" />
            <label htmlFor="activity">Activity
            </label>
            <input id="activity" />

            <button className="btn-primary">Button</button>
        </div>

    )
}