import React, { useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const { currentUser, token } = useAuth();

    useEffect(() => {
        console.log(token);
    }, []);

    return (
        <>
        Hello, {currentUser.email}. Token: {token}
        </>
    )
}

export default Home;