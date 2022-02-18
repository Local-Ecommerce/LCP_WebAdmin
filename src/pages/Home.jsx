import React, { useEffect, useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { api } from "../RequestMethod";

const Home = () => {
    const { currentUser, firebaseToken, authUser } = useAuth();
    const [role, setRole] = useState();

    useEffect(() => {
        const url = "resident/" + authUser.AccountId;

        const fetchData = async () => {
            api.get(url)
            .then(function (res) {
                setRole(res.data.Data.Type);
            })
            .catch(function (error) {
                console.log(error);
            });
        };
        fetchData();
    }, [])

    return (
        <>
        Hello, {currentUser.email}, 
        <br/><br/>firebaseToken: {firebaseToken}
        <br/><br/>authToken: {authUser ? authUser.Token : null}
        <br/><br/>accountId: {authUser ? authUser.AccountId : null}
        <br/><br/>roleId: {authUser ? authUser.RoleId : null}
        <br/><br/>TokenExpiredDate: {authUser ? authUser.TokenExpiredDate : null}
        <br/><br/>role: {role ? role : "admin"}
        <br/><br/>localStorageToken: {localStorage.getItem('TOKEN_KEY')}
        </>
    )
}

export default Home;