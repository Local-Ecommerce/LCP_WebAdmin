import React, { Component } from 'react';
import Store from './Store';
import SearchStoreById from './SearchStoreById';
import SearchStoreByName from './SearchStoreByName';
import FilterStatus from './FilterStatus';
import AddStoreButton from './AddStoreButton';
import AddStoreForm from './AddStoreForm';
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
                        <SearchStoreById />
                        <SearchStoreByName />
                        <FilterStatus />
                        <AddStoreButton />
                        <AddStoreForm />
                    </div>

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
                </div>
            </div>
        )
    }
}

export default StoreList;