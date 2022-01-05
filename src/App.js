import styled from "styled-components";
import React from 'react';
import Sidebar from './pages/Sidebar';
import Home from './pages/Home/Home';
import Menu from './pages/Menu';
import MenuDetail from './pages/MenuDetail';
import Store from './pages/Store';
import StoreDetail from './pages/StoreDetail';
import EditStore from './pages/EditStore';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';
import Collection from './pages/Collection';
import CollectionDetail from './pages/CollectionDetail';
import Header from './pages/Header';
import AddStore from './pages/AddStore';
import { BrowserRouter as Router, Route } from "react-router-dom";

const Main = styled.div`
    display: flex;
    width: 100%;
    align-items: stretch;
`;

const Content = styled.div`
    background: white;
    width: 100%;
    margin: 20px 20px 20px 310px;
    transition: all 0.3s;
`;

const App = () => {

    return (
        <Main>
            <Router>
                <Sidebar />

                <Content>
                    <Header />

                    <Route exact path="/">          <Home />            </Route>
                    <Route path="/products">        <Product />         </Route>
                    <Route path="/product/:id">     <ProductDetail />   </Route>
                    <Route path="/categories">      <Category />        </Route>
                    <Route path="/collections">     <Collection />      </Route>
                    <Route path="/collection/:id">  <CollectionDetail /></Route>
                    <Route path="/menus">           <Menu />            </Route>
                    <Route path="/menu/:id">        <MenuDetail />      </Route>
                    <Route path="/applicables">     <Home />            </Route>
                    <Route path="/stores">          <Store />           </Route>
                    <Route path="/store/:id">       <StoreDetail />     </Route>
                    <Route path="/addStore">        <AddStore />        </Route>
                    <Route path="/editStore/:id">   <EditStore />       </Route>
                </Content>
            </Router>
        </Main>
    )
}

export default App;