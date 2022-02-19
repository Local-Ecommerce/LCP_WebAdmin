import React, { useEffect, useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { api } from "../RequestMethod";

const Home = () => {
    const { firebaseToken, authUser } = useAuth();
    const [role, setRole] = useState();

    useEffect(() => {
        if (authUser && authUser.RoleId === "R001") {
            const url = "resident/" + authUser.AccountId;

            api.get(url)
            .then(function (res) {
                setRole(res.data.Data.Type);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }, [])

    return (
        <>
        Hello, {authUser ? authUser.Username : null}, 
        <br/><br/>firebaseToken: {firebaseToken ? firebaseToken : null}
        <br/><br/>authToken: {authUser ? authUser.Token : null}
        <br/><br/>accountId: {authUser ? authUser.AccountId : null}
        <br/><br/>roleId: {authUser ? authUser.RoleId : null}
        <br/><br/>TokenExpiredDate: {localStorage.getItem('EXPIRED_TIME')}
        <br/><br/>role: {role ? role : "admin"}
        <br/><br/>localStorageToken: {localStorage.getItem('TOKEN_KEY')}
        </>
    )
}

export default Home;