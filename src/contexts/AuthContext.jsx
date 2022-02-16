import React, { useContext, useState, useEffect } from "react";
import { publicRequest } from "../RequestMethod";
import { auth } from "../firebase";
const axios = require('axios');

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
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

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    };

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            setCurrentUser(user);
            if (user) {
                const firebaseToken = await user.getIdToken(true);
                await axios.post(publicRequest('account/login'), {
                    firebaseToken: firebaseToken,
                })
                .then(function (response) {
                    setFirebaseToken(firebaseToken);
                    setAuthUser(response.data.Data);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        firebaseToken,
        authUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}