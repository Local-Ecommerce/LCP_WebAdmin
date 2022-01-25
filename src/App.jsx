import styled from "styled-components";
import React from 'react';

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
import AddStore from './pages/Store/AddStore';
import StoreDetail from './pages/Store/StoreDetail';
import EditStore from './pages/Store/EditStore';

import Apartment from './pages/Apartment/Apartment';
import ApartmentDetail from './pages/Apartment/ApartmentDetail';
import EditApartment from './pages/Apartment/EditApartment';

import Poi from './pages/Poi/Poi';
import AddPoi from "./pages/Poi/AddPoi";
import EditPoi from './pages/Poi/EditPoi';

import News from './pages/News/News';
import AddNews from "./pages/News/AddNews";
import EditNews from './pages/News/EditNews';

import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

const Main = styled.div`
    display: flex;
`;

const Content = styled.div`
    width: 100%;
    margin: 20px 50px 20px 300px;
    transition: all 0.3s;
`;

const PrivateRoute = ({ component: Component, ...rest }) =>  {
    const accessToken = localStorage.getItem("accessToken");

    return (
        <Route {...rest} render={(props) => (
            accessToken
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
    );
};

const App = () => {
    return (
        <Main>
            <Router>
                <Switch>
                    <Route path="/login"> <Login /> </Route>
                    <>
                        <Sidebar />
                        <Content>
                            <Header />
                            <ToastContainer />

                                <PrivateRoute exact path="/" component={Home} />

                                <PrivateRoute path="/collections" component={Collection} />
                                <PrivateRoute path="/collection/:id" component={CollectionDetail} />
                                <PrivateRoute path="/editCollection/:id" component={EditCollection} />

                                <PrivateRoute path="/categories" component={Category} />
                                <PrivateRoute path="/addCategory" component={AddCategory} />
                                <PrivateRoute path="/editCategory/:id" component={EditCategory} />

                                <PrivateRoute path="/menus" component={Menu} />
                                <PrivateRoute path="/menu/:id" component={MenuDetail} />
                                <PrivateRoute path="/editMenu/:id" component={EditMenu} />

                                <PrivateRoute path="/applicables" component={Home} />

                                <PrivateRoute path="/stores" component={Store} />
                                <PrivateRoute path="/store/:id" component={StoreDetail} />
                                <PrivateRoute path="/addStore" component={AddStore} />
                                <PrivateRoute path="/editStore/:id" component={EditStore} />

                                <PrivateRoute path="/apartments" component={Apartment} />
                                <PrivateRoute path="/apartment/:id" component={ApartmentDetail} />
                                <PrivateRoute path="/editApartment/:id" component={EditApartment} />

                                <PrivateRoute path="/pois" component={Poi} />
                                <PrivateRoute path="/addPoi" component={AddPoi} />
                                <PrivateRoute path="/editPoi/:id" component={EditPoi} />

                                <PrivateRoute path="/news" component={News} />
                                <PrivateRoute path="/addNews" component={AddNews} />
                                <PrivateRoute path="/editNews/:id" component={EditNews} />
                        </Content>
                    </>
                </Switch>
            </Router>
        </Main>
    )
}

export default App;