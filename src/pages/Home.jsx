import React from 'react';
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const { firebaseToken, account, resident } = useAuth();

    return (
        <>
        Hello, {account ? account.Username : null}, 
        <br/><br/>firebaseToken: {firebaseToken ? firebaseToken : null}
        <br/><br/>authToken: {account ? account.Token : null}
        <br/><br/>accountId: {account ? account.AccountId : null}
        <br/><br/>roleId: {account ? account.RoleId : null}
        <br/><br/>=============================
        <br/><br/>TokenExpiredDate: {localStorage.getItem('EXPIRED_TIME')}
        <br/><br/>role: {resident ? resident.role : null}
        <br/><br/>=============================
        <br/><br/>localStorageToken: {localStorage.getItem('TOKEN_KEY')}
        </>
    )
}

export default Home;