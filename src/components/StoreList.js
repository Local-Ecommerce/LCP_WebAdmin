import React, { Component } from 'react';
import Store from '../components/Store';
import Stores from '../mockdata/Stores';
import SweetAlert from 'sweetalert-react';

class StoreList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: Stores,
            showAlert: false,
            titleAlert: '',
            idALert: '',
        }
    };

    renderStore = () => {
        if (this.state.stores.length === 0) {
            return <Store store={0} />
        }

        return this.state.stores.map((store) => {
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
        return (
            <div class="container-fluid bg-white rounded">
                <div class="row mb-5">
                    <div class="col-md-5 mt-4">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search theo mã cửa hàng" />
                            <span className="input-group-btn">
                                <button className="btn btn-info" type="button">Clear</button>
                            </span>
                        </div>
                    </div>

                    <div class="col-md-5 mt-4">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search tên cửa hàng" />
                            <span className="input-group-btn">
                                <button className="btn btn-info" type="button">Clear</button>
                            </span>
                        </div>
                    </div>

                    <div class="mt-4 ml-5">
                        <div class="dropdown">
                            <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Trạng thái
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item">Active</a>
                                <a class="dropdown-item">Inactive</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel panel-success">
                    <SweetAlert
                        show={this.state.showAlert}
                        title="Xóa sản phẩm"
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
                                <th style={{ width: '10%' }}>Mã</th>
                                <th style={{ width: '25%' }}>Tên cửa hàng</th>
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
                </div>
            </div>
        )
    }
}

export default StoreList;