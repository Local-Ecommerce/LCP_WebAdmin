import React from 'react';

const Home = () => {
    const user = JSON.parse(localStorage.getItem('USER'));

    return (
        <>
        Hello, {user ? user.Username : null}
        <br/><br/>authToken: {user ? user.Token : null}
        <br/><br/>=============================
        <br/><br/>TokenExpiredDate: {localStorage.getItem('EXPIRED_TIME')}
        <br/><br/>localStorageToken: {localStorage.getItem('TOKEN_KEY')}
        <br/><br/>role: {user && user.RoleId === "R002" ? "Admin" 
                        : user && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager" ? user.Residents[0].Type : null}
        </>
    )
}

export default Home;