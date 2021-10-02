import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import Menus from '../../mockdata/Menus';
import SweetAlert from 'sweetalert-react';

class MenuList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: Menus,
            showAlert: false,
            titleAlert: '',
            idALert: '',
        }
    };

    renderMenu = () => {
        if (this.state.menus.length === 0) {
            return <Menu menu={0} />
        }

        return this.state.menus.map((menu) => {
            return (
                <Menu
                    menu={menu}
                    handleShowAlert={this.handleShowAlert}
                />
            )
        });
    };

    handleDeleteMenu = () => {
        let { idAlert } = this.state;
        if (this.state.menus.length > 0) {
            for (let i = 0; i < this.state.menus.length; i++) {
                if (this.state.menus[i].id === idAlert) {
                    this.state.menus.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({
            showAlert: false
        });
    };

    handleShowAlert = (menu) => {
        this.setState({
            showAlert: true,
            titleAlert: menu.name,
            idAlert: menu.id
        });
    };

    render() {
        return (
            <div>
                <h3 class="mb-3">Danh sách bảng giá</h3>

                <div class="container-fluid bg-white rounded">
                    <div class="row mb-4">
                        <div class="col-md-4 mt-4">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search theo tên bảng giá" />
                                <span className="input-group-btn">
                                    <button className="btn btn-info" type="button">Clear</button>
                                </span>
                            </div>
                        </div>

                        <div class="col-md-2 mt-4">
                            <div class="dropdown ml-3">
                                <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Lọc trạng thái
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <div class="dropdown-item">Active</div>
                                    <div class="dropdown-item">Inactive</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-success">
                        <SweetAlert
                            show={this.state.showAlert}
                            title="Xóa bảng giá"
                            text={this.state.titleAlert}
                            showCancelButton
                            onOutsideClick={() => this.setState({ showAlert: false })}
                            onEscapeKey={() => this.setState({ showAlert: false })}
                            onCancel={() => this.setState({ showAlert: false })}
                            onConfirm={() => this.handleDeleteMenu()}
                        />

                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{ width: '75%' }}>Tên bảng giá</th>
                                    <th style={{ width: '10%' }} class="text-center">Trạng thái</th>
                                    <th style={{ width: '15%' }} class="text-center">Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderMenu()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuList;