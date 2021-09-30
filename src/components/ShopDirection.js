import React, { Component } from 'react';

class ShopDirection extends Component {

    render() {
        let { shop } = this.props;

        return (
            <div class="col-md-4">
                <div class="card mb-3">
                    <h5 class="card-header bg-white">
                        {shop.name}
                        <div class="col-md-3 float-right">
                            <button type="button" class="btn btn-info">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right mx-2 float-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                                </svg>
                            </button>
                        </div>
                    </h5>

                    <div class="card-body">
                        <p class="card-text mb-0">{shop.address}</p>
                        <p class="card-text">{shop.manager}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopDirection;