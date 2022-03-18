import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const { socket } = useAuth();
    const user = JSON.parse(localStorage.getItem('USER'));
    const [time, setTime] = useState(DateTime.fromISO(localStorage.getItem('EXPIRED_TIME')).diffNow().toObject().milliseconds);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(DateTime.fromISO(localStorage.getItem('EXPIRED_TIME')).diffNow().toObject().milliseconds);
        }, 1000);
      
        return () => clearTimeout(timer);
    });

    const handleSendNotification = () => {
        socket.emit("sendNotification", {
            accountId: 'ZrPXVdC3H3YgEmm5HiqtgBjOXUx1',
            product: 'Bánh mì 2 trứng',
            type: '1',
        });
      };

    return (
        <>
        <br/><br/>=============================
        <br/><br/>Token Expire Time: {localStorage.getItem('EXPIRED_TIME')}
        <br/><br/>Time left until expire: {time} milliseconds
        <br/><br/>Access Token: {localStorage.getItem('ACCESS_TOKEN')}
        <br/><br/>Refresh Token: {localStorage.getItem('REFRESH_TOKEN')}
        <br/><br/>role: {user && user.RoleId === "R002" ? "Admin" 
                        : user && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager" ? user.Residents[0].Type : null}
        <br/><br/>
        <button onClick={handleSendNotification}>Test</button>
        </>
    )
}

export default Home;