import styled from "styled-components";
import React from 'react';
import { AuthProvider, useAuth } from "./contexts/AuthContext";

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

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    return currentUser ? children : <Navigate to="/login" />;
}

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route element={<SidebarLayout/>}>
                        <Route exact path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />

                        <Route path="/collections" element={<PrivateRoute> <Collection /> </PrivateRoute>} />
                        <Route path="/collection/:id" element={<PrivateRoute> <CollectionDetail /> </PrivateRoute>} />
                        <Route path="/editCollection/:id" element={<PrivateRoute> <EditCollection /> </PrivateRoute>} />

                        <Route path="/categories" element={<PrivateRoute> <Category /> </PrivateRoute>} />
                        <Route path="/addCategory" element={<PrivateRoute> <AddCategory /> </PrivateRoute>} />
                        <Route path="/editCategory/:id" element={<PrivateRoute> <EditCategory /> </PrivateRoute>} />

                        <Route path="/menus" element={<PrivateRoute> <Menu /> </PrivateRoute>} />
                        <Route path="/menu/:id" element={<PrivateRoute> <MenuDetail /> </PrivateRoute>} />
                        <Route path="/editMenu/:id" element={<PrivateRoute> <EditMenu /> </PrivateRoute>} />

                        <Route path="/applicables" element={<PrivateRoute> <Home /> </PrivateRoute>} />

                        <Route path="/stores" element={<PrivateRoute> <Store /> </PrivateRoute>} />
                        <Route path="/store/:id" element={<PrivateRoute> <StoreDetail /> </PrivateRoute>} />
                        <Route path="/editStore/:id" element={<PrivateRoute> <EditStore /> </PrivateRoute>} />

                        <Route path="/apartments" element={<PrivateRoute> <Apartment /> </PrivateRoute>} />
                        <Route path="/apartment/:id" element={<PrivateRoute> <ApartmentDetail /> </PrivateRoute>} />
                        <Route path="/addApartment" element={<PrivateRoute> <AddApartment /> </PrivateRoute>} />
                        <Route path="/editApartment/:id" element={<PrivateRoute> <EditApartment /> </PrivateRoute>} />

                        <Route path="/pois" element={<PrivateRoute> <Poi /> </PrivateRoute>} />
                        <Route path="/addPoi" element={<PrivateRoute> <AddPoi /> </PrivateRoute>} />
                        <Route path="/editPoi/:id" element={<PrivateRoute> <EditPoi /> </PrivateRoute>} />

                        <Route path="/news" element={<PrivateRoute> <News /> </PrivateRoute>} />
                        <Route path="/addNews" element={<PrivateRoute> <AddNews /> </PrivateRoute>} />
                        <Route path="/editNews/:id" element={<PrivateRoute> <EditNews /> </PrivateRoute>} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App;