import React, { Component } from 'react';
import Store from './Store';
import AddStore from './AddStore';
import Stores from '../../mockdata/Stores';
import SweetAlert from 'sweetalert-react';
import ReactPagenav from 'react-pagenav';

class StoreList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: Stores,
            showAlert: false,
            titleAlert: '',
            idALert: '',

            page: 1,
            total: Stores.length,
            pageSize: 5,
            maxLink: 5
        }
    };

    handleClick = (page, e) => {
        this.setState({ page: page })
    }

    renderStore = () => {
        if (this.state.stores.length === 0) {
            return <Store store={0} />
        }

        var indexFirst = (this.state.page - 1) * this.state.pageSize;
        var indexLast = indexFirst + this.state.pageSize;

        return this.state.stores.slice(indexFirst, indexLast).map((store) => {
            return (
                <Store
                    store={store}
                    handleShowAlert={this.handleShowAlert}
                />
            )
        });
    };

    handleDeleteStore = () => {
        let { idAlert } = this.state;
        if (this.state.stores.length > 0) {
            for (let i = 0; i < this.state.stores.length; i++) {
                if (this.state.stores[i].id === idAlert) {
                    this.state.stores.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({
            showAlert: false
        });
    };

    handleShowAlert = (store) => {
        this.setState({
            showAlert: true,
            titleAlert: store.name,
            idAlert: store.id
        });
    };

    render() {
        var createPageUrl = function (unit) {
            return '#p?page=' + unit.page
        }

        return (
            <div>
                <div class="row mb-3 ml-1">
                    <h3 class="mr-4">Danh sách cửa hàng</h3>

                    
                </div>

                <div class="container-fluid bg-white rounded">
                    <div class="row mb-4">
                        <div class="col-md-4 mt-4">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search theo mã cửa hàng" />
                                <span className="input-group-btn">
                                    <button className="btn btn-info" type="button">Clear</button>
                                </span>
                            </div>
                        </div>

                        <div class="col-md-4 mt-4">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search tên cửa hàng" />
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

                        <div class="col-md-2 mt-4">
                            <button
                                type="button" class="btn btn-success"
                                data-toggle="modal"
                                data-target="#addstoreModal" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop-window mr-1" viewBox="0 1 16 16">
                                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z" />
                                </svg>
                                Thêm cửa hàng
                            </button>
                        </div>

                        <div class="modal fade" id="addstoreModal" tabindex="-1" aria-labelledby="notificationModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="notificationModalLabel">Thêm cửa hàng</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <AddStore />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-success">
                        <SweetAlert
                            show={this.state.showAlert}
                            title="Xóa cửa hàng"
                            text={this.state.titleAlert}
                            showCancelButton
                            onOutsideClick={() => this.setState({ showAlert: false })}
                            onEscapeKey={() => this.setState({ showAlert: false })}
                            onCancel={() => this.setState({ showAlert: false })}
                            onConfirm={() => this.handleDeleteStore()}
                        />

                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{ width: '12%' }}>Mã</th>
                                    <th style={{ width: '23%' }}>Tên cửa hàng</th>
                                    <th style={{ width: '20%' }}>Tên rút gọn</th>
                                    <th style={{ width: '10%' }} class="text-center">Mở cửa</th>
                                    <th style={{ width: '10%' }} class="text-center">Đóng cửa</th>
                                    <th style={{ width: '10%' }} class="text-center">Trạng thái</th>
                                    <th style={{ width: '15%' }} class="text-center">Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderStore()}
                            </tbody>
                        </table>

                        <div class="row">
                            <div class="ml-auto mr-5">
                                <ReactPagenav {...this.state} onLinkClick={this.handleClick} createPageUrl={createPageUrl}></ReactPagenav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StoreList;