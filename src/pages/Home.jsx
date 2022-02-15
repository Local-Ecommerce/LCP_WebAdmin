import React from 'react';
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const { currentUser, firebaseToken, authToken } = useAuth();

    return (
        <>
        Hello, {currentUser.email}, 
        <br/>firebaseToken: {firebaseToken}
        <br/>authToken: {authToken}
        </>
    )
}

export default Home;