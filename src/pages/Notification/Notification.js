import React, { Component } from 'react';

class Notification extends Component {

    render() {
        let { notification } = this.props;
        let newLabel = '';
        if (notification.status === 1) {
            newLabel = <span class="badge badge-danger">Mới</span>;
        }

		return (
            <a href="">
                <div class="media col-md-12 border-bottom m-1">
                    <img class="mr-3 avatar mt-2" src="./images/user.png" />
                    <div class="media-body">
                        <h5 class="mt-2">{newLabel} {notification.name}</h5>

                        <div class="row">
                            <p class="col-md-4 text-secondary small">{notification.shopName} - {notification.manager}</p>
                            <p class="col-md-8 text-secondary small">{notification.address}</p>
                        </div>
                    </div>
                </div>
            </a>
        )
    }
}

export default Notification;