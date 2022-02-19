import React, { useContext, useState, useEffect } from "react";
import { api } from "../RequestMethod";
import { auth } from "../firebase";
import { DateTime } from 'luxon';
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    // const [currentUser, setCurrentUser] = useState();
    const [firebaseToken, setFirebaseToken] = useState();
    const [authUser, setAuthUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    };

    function logout() {
        return auth.signOut();
    };

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    };

    // function updateEmail(email) {
    //     return currentUser.updateEmail(email);
    // };

    // function updatePassword(password) {
    //     return currentUser.updatePassword(password);
    // };
    
    let navigate = useNavigate();

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(async user => {
            if (user) {
                const firebaseToken = await user.getIdToken(true);
                await api.post('account/login', {
                    firebaseToken: firebaseToken,
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        setFirebaseToken(firebaseToken);
                        setAuthUser(res.data.Data);
                        localStorage.setItem('TOKEN_KEY', res.data.Data.Token);
                        localStorage.setItem('EXPIRED_TIME', res.data.Data.TokenExpiredDate);
                        navigate("/");
                        setLoading(false);
                    } else {
                        logout();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                localStorage.removeItem("TOKEN_KEY");
                localStorage.removeItem("EXPIRED_TIME");
                setLoading(false);
            }
        })
        return unsubscribe;
    }, [])

    useEffect(() => {

    }, []);

    const value = {
        // currentUser,
        firebaseToken,
        authUser,
        login,
        signup,
        logout,
        resetPassword,
        // updateEmail,
        // updatePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}