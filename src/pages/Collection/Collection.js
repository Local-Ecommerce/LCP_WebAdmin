import React, { Component } from 'react';

class Collection extends Component {

    render() {
        let { collection } = this.props;
        if (collection === 0) {
            return (
                <tr>
                    <td colSpan="2" class="text-center">
                        <h4>Không tìm thấy bộ sưu tập.</h4>
                    </td>
                </tr>
            )
        }

        return (
            <tr>
                <td>{collection.name}</td>

                <td class="text-center">
                    <button type="button" class="btn bg-transparent btn-sm text-secondary">
                        <i class="fa fa-pen fa-lg"></i>
                    </button>

                    <button type="button" class="btn bg-transparent btn-sm text-secondary" onClick={() => this.props.handleShowAlert(collection)}>
                        <i class="fa fa-trash-alt fa-lg"></i>
                    </button>
                </td>
            </tr>
        )
    }
}

export default Collection;