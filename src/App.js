import React, { Component } from 'react';
import Sidebar from './pages/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import MenuList from './pages/Menu/MenuList';
import StoreList from './pages/Store/StoreList';
import ProductList from './pages/Product/ProductList';
import CategoryList from './pages/Category/CategoryList';
import CollectionList from './pages/Collection/CollectionList';

import Header from './pages/Header/Header';

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {

    render() {
        return (
            <div class="wrapper">
                <Router>
                    <Sidebar />

                    <nav id="content">
                        <Header />

                        <Route exact path="/" component={Home} />
                        <Route path="/products" component={ProductList} />
                        <Route path="/categories" component={CategoryList} />
                        <Route path="/collections" component={CollectionList} />
                        <Route path="/menus" component={MenuList} />
                        <Route path="/applicables" component={ProductList} />
                        <Route path="/stores" component={StoreList} />
                    </nav>
                </Router>
            </div>
        )
    }
}

export default App;