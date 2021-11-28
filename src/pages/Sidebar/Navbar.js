import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class Navbar extends Component {

    render() {
        return (
            <ul class="list-unstyled components">

                <li>
                    <NavLink to="/" exact activeClassName="sideBarActive">Trang Chủ</NavLink>
                </li>

                <li>
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle sidebarDropdown-toggle">Sản phẩm</a>
                    <ul class="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <NavLink to="/products" exact activeClassName="active">Danh sách sản phẩm</NavLink>
                        </li>
                        <li>
                            <NavLink to="/categories" exact activeClassName="sideBarActive">Danh mục</NavLink>
                        </li>
                        <li>
                            <NavLink to="/collections" exact activeClassName="sideBarActive">Bộ sưu tập</NavLink>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle sidebarDropdown-toggle">Bảng giá</a>
                    <ul class="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <NavLink to="/menus" exact activeClassName="sideBarActive">Danh sách bảng giá</NavLink>
                        </li>
                        <li>
                            <NavLink to="/applicables" exact activeClassName="sideBarActive">Cửa hàng áp dụng</NavLink>
                        </li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/stores" exact activeClassName="sideBarActive">Cửa hàng</NavLink>
                </li>
            </ul>
        );
    }
}

export default Navbar;