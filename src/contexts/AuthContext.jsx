import React, { useContext, useState, useEffect } from "react";
import { publicRequest } from "../RequestMethod";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [token, setToken] = useState();
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
            const fetchData = async () => {
                try {
                    if (user) {
                        user.getIdToken(true).then(async idToken => {
                            const res = await fetch(publicRequest("account/login"), {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    firebaseToken: idToken
                                })
                            });
                            const json = await res.json();
                            console.log(json);
                            setToken(idToken);
                        });
                    };
                } catch (error) { }
            };
            await fetchData();
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        token,
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