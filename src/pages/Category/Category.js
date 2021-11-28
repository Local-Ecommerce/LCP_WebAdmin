import React, { Component } from 'react';

class Category extends Component {

    render() {
        let { category } = this.props;
        if (category === 0) {
            return (
                <tr>
                    <td colSpan="3" class="text-center">
                        <h4>Không tìm thấy danh mục.</h4>
                    </td>
                </tr>
            )
        }

        return (
            <tr>
                <td style={{ width: '50%' }}>{category.name}</td>
                <td style={{ width: '35%' }} class="text-center">{category.discount}%</td>

                <td class="text-center" style={{ width: '15%' }}>
                    <button type="button" class="btn bg-transparent btn-sm text-secondary">
                        <i class="fa fa-pen fa-lg"></i>
                    </button>

                    <button type="button" class="btn bg-transparent btn-sm text-secondary" onClick={() => this.props.handleShowAlert(category)}>
                        <i class="fa fa-trash-alt fa-lg"></i>
                    </button>
                </td>
            </tr>
        )
    }
}

export default Category;