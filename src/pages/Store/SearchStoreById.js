﻿import React, { Component } from 'react';

class SearchStoreById extends Component {

    render() {
        return (
            <div class="col-md-4 mt-4">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search theo mã cửa hàng" />
                    <span className="input-group-btn">
                        <button className="btn btn-info" type="button">Clear</button>
                    </span>
                </div>
            </div>
        );
    }
}

export default SearchStoreById;