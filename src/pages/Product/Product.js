import React, { Component } from 'react';
import EditProductForm from './EditProductForm';

class Product extends Component {

    render() {
        let { product } = this.props;
        if (product === 0) {
            return (
                <tr>
                    <td colSpan="7" class="text-center">
                        <h4>Không tìm thấy sản phẩm.</h4>
                    </td>
                </tr>
            )
        }
        let classNameLabel = '';
        let nameLabel = '';
        switch (product.status) {
            case 1:
                classNameLabel = 'btn btn-success btn-sm';
                nameLabel = 'Active';
                break;
            default:
                classNameLabel = 'btn btn-danger btn-sm';
                nameLabel = 'Inactive';
                break;
        }
        return (
            <tr>
                <td class="align-middle">{product.image}</td>
                <td class="align-middle">{product.name}</td>
                <td class="align-middle">{product.collection}</td>
                <td class="align-middle">{product.category}</td>
                <td class="align-middle">{product.price}</td>

                <td class="text-center align-middle">
                    <span class={classNameLabel}>{nameLabel}</span>
                </td>
                <td class="text-center align-middle">
                    <button type="button" class="btn bg-transparent btn-sm text-secondary" data-toggle="modal" data-target="#editProductModal">
                        <i class="fa fa-pen fa-lg"></i>
                    </button>
                    <EditProductForm />

                    <button type="button" class="btn bg-transparent btn-sm text-secondary" onClick={() => this.props.handleShowAlert(product)}>
                        <i class="fa fa-trash-alt fa-lg"></i>
                    </button>
                </td>
            </tr>
        )
    }
}

export default Product;