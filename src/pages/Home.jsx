import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useAuth } from "../contexts/AuthContext";

import { db } from "../firebase";
import { set, push, ref, remove, update, get, child, onValue } from "firebase/database";

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

    const insertApprove = (e) => {
        e.preventDefault();

        push(ref(db, `Notification/` + 'ZrPXVdC3H3YgEmm5HiqtgBjOXUx1'), {
            createdDate: Date.now(),
            data: {
                image: 'https://firebasestorage.googleapis.com/v0/b/lcp-mobile-8c400.appspot.com/o/Product%2FPD_yg50vK1rdJGmyAYF%2FImage1?alt=media&token=155581a0-a3e8-4b73-8e01-63ab085bc6f0',
                name: 'Bánh mì 22 trứng',
                id: 'P002'
            },
            read: 0,
            receiverId: 'ZrPXVdC3H3YgEmm5HiqtgBjOXUx1',
            senderId: 'R001',
            type: '001'
        }).then(
            console.log("ok")
        );
    };

    const insertApproveStore = (e) => {
        e.preventDefault();

        push(ref(db, `Notification/` + user.Residents[0].ResidentId), {
            createdDate: Date.now(),
            data: {
                name: 'Cửa hàng của Nhân'
            },
            read: 0,
            receiverId: 'ZrPXVdC3H3YgEmm5HiqtgBjOXUx1',
            senderId: 'R001',
            type: '101'
        }).then(
            console.log("ok")
        );
    };

    const insertReject = (e) => {
        e.preventDefault();

        push(ref(db, `Notification/` + user.Residents[0].ResidentId), {
            createdDate: Date.now(),
            data: {
                image: 'https://firebasestorage.googleapis.com/v0/b/lcp-mobile-8c400.appspot.com/o/Product%2FPD_yg50vK1rdJGmyAYF%2FImage1?alt=media&token=155581a0-a3e8-4b73-8e01-63ab085bc6f0',
                name: 'Bánh mì 20 trứng',
                id: 'P002',
                reason: 'Tên không hợp lệ'
            },
            read: 0,
            receiverId: 'ZrPXVdC3H3YgEmm5HiqtgBjOXUx1',
            senderId: 'R001',
            type: '002'
        }).then(
            console.log("ok")
        );
    };

    const insertRejectStore = (e) => {
        e.preventDefault();

        push(ref(db, `Notification/` + user.Residents[0].ResidentId), {
            createdDate: Date.now(),
            data: {
                name: 'Cửa hàng của Nhân',
                reason: 'Tên không hợp lệ'
            },
            read: 0,
            receiverId: 'ZrPXVdC3H3YgEmm5HiqtgBjOXUx1',
            senderId: 'R001',
            type: '102'
        }).then(
            console.log("ok")
        );
    };

    const handleSubmitChange = (e) => {
        e.preventDefault();

        update(ref(db, `Notification/` + user.Residents[0].ResidentId), {
            createdDate: Date.now(),
            itemId: "P002",
            read: 0,
            receiverId: 'ZrPXVdC3H3YgEmm5HiqtgBjOXUx1',
            senderId: 'R001',
            type: '001'
        }).then(
            console.log("ok")
        );
    };

    const handleDelete = (e) => {
        e.preventDefault();

        remove(ref(db, `/aaa`)).then(
            console.log("ok")
        );
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
        <br/><br/><button onClick={handleSendNotification}>Test</button>
        <br/><br/><button onClick={insertApprove}>insert approve product</button>
        <br/><br/><button onClick={insertReject}>insert reject product</button>
        <br/><br/><button onClick={insertApproveStore}>insert approve store</button>
        <br/><br/><button onClick={insertRejectStore}>insert reject store</button>
        <br/><br/><button onClick={handleSubmitChange}>Test update</button>
        <br/><br/><button onClick={handleDelete}>Test delete</button>
        </>
    )
}

export default Home;