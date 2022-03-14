/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';
import { useAuth } from "./contexts/AuthContext";
import { Route, Routes, Outlet, Navigate, useLocation } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';
import Category from './pages/Category/Category';
import Store from './pages/Store/Store';
import Menu from './pages/Menu/Menu';
import Apartment from './pages/Apartment/Apartment';
import Poi from './pages/Poi/Poi';
import News from './pages/News/News';
import Resident from './pages/Resident/Resident';
import Product from './pages/Product/Product';
import PageNotFound from './pages/PageNotFound';
import ExtendSessionModal from './contexts/ExtendSessionModal';

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

const SidebarLayout = () => (
	<>
        <ToastContainer 
			style={{ width: "320px" }}
			autoClose={5000}
			position="top-center"
            transition={Slide}
		/>

		<ContentWrapper>
			<Outlet />
		</ContentWrapper>

		<SidebarWrapper>
			<Sidebar />
		</SidebarWrapper>

		<HeaderWrapper>
			<Header />
		</HeaderWrapper>
	</>
);

const RequireLoggedIn = ({ children }) => {
    const { logout } = useAuth();
    const user = JSON.parse(localStorage.getItem('USER'));
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    const expiredTime = localStorage.getItem("EXPIRED_TIME");
    const isToggle = localStorage.getItem("IS_TOGGLE");

    if ((user && user.RoleId === "R001" && user.Residents[0].Type !== "MarketManager")
     || typeof user === 'undefined' || user === null 
     || typeof accessToken === 'undefined' || accessToken === null 
     || typeof refreshToken === 'undefined' || refreshToken === null 
     || typeof expiredTime === 'undefined' || expiredTime === null
     || typeof isToggle === 'undefined' || isToggle === null || isToggle === "1") {
        logout();
        return <Navigate to="/login" />;
    };
    return children;
}

const App = () => {
    // const { logout, extendSession } = useAuth();
    // const location = useLocation();
    // const [modal, setModal] = useState(false);
    // function toggleModal() {
    //     localStorage.setItem('IS_TOGGLE', "1");
    //     setModal(true); 
    // }

    // useEffect(() => {
    //     const isToggle = localStorage.getItem("IS_TOGGLE");
    //     const expiredTime = localStorage.getItem("EXPIRED_TIME");

    //     if (isToggle === "0" && expiredTime && DateTime.fromISO(expiredTime).diffNow().toObject().milliseconds < 0) {
    //         console.log("case: 3");
    //         toggleModal();
    //     }

    //     console.log(location.pathname);
    // }, [location]);

    return (
        <> 
            <Routes>
                <Route element={<SidebarLayout />}>
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
                        element={<RequireLoggedIn> <Store /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/menus" 
                        element={<RequireLoggedIn> <Menu /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/products" 
                        element={<RequireLoggedIn> <Product /> </RequireLoggedIn>}
                    />

                    <Route 
                        exact path="/apartments" 
                        element={<RequireLoggedIn> <Apartment /> </RequireLoggedIn>}
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
                        element={<RequireLoggedIn> <Resident /> </RequireLoggedIn>}
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

            {/* <ExtendSessionModal 
                display={modal}
                extendSession={extendSession}
                logout={logout}
            /> */}
        </>
    )
}

export default App;