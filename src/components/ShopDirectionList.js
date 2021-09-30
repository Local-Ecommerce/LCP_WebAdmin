import React, { Component } from 'react';
import ShopDirection from '../components/ShopDirection';
import Shops from '../mockdata/Shops';

class ShopDirectionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shops: Shops
        }
    };

    renderShopDirection = () => {
        return this.state.shops.map((shop) => {
            return (
                <ShopDirection shop={shop} />
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
                    {this.renderShopDirection()}
                </div>
            </div>
        )
    }
}

export default ShopDirectionList;