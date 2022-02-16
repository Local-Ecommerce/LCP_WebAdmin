import React, { useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const { currentUser, firebaseToken, authUser } = useAuth();

    return (
        <>
        Hello, {currentUser.email}, 
        <br/><br/>firebaseToken: {firebaseToken}
        <br/><br/>authToken: {authUser.Token}
        <br/><br/>role: {authUser.RoleId}
        </>
    )
}

export default Home;