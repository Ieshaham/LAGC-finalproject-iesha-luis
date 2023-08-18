import React, { createContext, useState, useEffect } from 'react';

import { auth } from './index';
import { useNavigate } from 'react-router-dom';

export const Context = createContext();

export default function ContextProvider(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log('User is signed in');

                const res = await fetch(`${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1/signUpOrSigninUser`, {
                    method: 'post',
                    body: JSON.stringify({ email: user.email }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();

                console.log('data', data);

                setUser(data.data);
                // Commenting out the automatic navigation
                // goExplore();
            } else {
                console.log('User not signed in');
                setUser({});
            }
        });

        return () => {
            unsubscribe(); // Cleanup the listener when the component unmounts
        };
    }, []);

    // Move the navigation logic to a place where you want to navigate
    const goExplore = () => {
        let path = `/explore`;
        navigate(path);
    };

    return (
        <Context.Provider value={{ user, goExplore }}>
            {props.children}
        </Context.Provider>
    );
}
