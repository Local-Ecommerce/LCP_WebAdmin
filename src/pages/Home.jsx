import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const Home = () => {
    const user = JSON.parse(localStorage.getItem('USER'));
    const [time, setTime] = useState(DateTime.fromISO(localStorage.getItem('EXPIRED_TIME')).diffNow().toObject().milliseconds);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(DateTime.fromISO(localStorage.getItem('EXPIRED_TIME')).diffNow().toObject().milliseconds);
        }, 1000);
      
        return () => clearTimeout(timer);
    });
    
    return (
        <>
            <br/><br/>=============================
            <br/><br/>Token Expire Time: {localStorage.getItem('EXPIRED_TIME')}
            <br/><br/>Time left until expire: {time} milliseconds
            <br/><br/>Access Token: {localStorage.getItem('ACCESS_TOKEN')}
            <br/><br/>Refresh Token: {localStorage.getItem('REFRESH_TOKEN')}
            <br/><br/>role: {user && user.RoleId === "R002" ? "Admin" 
            : user && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager" ? user.Residents[0].Type : null}
        </>
    )
}

export default Home;