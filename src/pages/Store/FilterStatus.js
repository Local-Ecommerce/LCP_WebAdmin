import React, { Component } from 'react';

class FilterStatus extends Component {

    render() {
        return (
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
        );
    }
}

export default FilterStatus;