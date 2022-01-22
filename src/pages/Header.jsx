import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { Link, useHistory } from "react-router-dom";
import { Notifications } from '@mui/icons-material';
import { Tab, Badge } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { publicRequest } from "../RequestMethod";

import Avatar from '../components/Header/Avatar';
import NotificationList from '../components/Notification/NotificationList';

import ShopNotifications from '../mockdata/ShopNotifications';
import ProductNotifications from '../mockdata/ProductNotifications';

const Row = styled.div`
    display: flex;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid #dee2e6;
`;

const FloatRight = styled.div`
    float: right;
    margin-bottom: 15px;
`;

const StyledBadge = styled(Badge)`
    && {    
        color: #fff;

        & .MuiBadge-badge {
            background: #dc3545;
        }
    }
`;

const IconButton = styled.button`
    margin-right: 20px;
    padding: 5px;
    background-color: #f0f3f6;
    border: 1px solid #f0f3f6;
    border-radius: 50px;

    &:hover {
    background-color: #E0E0E0;
    }

    &:active {
    transform: translateY(2px);
    }
`;

const StyledNotificationIcon = styled(Notifications)`
    && {
        font-size: 30px;
        color: grey;
    }
`;

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
`;

const StyledTabList = styled(TabList)`
    && {
    border-bottom: 1px solid #cfd2d4;
    }
`;

const StyledTab = styled(Tab)`
    && {
    font-size: 17px;
    font-weight: 600;
    text-transform: none;
    }
`;

const StyledTabPanel = styled(TabPanel)`
    && {
    padding: 0px;
    height: 420px;
    overflow: scroll;
    overflow-x: hidden;
    }
`;

const StyledLink = styled(Link)`
    margin: 16px;
    display: flex;
    justify-content: center;
    text-decoration: none;
    color: #007bff;
`;

const ModalButton = styled.button`
    min-width: 80px;
    margin: 20px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.red ? "#dc3545" : "#fff"};
    color: ${props => props.red ? "#fff" : "#212529"};;
    border: 1px solid ${props => props.red ? "#dc3545" : "#fff"};
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;
    float: right;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(2px);
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: 'auto',
        marginRight: '-45%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const Header = () => {
    let history = useHistory();
    const [NotificationModal, toggleNotificationModal] = React.useState(false);
    const [activeTab, setActiveTab] = useState("1");

    const [storeData, setStoreData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [pendingCount, setPendingCount] = useState(0);

    const [change, setChange] = useState(false);

    useEffect(() => {  //fetch api data
        const url = "store/status/6006";

        const fetchData = async () => {
            try {
                const res = await fetch(publicRequest(url), { method: 'GET' });
                const json = await res.json();
                setStoreData(ShopNotifications.slice(0, 10));
                setProductData(ProductNotifications.slice(0, 10));
                setPendingCount(ShopNotifications.length + ProductNotifications.length);
            } catch (error) { }
        };
        fetchData();
    }, [change, NotificationModal]);

    const handleNavigate = (id, status) => {
        toggleNotificationModal(!NotificationModal);
        if (status === 6006 || status === 6007) {
            history.push('/editStore/' + id);
        }
        if (status === 1006 || status === 1007) {
            history.push('/editProduct/' + id);
        }
    }

    return (
        <Row>
            <Wrapper>
                <FloatRight>
                    <IconButton onClick={() => toggleNotificationModal(!NotificationModal)}>
                        <StyledBadge badgeContent={pendingCount} overlap="circular">
                            <StyledNotificationIcon />
                        </StyledBadge>
                    </IconButton>
                    
                    <Modal isOpen={NotificationModal} onRequestClose={() => toggleNotificationModal(!NotificationModal)} style={customStyles} ariaHideApp={false}>
                        <ModalContentWrapper>
                            <TabContext value={activeTab}>
                                <StyledTabList onChange={(event, newValue) => setActiveTab(newValue)} variant="fullWidth" >
                                    <StyledTab label={"Cửa hàng"} value="1" />
                                    <StyledTab label="Sản phẩm" value="2" />
                                </StyledTabList>

                                <StyledTabPanel value="1">
                                    <NotificationList currentItems={storeData} handleNavigate={handleNavigate} />
                                    <StyledLink to="/">Xem toàn bộ cửa hàng chờ duyệt</StyledLink>
                                </StyledTabPanel>
                                <StyledTabPanel value="2">
                                    <NotificationList currentItems={productData} handleNavigate={handleNavigate} />
                                    <StyledLink to="/">Xem toàn bộ sản phẩm chờ duyệt</StyledLink>
                                </StyledTabPanel>
                            </TabContext>
                        </ModalContentWrapper>

                        <ModalButton red onClick={() => toggleNotificationModal(!NotificationModal)}>Quay lại</ModalButton>
                    </Modal>

                    <Avatar />
                </FloatRight>
            </Wrapper>
        </Row>
    );
}

export default Header;