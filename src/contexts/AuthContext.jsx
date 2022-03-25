/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { api } from "../RequestMethod";
import { useNavigate } from 'react-router-dom';

import { auth, firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { signOut, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    let navigate = useNavigate();

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

    async function createAuthentication(email, password, apartmentId) {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setDoc(doc(firestore, "user", userCredential.user.uid), {
                role: 'MarketManager',
                fullname: 'Quản lí chung cư',
                gender: null,
                deliveryAddress: null,
                dob: null,
                apartmentId: apartmentId
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
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
        logout,
        createAuthentication,
        extendSession
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}