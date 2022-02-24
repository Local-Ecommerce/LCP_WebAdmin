import React, { useContext, useState, useEffect } from "react";
import { api } from "../RequestMethod";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    async function login(email, password) {
        await auth.signInWithEmailAndPassword(email, password);
        auth.onAuthStateChanged(async user => {
            if (user) {
                const firebaseToken = await user.getIdToken(true);
                console.log("Firebase Token: " + firebaseToken);
                await api.post('accounts/login', {
                    firebaseToken: firebaseToken,
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS" && (res.data.Data.RoleId === "R002" ||
                            (res.data.Data.RoleId === "R001" && res.data.Data.Residents[0].Type === "MarketManager"))) {
                        localStorage.setItem('USER', JSON.stringify(res.data.Data));
                        localStorage.setItem('TOKEN_KEY', res.data.Data.RefreshTokens[0].AccessToken);
                        localStorage.setItem('EXPIRED_TIME', res.data.Data.TokenExpiredDate);
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
        await auth.signOut();
        navigate('/login');
        localStorage.removeItem("USER");
        localStorage.removeItem("TOKEN_KEY");
        localStorage.removeItem("EXPIRED_TIME");
        setLoading(false);
    };
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('USER'));
        const token = localStorage.getItem("TOKEN_KEY");
        const expiredTime = localStorage.getItem("EXPIRED_TIME");

        if (user === null || token === null || expiredTime === null || 
            (expiredTime && DateTime.fromFormat(expiredTime, 'D tt').diffNow().toObject().milliseconds < 0)) {
            logout();
        } else {
            setLoading(false);
        }
    }, []);

    const value = {
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}