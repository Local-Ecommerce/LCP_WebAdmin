import React, { Component } from 'react';
import Home from './components/Home';
import ProductList from './components/ProductList';
import CategoryList from './components/CategoryList';
import ShopDirectionList from './components/ShopDirectionList';

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class App extends Component {

    render() {
        return (
            <div class="wrapper">
                <Router>
                    <nav id="sidebar">
                        <div class="sidebar-header">
                            <img class="logo" src="../images/loich.png" alt="Loich Logo" />
                        </div>

                        <ul class="list-unstyled components">

                            <li>
                                <NavLink to="/" exact activeClassName="active">Trang Chủ</NavLink>
                            </li>

                            <li>
                                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Sản phẩm</a>
                                <ul class="collapse list-unstyled" id="homeSubmenu">
                                    <li>
                                        <NavLink to="/products" exact activeClassName="active">Danh sách sản phẩm</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/categories" exact activeClassName="active">Danh mục</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/collections" exact activeClassName="active">Bộ sưu tập</NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Bảng giá</a>
                                <ul class="collapse list-unstyled" id="pageSubmenu">
                                    <li>
                                        <NavLink to="/pricelists" exact activeClassName="active">Danh sách bảng giá</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/applicables" exact activeClassName="active">Cửa hàng áp dụng</NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <NavLink to="/stores" exact activeClassName="active">Cửa hàng</NavLink>
                            </li>
                        </ul>
                    </nav>

                    <nav id="content">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="float-right mb-4 mx-3">

                                    <button
                                        type="button" class="btn btn-info mr-3"
                                        data-toggle="modal"
                                        data-target="#notificationModal" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell mr-1" viewBox="0 0 16 16">
                                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                        </svg>
                                        Thông báo
                                    </button>

                                    <button
                                        type="button" class="btn btn-info mr-3"
                                        data-toggle="modal"
                                        data-target="#directionModal" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-move mr-1" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z" />
                                        </svg>
                                         Điều hướng
                                    </button>

                                    <img class="avatar" src="../images/user.png" alt="Loich Logo" />

                                    <div class="modal fade" id="notificationModal" tabindex="-1" aria-labelledby="notificationModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="notificationModalLabel">Danh sách thông báo</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>

                                                <div class="modal-body">
                                                    etc.
                                                </div>

                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Quay lại</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal fade" id="directionModal" tabindex="-1" aria-labelledby="directionModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-xl">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="directionModalLabel">Danh sách cửa hàng</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>

                                                <div class="modal-body">
                                                    <ShopDirectionList />
                                                </div>

                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Quay lại</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Route exact path="/" component={Home} />
                        <Route path="/products" component={ProductList} />
                        <Route path="/categories" component={CategoryList} />
                        <Route path="/collections" component={ProductList} />
                        <Route path="/pricelists" component={ProductList} />
                        <Route path="/applicables" component={ProductList} />
                        <Route path="/stores" component={ProductList} />
                    </nav>
                </Router>
            </div>
        )
    }
}

export default App;