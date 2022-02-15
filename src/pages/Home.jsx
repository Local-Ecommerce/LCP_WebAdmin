import React from 'react';
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const { currentUser } = useAuth();

    return (
        <>
        Hello, {currentUser.email}
        </>
    )
}

export default Home;