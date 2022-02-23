import React from 'react';
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const { firebaseToken, user } = useAuth();

    return (
        <>
        Hello, {user ? user.Username : null}
        <br/><br/>firebaseToken: {firebaseToken ? firebaseToken : null}
        <br/><br/>authToken: {user ? user.Token : null}
        <br/><br/>=============================
        <br/><br/>TokenExpiredDate: {localStorage.getItem('EXPIRED_TIME')}
        <br/><br/>localStorageToken: {localStorage.getItem('TOKEN_KEY')}
        <br/><br/>role: {user.Residents[0] ? user.Residents[0].Type : 'Admin'}
        </>
    )
}

export default Home;