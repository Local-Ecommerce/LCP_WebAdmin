/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { api } from "../RequestMethod";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import ExtendSessionModal from './ExtendSessionModal';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    let navigate = useNavigate();

    function toggleModal() { 
        setModal(true); 
    }


    async function login(email, password) {
        setLoading(true);
        await auth.signInWithEmailAndPassword(email, password);
        auth.onAuthStateChanged(async user => {
            if (user) {
                const firebaseToken = await user.getIdToken(true);
                console.log("Firebase Token: " + firebaseToken);
                let url = "accounts/login";

                await api.post(url, {
                    firebaseToken: firebaseToken,
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS" && (res.data.Data.RoleId === "R002" ||
                            (res.data.Data.RoleId === "R001" && res.data.Data.Residents[0].Type === "MarketManager"))) {
                        localStorage.setItem('USER', JSON.stringify(res.data.Data));
                        localStorage.setItem('ACCESS_TOKEN', res.data.Data.RefreshTokens[0].AccessToken);
                        localStorage.setItem('REFRESH_TOKEN', res.data.Data.RefreshTokens[0].Token);
                        localStorage.setItem('EXPIRED_TIME', res.data.Data.RefreshTokens[0].AccessTokenExpiredDate);
                        navigate("/");
                        setLoading(false);
                    } else {    //not admin or marketManager
                        setLoading(false);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false);
                });
            } else {    //wrong firebase username & password
                setLoading(false);
            }
        });
    };

    async function logout() {
        setLoading(true);
        let url ="accounts/logout";

        await api.put(url)
        .then(function (res) {
            setModal(false); 
            navigate('/login');
            localStorage.removeItem("USER");
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("REFRESH_TOKEN");
            localStorage.removeItem("EXPIRED_TIME");
            setLoading(false);
        })
        .catch(function (error) {
            console.log(error);
            setLoading(false);
        });
    };
    
    async function handleExtendSession() {
        setLoading(true);
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
                    localStorage.setItem('ACCESS_TOKEN', res.data.Data);
                    setLoading(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
        }
        extendSession();
    }

    const value = {
        login,
        logout,
        toggleModal
    };

    return (
        <>
            <ExtendSessionModal 
                display={modal}
                toggle={toggleModal}
                handleExtendSession={handleExtendSession}
                logout={logout}
            />

            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        </>
    );
}