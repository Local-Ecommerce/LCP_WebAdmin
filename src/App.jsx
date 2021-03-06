/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { DateTime } from 'luxon';
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuth } from "./contexts/AuthContext";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';
import Category from './pages/Category';
import Store from './pages/Store';
import Menu from './pages/Menu';
import Apartment from './pages/Apartment';
import ApartmentResident from './pages/ApartmentResident';
import Poi from './pages/Poi';
import News from './pages/News';
import Resident from './pages/Resident';
import Product from './pages/Product';
import CreateOrder from './pages/CreateOrder';
import UserProfile from './pages/UserProfile';
import PageNotFound from './pages/PageNotFound';

const HeaderWrapper = styled.div`
    position:absolute; position: fixed; 
    left:0; right:0;
    height: 62px;
`;

const SidebarWrapper = styled.div`
    position:absolute; position: fixed; 
    left:0; top:0px; bottom: 0;
    width: 245px;
`;

const ContentWrapper = styled.div`
    position: absolute;
    left:245px; top:62px; right:0; bottom:0;
`;

const SidebarLayout = ({ refresh, toggleRefresh }) => (
	<>
        <ToastContainer 
			style={{ width: "320px" }}
			autoClose={5000}
			position="top-center"
			pauseOnFocusLoss={false}
		/>

		<ContentWrapper>
			<Outlet />
		</ContentWrapper>

		<SidebarWrapper>
			<Sidebar refresh={refresh} toggleRefresh={toggleRefresh} />
		</SidebarWrapper>

		<HeaderWrapper>
			<Header refresh={refresh} toggleRefresh={toggleRefresh} />
		</HeaderWrapper>
	</>
);

const RequireLoggedIn = ({ children }) => {
    const { logout } = useAuth();
    const user = JSON.parse(localStorage.getItem('USER'));
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    const expiredTime = localStorage.getItem("EXPIRED_TIME");

    if ((user && user.RoleId === "R001" && user.Residents[0].Type !== "MarketManager")
     || typeof user === 'undefined' || user === null 
     || typeof accessToken === 'undefined' || accessToken === null 
     || typeof refreshToken === 'undefined' || refreshToken === null 
     || typeof expiredTime === 'undefined' || expiredTime === null 
     || DateTime.fromISO(expiredTime).diffNow().toObject().milliseconds < 0) {
        logout();
        return <Navigate to="/login" />;
    }

    return children;
}

const App = () => {
    const [refresh, setRefresh] = useState(false);
    const toggleRefresh = () => { setRefresh(!refresh) };
    
    return (
        <> 
            <Routes>
                <Route element={<SidebarLayout refresh={refresh} toggleRefresh={toggleRefresh} />}>
                    <Route 
                        exact path="/" 
                        element={<RequireLoggedIn> <Home /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/categories" 
                        element={<RequireLoggedIn> <Category /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/stores" 
                        element={<RequireLoggedIn> <Store refresh={refresh} toggleRefresh={toggleRefresh} /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/menus" 
                        element={<RequireLoggedIn> <Menu /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/products" 
                        element={<RequireLoggedIn> <Product refresh={refresh} toggleRefresh={toggleRefresh} /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/apartments" 
                        element={<RequireLoggedIn> <Apartment /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/apartment/:id" 
                        element={<RequireLoggedIn> <ApartmentResident /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/createOrder" 
                        element={<RequireLoggedIn> <CreateOrder /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/pois" 
                        element={<RequireLoggedIn> <Poi /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/news" 
                        element={<RequireLoggedIn> <News /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/residents" 
                        element={<RequireLoggedIn> <Resident refresh={refresh} toggleRefresh={toggleRefresh} /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/userProfile" 
                        element={<RequireLoggedIn> <UserProfile refresh={refresh} toggleRefresh={toggleRefresh} /> </RequireLoggedIn>}
                    />
                </Route>

                <Route 
                    path="/login" 
                    element={<Login />} 
                />

                <Route 
                    path="*" 
                    element={<PageNotFound />}
                />
            </Routes>
        </>
    )
}

export default App;