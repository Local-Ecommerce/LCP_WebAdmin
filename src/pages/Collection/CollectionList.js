import React, { Component } from 'react';
import Collection from '../Collection/Collection';
import Collections from '../../mockdata/Collections';
import SweetAlert from 'sweetalert-react';

class CollectionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: Collections,
            showAlert: false,
            titleAlert: '',
            idALert: '',
        }
    };

    renderCollection = () => {
        if (this.state.collections.length === 0) {
            return <Collection collection={0} />
        }

        return this.state.collections.map((collection) => {
            return (
                <Collection
                    collection={collection}
                    handleShowAlert={this.handleShowAlert}
                />
            )
        });
    };

    handleDeleteCollection = () => {
        let { idAlert } = this.state;
        if (this.state.collections.length > 0) {
            for (let i = 0; i < this.state.collections.length; i++) {
                if (this.state.collections[i].id === idAlert) {
                    this.state.collections.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({
            showAlert: false
        });
    };

    handleShowAlert = (collection) => {
        this.setState({
            showAlert: true,
            titleAlert: collection.name,
            idAlert: collection.id
        });
    };

    render() {
        return (
            <div>
                <h3 class="mb-3">Bộ sưu tập</h3>

                <div class="container-fluid bg-white rounded">
                    <div class="row mb-4">
                        <div class="col-md-4 mt-4">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search bộ sưu tập" />
                                <span className="input-group-btn">
                                    <button className="btn btn-info" type="button">Clear</button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-success">
                        <SweetAlert
                            show={this.state.showAlert}
                            title="Xóa bộ sưu tập"
                            text={this.state.titleAlert}
                            showCancelButton
                            onOutsideClick={() => this.setState({ showAlert: false })}
                            onEscapeKey={() => this.setState({ showAlert: false })}
                            onCancel={() => this.setState({ showAlert: false })}
                            onConfirm={() => this.handleDeleteCollection()}
                        />

                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{ width: '85%' }}>Tên bộ sưu tập</th>
                                    <th style={{ width: '15%' }} class="text-center">Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCollection()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default CollectionList;