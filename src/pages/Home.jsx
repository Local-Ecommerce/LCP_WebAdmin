import React, { useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const { currentUser, firebaseToken, authUser } = useAuth();
    const localStorageToken = localStorage.getItem('TOKEN_KEY');
    return (
        <>
        Hello, {currentUser.email}, 
        <br/><br/>firebaseToken: {firebaseToken}
        <br/><br/>authToken: {authUser ? authUser.Token : null}
        <br/><br/>role: {authUser ? authUser.RoleId : null}
        <br/><br/>localStorageToken: {localStorage.getItem('TOKEN_KEY')}
        </>
    )
}

export default Home;