import React, { useContext, useState, useEffect } from "react";
import { api } from "../RequestMethod";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [firebaseToken, setFirebaseToken] = useState();
    const [account, setAccount] = useState();
    const [resident, setResident] = useState({ role: '' });
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    async function login(email, password) {
        await auth.signInWithEmailAndPassword(email, password);
        auth.onAuthStateChanged(async user => {
            if (user) {
                const firebaseToken = await user.getIdToken(true);
                await api.post('accounts/login', {
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
                            navigate('/');
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
                                    navigate('/');
                                    setLoading(false);
                                } else {
                                    logout();
                                    localStorage.removeItem("TOKEN_KEY");
                                    localStorage.removeItem("EXPIRED_TIME");
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        }
                    } else {
                        logout();
                        localStorage.removeItem("TOKEN_KEY");
                        localStorage.removeItem("EXPIRED_TIME");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        });
    };

    function logout() {
        return auth.signOut();
    };
    
    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(async user => {
            if (user) {
                const firebaseToken = await user.getIdToken(true);
                await api.post('accounts/login', {
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
                                    setLoading(false);
                                } else {
                                    logout();
                                    localStorage.removeItem("TOKEN_KEY");
                                    localStorage.removeItem("EXPIRED_TIME");
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        }
                    } else {
                        logout();
                        localStorage.removeItem("TOKEN_KEY");
                        localStorage.removeItem("EXPIRED_TIME");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                localStorage.removeItem("TOKEN_KEY");
                localStorage.removeItem("EXPIRED_TIME");
                navigate('/login');
                setLoading(false);
            }
        });
        return unsubscribe;
    }, []);

    const value = {
        // currentUser,
        firebaseToken,
        account,
        resident,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}