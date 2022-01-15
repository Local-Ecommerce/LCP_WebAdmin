import styled from "styled-components";
import React from 'react';

import Home from './pages/Home';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';

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

import Poi from './pages/Poi/Poi';
import AddPoi from "./pages/Poi/AddPoi";
import EditPoi from './pages/Poi/EditPoi';

import News from './pages/News/News';
import AddNews from "./pages/News/AddNews";
import EditNews from './pages/News/EditNews';

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
                    <Route path="/addCategory">         <AddCategory />         </Route>
                    <Route path="/editCategory/:id">    <EditCategory />        </Route>

                    <Route path="/menus">               <Menu />                </Route>
                    <Route path="/menu/:id">            <MenuDetail />          </Route>
                    <Route path="/editMenu/:id">        <EditMenu />            </Route>

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