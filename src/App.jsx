import styled from "styled-components";
import React from 'react';
import { AuthProvider } from "./contexts/AuthContext";

import Home from './pages/Home';
import Login from './pages/Login';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Collection from './pages/Collection/Collection';
import CollectionDetail from './pages/Collection/CollectionDetail';
import EditCollection from './pages/Collection/EditCollection';

import Category from './pages/Category/Category';
import AddCategory from './pages/Category/AddCategory';
import EditCategory from './pages/Category/EditCategory';

import Menu from './pages/Menu/Menu';
import MenuDetail from './pages/Menu/MenuDetail';
import EditMenu from './pages/Menu/EditMenu';

import Store from './pages/Store/Store';
import StoreDetail from './pages/Store/StoreDetail';
import EditStore from './pages/Store/EditStore';

import Apartment from './pages/Apartment/Apartment';
import AddApartment from './pages/Apartment/AddApartment';
import ApartmentDetail from './pages/Apartment/ApartmentDetail';
import EditApartment from './pages/Apartment/EditApartment';

import Poi from './pages/Poi/Poi';
import AddPoi from "./pages/Poi/AddPoi";
import EditPoi from './pages/Poi/EditPoi';

import News from './pages/News/News';
import AddNews from "./pages/News/AddNews";
import EditNews from './pages/News/EditNews';

import { BrowserRouter as Router, Route, Navigate, Routes, Outlet } from "react-router-dom";

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
        <ToastContainer />

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
    const expireDuration = 1000 * 60 * 60; // 1 hours
    const currentTime = new Date().getTime();
    const expiredTime = localStorage.getItem("EXPIRED_TIME");
    const token = localStorage.getItem("TOKEN_KEY");

    if ((token === undefined) 
            || (expiredTime === undefined) 
            /*|| (expiredTime !== undefined && currentTime - expiredTime > expireDuration)*/) {
        localStorage.removeItem("TOKEN_KEY");
        localStorage.removeItem("EXPIRED_TIME");
        return <Navigate to="/login" />;
    }
    return children;
}

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route element={<SidebarLayout/>}>
                        <Route exact path="/" element={<RequireLoggedIn> <Home /> </RequireLoggedIn>} />

                        <Route path="/collections" element={<RequireLoggedIn> <Collection /> </RequireLoggedIn>} />
                        <Route path="/collection/:id" element={<RequireLoggedIn> <CollectionDetail /> </RequireLoggedIn>} />
                        <Route path="/editCollection/:id" element={<RequireLoggedIn> <EditCollection /> </RequireLoggedIn>} />

                        <Route path="/categories" element={<RequireLoggedIn> <Category /> </RequireLoggedIn>} />
                        <Route path="/addCategory" element={<RequireLoggedIn> <AddCategory /> </RequireLoggedIn>} />
                        <Route path="/editCategory/:id" element={<RequireLoggedIn> <EditCategory /> </RequireLoggedIn>} />

                        <Route path="/menus" element={<RequireLoggedIn> <Menu /> </RequireLoggedIn>} />
                        <Route path="/menu/:id" element={<RequireLoggedIn> <MenuDetail /> </RequireLoggedIn>} />
                        <Route path="/editMenu/:id" element={<RequireLoggedIn> <EditMenu /> </RequireLoggedIn>} />

                        <Route path="/applicables" element={<RequireLoggedIn> <Home /> </RequireLoggedIn>} />

                        <Route path="/stores" element={<RequireLoggedIn> <Store /> </RequireLoggedIn>} />
                        <Route path="/store/:id" element={<RequireLoggedIn> <StoreDetail /> </RequireLoggedIn>} />
                        <Route path="/editStore/:id" element={<RequireLoggedIn> <EditStore /> </RequireLoggedIn>} />

                        <Route path="/apartments" element={<RequireLoggedIn> <Apartment /> </RequireLoggedIn>} />
                        <Route path="/apartment/:id" element={<RequireLoggedIn> <ApartmentDetail /> </RequireLoggedIn>} />
                        <Route path="/addApartment" element={<RequireLoggedIn> <AddApartment /> </RequireLoggedIn>} />
                        <Route path="/editApartment/:id" element={<RequireLoggedIn> <EditApartment /> </RequireLoggedIn>} />

                        <Route path="/pois" element={<RequireLoggedIn> <Poi /> </RequireLoggedIn>} />
                        <Route path="/addPoi" element={<RequireLoggedIn> <AddPoi /> </RequireLoggedIn>} />
                        <Route path="/editPoi/:id" element={<RequireLoggedIn> <EditPoi /> </RequireLoggedIn>} />

                        <Route path="/news" element={<RequireLoggedIn> <News /> </RequireLoggedIn>} />
                        <Route path="/addNews" element={<RequireLoggedIn> <AddNews /> </RequireLoggedIn>} />
                        <Route path="/editNews/:id" element={<RequireLoggedIn> <EditNews /> </RequireLoggedIn>} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App;