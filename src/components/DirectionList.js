import React, { Component } from 'react';
import Direction from '../components/Direction';
import Stores from '../mockdata/Stores';

class DirectionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: Stores
        }
    };

    renderDirection = () => {
        return this.state.stores.map((store) => {
            return (
                <Direction store={store} />
            )
        });
    };

    render() {
        return (
            <div>
                <div class="col-md-6 mb-4">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search tên cửa hàng" />
                        <span className="input-group-btn">
                            <button className="btn btn-info" type="button">Clear</button>
                        </span>
                    </div>
                </div>

                <div class="row">
                    {this.renderDirection()}
                </div>
            </div>
        )
    }
}

export default DirectionList;