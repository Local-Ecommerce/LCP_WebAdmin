import React, { Component } from 'react';

class Menu extends Component {

    render() {
        let { menu } = this.props;
        if (menu === 0) {
            return (
                <tr>
                    <td colSpan="7" class="text-center">
                        <h4>Không tìm thấy bảng giá.</h4>
                    </td>
                </tr>
            )
        }
        let classNameLabel = '';
        let nameLabel = '';
        switch (menu.status) {
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
                <td>{menu.name}</td>

                <td class="text-center">
                    <span class={classNameLabel}>{nameLabel}</span>
                </td>

                <td class="text-center">
                    <button type="button" class="btn bg-transparent btn-sm text-secondary">
                        <i class="fa fa-pen fa-lg"></i>
                    </button>

                    <button type="button" class="btn bg-transparent btn-sm text-secondary" onClick={() => this.props.handleShowAlert(menu)}>
                        <i class="fa fa-trash-alt fa-lg"></i>
                    </button>
                </td>
            </tr>
        )
    }
}

export default Menu;