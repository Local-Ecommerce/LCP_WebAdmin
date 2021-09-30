import React, { Component } from 'react';
import Category from '../components/Category';
import Categories from '../mockdata/Categories';
import SweetAlert from 'sweetalert-react';

class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: Categories,
            showAlert: false,
            titleAlert: '',
            idALert: '',
        }
    };

    renderCategory = () => {
        if (this.state.categories.length === 0) {
            return <Category category={0} />
        }

        return this.state.categories.map((category) => {
            return (
                <Category
                    category={category}
                    handleShowAlert={this.handleShowAlert}
                />
            );
        });
    };

    handleDeleteCategory = () => {
        let { idAlert } = this.state;
        if (this.state.categories.length > 0) {
            for (let i = 0; i < this.state.categories.length; i++) {
                if (this.state.categories[i].id === idAlert) {
                    this.state.categories.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({
            showAlert: false
        });
    };

    handleShowAlert = (category) => {
        this.setState({
            showAlert: true,
            titleAlert: category.name,
            idAlert: category.id
        });
    };

    render() {
        return (
            <div class="container-fluid bg-white rounded">
                <div class="row mb-4">
                    <div class="col-md-4 mt-4">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search tên danh mục" />
                            <span className="input-group-btn">
                                <button className="btn btn-info" type="button">Clear</button>
                            </span>
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
                        onConfirm={() => this.handleDeleteCategory()}
                    />

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th style={{ width: '50%' }}>Tên danh mục</th>
                                <th style={{ width: '25%' }} class="text-center">Chiết khấu</th>
                                <th style={{ width: '25%' }} class="text-center">Chỉnh sửa</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderCategory()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default CategoryList;