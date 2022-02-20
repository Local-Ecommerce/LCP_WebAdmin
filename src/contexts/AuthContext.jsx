import React, { useContext, useState, useEffect } from "react";
import { api } from "../RequestMethod";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    // const [currentUser, setCurrentUser] = useState();
    const [firebaseToken, setFirebaseToken] = useState();
    const [account, setAccount] = useState();
    const [resident, setResident] = useState({ role: '' });
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
                        setAccount(res.data.Data);
                        localStorage.setItem('TOKEN_KEY', res.data.Data.Token);
                        localStorage.setItem('EXPIRED_TIME', res.data.Data.TokenExpiredDate);

                        if (res.data.Data.RoleId === "R002") {
                            setResident({ role: 'Admin' });
                            navigate("/");
                            setLoading(false);
                        } 
                        else if (res.data.Data.RoleId === "R001") {
                            const url = "resident/" + res.data.Data.AccountId;

                            api.get(url)
                            .then(function (res) {
                                if (res.data.Data.Type === "MarketManager") {
                                    setResident({
                                        role: res.data.Data.Type,
                                        apartmentId: res.data.Data.ApartmentId,
                                        residentId: res.data.Data.ResidentId
                                    });
                                    navigate("/");
                                    setLoading(false);
                                } else {
                                    logout();
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        }
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
        account,
        resident,
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