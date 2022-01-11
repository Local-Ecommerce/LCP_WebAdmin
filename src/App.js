import styled from "styled-components";
import React from 'react';

import Home from './pages/Home';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';

import Menu from './pages/Menu';
import MenuDetail from './pages/MenuDetail';

import Store from './pages/Store';
import AddStore from './pages/AddStore';
import StoreDetail from './pages/StoreDetail';
import EditStore from './pages/EditStore';

import Category from './pages/Category';

import Collection from './pages/Collection';
import CollectionDetail from './pages/CollectionDetail';
import EditCollection from './pages/EditCollection';

import Poi from './pages/Poi';
import AddPoi from "./pages/AddPoi";
import EditPoi from './pages/EditPoi';

import News from './pages/News';
import AddNews from "./pages/AddNews";
import EditNews from './pages/EditNews';

import { BrowserRouter as Router, Route } from "react-router-dom";

const Main = styled.div`
    display: flex;
    width: 100%;
    align-items: stretch;
`;

const Content = styled.div`
    width: 100%;
    margin: 20px 40px 20px 300px;
    transition: all 0.3s;
`;

const App = () => {

    return (
        <Main>
            <Router>
                <Sidebar />

                <Content>
                    <Header />

                    <Route exact path="/">              <Home />                </Route>

                    <Route path="/collections">         <Collection />          </Route>
                    <Route path="/collection/:id">      <CollectionDetail />    </Route>
                    <Route path="/editCollection/:id">  <EditCollection />      </Route>

                    <Route path="/categories">          <Category />            </Route>

                    <Route path="/menus">               <Menu />                </Route>
                    <Route path="/menu/:id">            <MenuDetail />          </Route>

                    <Route path="/applicables">         <Home />                </Route>

                    <Route path="/stores">              <Store />               </Route>
                    <Route path="/store/:id">           <StoreDetail />         </Route>
                    <Route path="/addStore">            <AddStore />            </Route>
                    <Route path="/editStore/:id">       <EditStore />           </Route>

                    <Route path="/pois">                <Poi />                 </Route>
                    <Route path="/addPoi">              <AddPoi />              </Route>
                    <Route path="/editPoi/:id">         <EditPoi />             </Route>

                    <Route path="/news">                <News />                </Route>
                    <Route path="/addNews">             <AddNews />             </Route>
                    <Route path="/editNews/:id">        <EditNews />            </Route>
                </Content>
            </Router>
        </Main>
    )
}

export default App;