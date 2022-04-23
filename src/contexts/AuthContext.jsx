/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, useRef } from "react";
import { api } from "../RequestMethod";
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

import ExtendSessionModal from './ExtendSessionModal';
import { auth, firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { signOut, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    let navigate = useNavigate();
    const [sessionModal, setSessionModal] = useState(false);
    function toggleSessionModal() { 
        setSessionModal(!sessionModal); 
    };
    const timer = useRef(null);

    useEffect(() => {
        const expiredTime = localStorage.getItem("EXPIRED_TIME");
        if (expiredTime && typeof expiredTime !== 'undefined' && expiredTime !== null && DateTime.fromISO(expiredTime).diffNow().toObject().milliseconds > 0) {
            timer.current = setTimeout(() => {
                if (!sessionModal) {
                    toggleSessionModal();
                }
            }, DateTime.fromISO(expiredTime).diffNow().toObject().milliseconds);
            
            return () => clearTimeout(timer.current);
        }
    }, []);

    async function logout() {
        await signOut(auth);
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (accessToken !== 'undefined' && accessToken !== null) {
            await api.put("accounts/logout")
            .catch(function (error) {
                console.log(error);
            });
        };
        setSessionModal(false);
        clearTimeout(timer.current);
        localStorage.removeItem("USER");
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("EXPIRED_TIME");
    };

    async function createAuthentication(email, password, input) {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setDoc(doc(firestore, "user", userCredential.user.uid), {
                role: input.role,
                fullname: input.fullname,
                phoneNumber: input.phoneNumber,
                gender: input.gender,
                deliveryAddress: input.deliveryAddress,
                dob: DateTime.fromISO(input.dob).toFormat('MM/dd/yyyy'),
                apartmentId: input.apartmentId
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
                    console.log(res.data);
                    localStorage.setItem('ACCESS_TOKEN', res.data.Data.AccessToken);
                    localStorage.setItem('EXPIRED_TIME', res.data.Data.AccessTokenExpiredDate);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        extendSession();
    }

    const value = {
        logout,
        createAuthentication,
        timer,
        toggleSessionModal
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>

            <ExtendSessionModal 
                display={sessionModal}
                toggle={toggleSessionModal}
                extendSession={extendSession}
                logout={logout}
            />
        </>
    );
}