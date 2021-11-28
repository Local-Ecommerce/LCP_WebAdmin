import React, { Component } from 'react';
import Notification from '../Notification/Notification';
import ShopNotifications from '../../mockdata/ShopNotifications';
import ProductNotifications from '../../mockdata/ProductNotifications';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class NotificationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shopNotifications: ShopNotifications,
            productNotifications: ProductNotifications,
        }
    };

    renderShopNotification = () => {
        return this.state.shopNotifications.map((notification) => {
            return (
                <Notification notification={notification} />
            )
        });
    };

    renderProductNotification = () => {
        return this.state.productNotifications.map((notification) => {
            return (
                <Notification notification={notification} />
            )
        });
    };

    render() {
        let shopTitle = 'Cửa Hàng';
        
        return (
            <div>
                <Tabs defaultActiveKey="shop" className="mb-3">
                    <Tab eventKey="shop" title={shopTitle}>
                        {this.renderShopNotification()}
                    </Tab>
                    <Tab eventKey="product" title="Sản Phẩm">
                        {this.renderProductNotification()}
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default NotificationList;