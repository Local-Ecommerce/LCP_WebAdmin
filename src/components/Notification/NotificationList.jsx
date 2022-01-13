import React, { Component } from 'react';
import styled from "styled-components";
import NotificationItem from './NotificationItem';
import ShopNotifications from '../../mockdata/ShopNotifications';
import ProductNotifications from '../../mockdata/ProductNotifications';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Wrapper = styled.div`
    padding: 20px;
`;

class NotificationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shopNotifications: ShopNotifications,
            productNotifications: ProductNotifications,
        }
    };

    renderShopNotification = () => {
        return this.state.shopNotifications.map((item, index) => {
            return (
                <NotificationItem item={item} key={index} />
            )
        });
    };

    renderProductNotification = () => {
        return this.state.productNotifications.map((item, index) => {
            return (
                <NotificationItem item={item} key={index} />
            )
        });
    };

    render() {        
        return (
            <Wrapper>
            <Tabs>
                <TabList>
                    <Tab>Cửa Hàng</Tab>
                    <Tab>Sản Phẩm</Tab>
                </TabList>

                <TabPanel>
                    {this.renderShopNotification()}
                </TabPanel>
                <TabPanel>
                    {this.renderProductNotification()}
                </TabPanel>
                </Tabs>
            </Wrapper>
        )
    }
}

export default NotificationList;