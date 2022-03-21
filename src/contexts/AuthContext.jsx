/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { api } from "../RequestMethod";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    let navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    
    useEffect(() => { //http://localhost:5002
        setSocket(io("https://lcpsocket.herokuapp.com/"));

        const user = JSON.parse(localStorage.getItem('USER'));
        if (user) {
            console.log("login success")
            socket?.emit("newAccount", user.AccountId);
        }
    }, []);

    async function login(email, password) {
        await signInWithEmailAndPassword(auth, email, password);
        onAuthStateChanged(auth, async user => {
            if (user) {
                const firebaseToken = await user.getIdToken(true);
                console.log("Firebase Token: " + firebaseToken);
                let url = "accounts/login";

                await api.post(url, {
                    firebaseToken: firebaseToken,
                    role: "R002"
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS" && (res.data.Data.RoleId === "R002" 
                    || (res.data.Data.RoleId === "R001" && res.data.Data.Residents[0].Type === "MarketManager"))) {
                        socket?.emit("newAccount", res.data.Data.AccountId);
                        localStorage.setItem('USER', JSON.stringify(res.data.Data));
                        localStorage.setItem('ACCESS_TOKEN', res.data.Data.RefreshTokens[0].AccessToken);
                        localStorage.setItem('REFRESH_TOKEN', res.data.Data.RefreshTokens[0].Token);
                        localStorage.setItem('EXPIRED_TIME', res.data.Data.RefreshTokens[0].AccessTokenExpiredDate);
                        localStorage.setItem('IS_TOGGLE', "0");
                        navigate("/");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            };
        });
    };

    async function logout() {
        await signOut(auth);
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        
        if (accessToken !== null) {
            await api.put("accounts/logout")
            .catch(function (error) {
                console.log(error);
            });
        };

        localStorage.removeItem("USER");
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("EXPIRED_TIME");
        localStorage.removeItem("IS_TOGGLE");
    };
    
    async function extendSession() {
        let url = "accounts/refresh-token";
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        const refreshToken = localStorage.getItem("REFRESH_TOKEN");

        const extendSession = () => {
            api.post(url, {
                token: refreshToken,
                accessToken: accessToken
            })
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    localStorage.setItem('ACCESS_TOKEN', res.data.Data.AccessToken);
                    localStorage.setItem('EXPIRED_TIME', res.data.Data.AccessTokenExpiredDate);
                    localStorage.setItem('IS_TOGGLE', "0");
                    navigate("/");
                }
            })
            .catch(function (error) {
                console.log(error);
                navigate("/");
            });
        }
        extendSession();
    }

    const value = {
        socket,
        login,
        logout,
        extendSession
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}