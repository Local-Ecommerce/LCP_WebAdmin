import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Notifications, Search, AccountCircleOutlined, HelpOutlineOutlined, Logout } from '@mui/icons-material';
import { Badge, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from 'react-toastify';
import { api } from "../RequestMethod";
import useClickOutside from "../contexts/useClickOutside";
import * as Constant from '../Constant';
import RejectModal from '../components/Notification/RejectModal';
import ApproveModal from '../components/Notification/ApproveModal';

import DetailProductModal from '../components/Notification/ProductNotification/DetailProductModal';
import NotificationProductList from '../components/Notification/ProductNotification/NotificationProductList';

import DetailStoreModal from '../components/Notification/StoreNotification/DetailStoreModal';
import NotificationStoreList from '../components/Notification/StoreNotification/NotificationStoreList';

import DetailResidentModal from '../components/Notification/ResidentNotification/DetailResidentModal';
import NotificationResidentList from '../components/Notification/ResidentNotification/NotificationResidentList';

import { db } from "../firebase";
import { ref, push, onValue, query, limitToFirst, orderByChild, equalTo } from "firebase/database";

const Wrapper = styled.div`
    display: flex;
    background-color: #fff;
    padding: 10px 30px 10px 10px;
    box-shadow: 0 4px 3px -5px rgba(0, 0, 0, 0.75);
    justify-content: space-between;
    align-items: center;
`;

const Tab = styled.h1`
    color: ${props => props.active ? "#383838" : props.theme.grey};
    padding: 15px 0;
    margin: 0px;
    border-right: ${props => props.br ? "1px solid rgba(0,0,0,0.05)" : null};
    border-bottom: ${props => props.active ? "2px solid " + props.theme.blue : "2px solid rgba(0,0,0,0.05)"};
    font-size: 14px;
    width: 33%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NotificationSpan = styled.span`
    padding: 3px 5px;
    text-align: center;
    border-radius: 25px;
    color: ${props => props.theme.white};
    background-color: ${props =>  props.theme.red};
    margin: 0px 0px 0px 3px;
    font-size: 10px;
    font-weight: 400;
`;

const NoNotificationWrapper = styled.div`
    height: auto;
    margin: 0 auto;
    text-align: center;
`;

const StyledNoNotificationIcon = styled(Notifications)`
    && {
        margin: 40px;
        font-size: 77px;
        color: #D8D8D8;
    }
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.start ? "flex-start" : "space-between"};
    margin-left: ${props => props.ml ? "10px" : "0px"};
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: ${props => props.mb ? "20px" : "0px"};
`;

const Logo = styled.img`
    width: 80px;
    height: 40px;
`;

const SearchField = styled.div`
    display: flex;
    width: 31%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #E0E0E0;
    border-style: solid;
    border-width: thin;
    height: 35px;
    padding: 0px 3px 0px 8px;
    background-color: #f6f6f7;
`;

const Input = styled.input`
    padding: 4px;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;
    margin-right: 8px;

    &:focus {
    outline: 0;
    }
`;

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const Avatar = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
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
    background-color: #fff;
    border: 1px solid #fff;
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
        font-size: 24px;
        color: grey;
    }
`;

const NotificationDropdownWrapper = styled.div`
    position: absolute;
    top: 75px;
    right: 50px;
    margin: 0px 20px;
    background: ${props => props.theme.white};
    width: 400px;
    box-sizing: 0 5px 25px rgba(0,0,0,0.1);
    border-radius: 15px;
    border: 1px solid rgba(0,0,0,0.1);
    transition: 0.5s;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

    &:before {
        content: '';
        position: absolute;
        top: -10px;
        right: 28px;
        width: 18px;
        height: 18px;
        background: ${props => props.theme.white};
        transform: rotate(45deg);
    }
`;

const NotificationWrapper = styled.div`
    max-height: 60vh;
    overflow: auto;
    overflow-x: hidden;
`;

const NotificationLinkWrapper = styled.div`
    width: 100%;
    text-align: center;
    padding: 15px 0px;
    border-top: 1px solid rgba(0,0,0,0.1);
`;

const NotificationLink = styled(Link)`
    color: ${props => props.theme.blue};
    font-size: 14px;
    text-decoration: none;
    font-weight: 500;
    line-height: 1.2em;
`;

const UserDropdownWrapper = styled.div`
    position: absolute;
    top: 75px;
    right: -10px;
    margin: 0px 20px;
    background: ${props => props.theme.white};
    width: 250px;
    box-sizing: 0 5px 25px rgba(0,0,0,0.1);
    border-radius: 15px;
    border: 1px solid rgba(0,0,0,0.1);
    transition: 0.5s;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

    &:before {
        content: '';
        position: absolute;
        top: -5px;
        right: 28px;
        width: 20px;
        height: 20px;
        background: ${props => props.theme.white};
        transform: rotate(45deg);
    }
`;

const Name = styled.h3`
    width: 100%;
    text-align: center;
    font-size: 18px;
    margin: 15px 0px;
    font-weight: 500;
    line-height: 1.2em;
`;

const Title = styled.span`
    font-size: 15px;
    color: ${props => props.theme.dark};
    font-weight: 400;
`;

const DropdownList = styled.ul`
    padding: 0px;
    margin: 10px 0px;
    cursor: pointer;
`;

const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${props => props.theme.dark};
    height: 50px;
    border-top: 1px solid rgba(0,0,0,0.05);
    padding: 0px 20px;

    &:hover {
        color: ${props => props.theme.blue};
        background-color: ${props => props.theme.hover};
    }
`;

const DropdownLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${props => props.theme.dark};
    height: 50px;
    border-top: 1px solid rgba(0,0,0,0.05);
    padding: 0px 20px;

    &:hover {
        color: ${props => props.theme.blue};
        background-color: ${props => props.theme.hover};
    }
`;

const StyledPersonIcon = styled(AccountCircleOutlined)`
    && {
        margin-right: 8px;
        opacity: 0.5;

        &:hover {
            opacity: 1.0;
        }
    }
`;

const StyledHelpIcon = styled(HelpOutlineOutlined)`
    && {
        margin-right: 8px;
        opacity: 0.5;
    }
`;

const StyledLogoutIcon = styled(Logout)`
    && {
        margin-right: 8px;
        opacity: 0.5;
    }
`;

const LoadingWrapper = styled.div`
    height: auto;
    margin: 0 auto;
    text-align: center;
`;

const StyledLoadingIcon = styled(CircularProgress)`
    && {
        margin: 50px;
    }
`;

const Header = ({ refresh, toggleRefresh }) => {
    const { logout } = useAuth();
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('USER'));

    const [rejectProductModal, setRejectProductModal] = useState(false);    function toggleRejectProductModal() { setRejectProductModal(!rejectProductModal); }
    const [approveProductModal, setApproveProductModal] = useState(false);  function toggleApproveProductModal() { setApproveProductModal(!approveProductModal); }
    const [detailProductModal, setDetailProductModal] = useState(false);    function toggleDetailProductModal() { setDetailProductModal(!detailProductModal); }
    
    const [rejectStoreModal, setRejectStoreModal] = useState(false);        function toggleRejectStoreModal() { setRejectStoreModal(!rejectStoreModal); }
    const [approveStoreModal, setApproveStoreModal] = useState(false);      function toggleApproveStoreModal() { setApproveStoreModal(!approveStoreModal); }
    const [detailStoreModal, setDetailStoreModal] = useState(false);        function toggleDetailStoreModal() { setDetailStoreModal(!detailStoreModal); }

    const [rejectResidentModal, setRejectResidentModal] = useState(false);        function toggleRejectResidentModal() { setRejectResidentModal(!rejectResidentModal); }
    const [approveResidentModal, setApproveResidentModal] = useState(false);      function toggleApproveResidentModal() { setApproveResidentModal(!approveResidentModal); }
    const [detailResidentModal, setDetailResidentModal] = useState(false);        function toggleDetailResidentModal() { setDetailResidentModal(!detailResidentModal); }

    const [rejectItem, setRejectItem] = useState({id : '', name: '', image: '', residentId: ''});
    const [approveItem, setApproveItem] = useState({id : '', name: '', image: '', residentId: ''});
    const [productItem, setProductItem] = useState({ id: '' });
    const [storeItem, setStoreItem] = useState({});
    const [residentItem, setResidentItem] = useState({});
    

    const [activeTab, setActiveTab] = useState(1);
    const [notificationDropdown, toggleNotificationDropdown] = useState(false);
    const [userDropdown, toggleUserDropdown] = useState(false);

    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect( () => {  //fetch api data
        if (user && user.RoleId === "R001" && user.Residents[0].Type === Constant.MARKET_MANAGER) {
            setLoading(true);
            const dataRef = query(ref(db, 'Notification/' + user.Residents[0].ApartmentId), limitToFirst(100), orderByChild('receiverId'), equalTo(user.Residents[0].ApartmentId));
            return onValue(dataRef, (snapshot) => {
                let url = "products" 
                + "?limit=100"
                + "&sort=+updateddate"
                + "&status=" + Constant.UNVERIFIED_PRODUCT
                + "&apartmentid=" + user.Residents[0].ApartmentId;
                const fetchData = () => {
                    api.get(url)
                    .then(function (res) {
                        console.log(res.data.Data.List)
                        setProducts(res.data.Data.List);

                        let url2 = "stores/unverified-stores";
                        api.get(url2)
                        .then(function (res2) {
                            setStores(res2.data.Data);

                            setResidents([
                                {
                                    ResidentId: '1',
                                    ResidentName: 'Lê Văn Tám', 
                                    PhoneNumber: '0901234567', 
                                    DeliveryAddress: 'Tầng 2A',
                                    Gender: 'Nam',
                                    DateOfBirth: '01/01/1995',
                                    Status: 14004
                                }
                            ])
                            setLoading(false);
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                        setLoading(false);
                    });
                }
                fetchData();
            })
        }
    }, [refresh]);

    let clickOutside = useClickOutside(() => {
        if (notificationDropdown && !(detailProductModal || detailStoreModal)) {
            toggleNotificationDropdown(false);
        }
        if (userDropdown) {
            toggleUserDropdown(false);
        }
    });

    async function handleLogout() {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetApproveProductItem = (id, name, image, residentId) => {
        setApproveItem({ id : id, name: name, image: image, residentId: residentId });
        toggleApproveProductModal();
    }

    const handleGetRejectProductItem = (id, name, image, residentId) => {
        setRejectItem({ id : id, name: name, image: image, residentId: residentId });
        toggleRejectProductModal();
    }

    const handleGetDetailProductItem = (id) => {
        setProductItem({ id: id });
        toggleDetailProductModal();
    }

    const handleGetApproveStoreItem = (id, name, image, residentId) => {
        setApproveItem({ id : id, name: name, image: image, residentId: residentId });
        toggleApproveStoreModal();
    }

    const handleGetRejectStoreItem = (id, name, image, residentId) => {
        setRejectItem({ id : id, name: name, image: image, residentId: residentId });
        toggleRejectStoreModal();
    }

    const handleGetDetailStoreItem = (item) => {
        setStoreItem(item);
        toggleDetailStoreModal();
    }

    const handleGetApproveResidentItem = (id, name, image, residentId) => {
        setApproveItem({ id : id, name: name, image: image, residentId: residentId });
        toggleApproveResidentModal();
    }

    const handleGetRejectResidentItem = (id, name, image, residentId) => {
        setRejectItem({ id : id, name: name, image: image, residentId: residentId });
        toggleRejectResidentModal();
    }

    const handleGetDetailResidentItem = (item) => {
        setResidentItem(item);
        toggleDetailResidentModal();
    }

    const handleApproveProductItem = (event) => {
        event.preventDefault();
        const handleApprove = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            api.put("products/approval?id=" + approveItem.id)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toggleRefresh();
                    setApproveProductModal(false);
                    setDetailProductModal(false);

                    push(ref(db, `Notification/` + approveItem.residentId), {
                        createdDate: Date.now(),
                        data: {
                            image: approveItem.image ? approveItem.image : '',
                            name: approveItem.name,
                            id: approveItem.id
                        },
                        read: 0,
                        receiverId: approveItem.residentId,
                        senderId: user.Residents[0].ResidentId,
                        type: '001'
                    });

                    toast.update(notification, { render: "Duyệt sản phẩm thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        handleApprove();
    }

    const handleRejectProductItem = (event, reason) => {
        event.preventDefault();
        const notification = toast.loading("Đang xử lí yêu cầu...");

        const handleReject = async () => {
            api.put("products/rejection?id=" + rejectItem.id)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toggleRefresh();
                    setRejectProductModal(false);
                    setDetailProductModal(false);

                    push(ref(db, `Notification/` + rejectItem.residentId), {
                        createdDate: Date.now(),
                        data: {
                            image: rejectItem.image ? rejectItem.image : '',
                            name: rejectItem.name,
                            id: rejectItem.id,
                            reason: reason ? reason : ''
                        },
                        read: 0,
                        receiverId: rejectItem.residentId,
                        senderId: user.Residents[0].ResidentId,
                        type: '002'
                    });

                    toast.update(notification, { render: "Từ chối sản phẩm thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        handleReject();
    }

    const handleApproveStoreItem = (event) => {
        event.preventDefault();
        const handleApprove = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            api.put("stores/approval?id=" + approveItem.id)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toggleRefresh();
                    setApproveStoreModal(false);
                    setDetailStoreModal(false);

                    push(ref(db, `Notification/` + approveItem.residentId), {
                        createdDate: Date.now(),
                        data: {
                            image: approveItem.image ? approveItem.image : '',
                            name: approveItem.name,
                            id: approveItem.id
                        },
                        read: 0,
                        receiverId: approveItem.residentId,
                        senderId: user.Residents[0].ResidentId,
                        type: '101'
                    });

                    toast.update(notification, { render: "Duyệt cửa hàng thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        handleApprove();
    }

    const handleRejectStoreItem = (event, reason) => {
        event.preventDefault();
        const notification = toast.loading("Đang xử lí yêu cầu...");

        const handleReject = async () => {
            api.put("stores/rejection?id=" + rejectItem.id)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toggleRefresh();
                    setRejectStoreModal(false);
                    setDetailStoreModal(false);

                    push(ref(db, `Notification/` + rejectItem.residentId), {
                        createdDate: Date.now(),
                        data: {
                            image: rejectItem.image ? rejectItem.image : '',
                            name: rejectItem.name,
                            id: rejectItem.id,
                            reason: reason ? reason : ''
                        },
                        read: 0,
                        receiverId: rejectItem.residentId,
                        senderId: user.Residents[0].ResidentId,
                        type: '102'
                    });
                    
                    toast.update(notification, { render: "Từ chối cửa hàng thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        handleReject();
    }

    const handleApproveResidentItem = (event) => {
        event.preventDefault();
        const handleApprove = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            api.put("stores/approval?id=" + approveItem.id)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toggleRefresh();
                    setApproveStoreModal(false);
                    setDetailStoreModal(false);

                    push(ref(db, `Notification/` + approveItem.residentId), {
                        createdDate: Date.now(),
                        data: {
                            image: approveItem.image ? approveItem.image : '',
                            name: approveItem.name,
                            id: approveItem.id
                        },
                        read: 0,
                        receiverId: approveItem.residentId,
                        senderId: user.Residents[0].ResidentId,
                        type: '101'
                    });

                    toast.update(notification, { render: "Duyệt cửa hàng thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        handleApprove();
    }

    const handleRejectResidentItem = (event, reason) => {
        event.preventDefault();
        const notification = toast.loading("Đang xử lí yêu cầu...");

        const handleReject = async () => {
            api.put("stores/rejection?id=" + rejectItem.id)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toggleRefresh();
                    setRejectStoreModal(false);
                    setDetailStoreModal(false);

                    push(ref(db, `Notification/` + rejectItem.residentId), {
                        createdDate: Date.now(),
                        data: {
                            image: rejectItem.image ? rejectItem.image : '',
                            name: rejectItem.name,
                            id: rejectItem.id,
                            reason: reason ? reason : ''
                        },
                        read: 0,
                        receiverId: rejectItem.residentId,
                        senderId: user.Residents[0].ResidentId,
                        type: '102'
                    });
                    
                    toast.update(notification, { render: "Từ chối cửa hàng thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        handleReject();
    }

    return (
        <Wrapper>
            <Link to={"/"}>
                <Logo src='./images/lcp2.png' alt="Loich Logo" />
            </Link>

            <SearchField>
                <StyledSearchIcon />
                <Input placeholder="Tìm kiếm" />
            </SearchField>

            <div>
                <IconButton onClick={() => toggleNotificationDropdown(!notificationDropdown)}>
                    <StyledBadge badgeContent={products.length + stores.length + residents.length} overlap="circular">
                        <StyledNotificationIcon />
                    </StyledBadge>
                </IconButton>
            
                <Avatar onClick={() => toggleUserDropdown(!userDropdown)} src="./images/user.png" alt="Loich Logo" />
            </div>

            {
                notificationDropdown ?
                <NotificationDropdownWrapper ref={clickOutside}>
                    <Row>
                        <Tab br active={activeTab === 1 ? true : false} onClick={() => setActiveTab(1)}>
                            Sản phẩm 
                            {
                                products.length > 0 ?
                                <NotificationSpan> {products.length} </NotificationSpan>
                                : null
                            }
                        </Tab>

                        <Tab br active={activeTab === 2 ? true : false} onClick={() => setActiveTab(2)}>
                            Cửa hàng
                            {
                                stores.length > 0 ?
                                <NotificationSpan> {stores.length} </NotificationSpan>
                                : null
                            }
                        </Tab>

                        <Tab active={activeTab === 3 ? true : false} onClick={() => setActiveTab(3)}>
                            Tài khoản 
                            {
                                residents.length > 0 ?
                                <NotificationSpan> {residents.length} </NotificationSpan>
                                : null
                            }
                        </Tab>
                    </Row>

                    {
                        loading ?
                        <LoadingWrapper>
                            <StyledLoadingIcon /> 
                        </LoadingWrapper>
                        :
                        <>
                            {
                                activeTab === 1 && products.length ?
                                <>
                                    <NotificationWrapper>
                                        <NotificationProductList 
                                            currentItems={products} 
                                            handleGetDetailItem={handleGetDetailProductItem}
                                        />
                                    </NotificationWrapper>

                                    <NotificationLinkWrapper>
                                        <NotificationLink to={"/products"}>Xem tất cả sản phẩm chờ duyệt</NotificationLink> 
                                    </NotificationLinkWrapper>
                                </>
                                : activeTab === 2 && stores.length ?
                                <>
                                    <NotificationWrapper>
                                        <NotificationStoreList 
                                            currentItems={stores} 
                                            handleGetDetailItem={handleGetDetailStoreItem}
                                        />
                                    </NotificationWrapper>

                                    <NotificationLinkWrapper>
                                        <NotificationLink to={"/stores"}>Xem tất cả cửa hàng chờ duyệt</NotificationLink> 
                                    </NotificationLinkWrapper>
                                </>
                                : activeTab === 3 && residents.length ?
                                <>
                                    <NotificationWrapper>
                                        <NotificationResidentList 
                                            currentItems={residents} 
                                            handleGetDetailItem={handleGetDetailResidentItem}
                                        />
                                    </NotificationWrapper>

                                    <NotificationLinkWrapper>
                                        <NotificationLink to={"/residents"}>Xem tất cả cư dân chờ duyệt</NotificationLink> 
                                    </NotificationLinkWrapper>
                                </>
                                : 
                                <NoNotificationWrapper>
                                    <StyledNoNotificationIcon />
                                </NoNotificationWrapper>
                            }
                        </> 
                    }
                </NotificationDropdownWrapper>
                : null
            }

            {
                userDropdown ?
                <UserDropdownWrapper ref={clickOutside}>
                    <Name>
                        {!user ? null : user.RoleId === "R002" ? "Admin" : user.Residents[0].ResidentName} <br/> 
                        <Title>{!user ? null : user.RoleId === "R002" ? "Quản lý hệ thống" : "Quản lý chung cư"}</Title> 
                    </Name>
                    
                    <DropdownList>
                        {
                            user && user.RoleId === "R002" ?
                            null :
                            <DropdownLink to={"/userProfile"}> <StyledPersonIcon /> Thông tin cá nhân </DropdownLink>
                        }
                        <DropdownLink to={"/"}> <StyledHelpIcon /> Trợ giúp </DropdownLink>
                        <DropdownItem onClick={handleLogout}> <StyledLogoutIcon /> Đăng xuất </DropdownItem>
                    </DropdownList>
                </UserDropdownWrapper>
                : null
            }

            <DetailProductModal 
                display={detailProductModal}
                toggle={toggleDetailProductModal}
                detailItem={productItem}
                handleGetApproveItem={handleGetApproveProductItem}
                handleGetRejectItem={handleGetRejectProductItem}
            />

            <DetailStoreModal 
                display={detailStoreModal}
                toggle={toggleDetailStoreModal}
                detailItem={storeItem}
                handleGetApproveItem={handleGetApproveStoreItem}
                handleGetRejectItem={handleGetRejectStoreItem}
            />

            <DetailResidentModal 
                display={detailResidentModal}
                toggle={toggleDetailResidentModal}
                detailItem={residentItem}
                handleGetApproveItem={handleGetApproveResidentItem}
                handleGetRejectItem={handleGetRejectResidentItem}
            />
            
            <ApproveModal
                display={approveProductModal} 
                toggle={toggleApproveProductModal} 
                approveItem={approveItem} 
                handleApproveItem={handleApproveProductItem}
            />

            <RejectModal
                display={rejectProductModal} 
                toggle={toggleRejectProductModal} 
                rejectItem={rejectItem} 
                handleRejectItem={handleRejectProductItem}
            />

            <ApproveModal
                display={approveStoreModal} 
                toggle={toggleApproveStoreModal} 
                approveItem={approveItem} 
                handleApproveItem={handleApproveStoreItem}
            />

            <RejectModal
                display={rejectStoreModal} 
                toggle={toggleRejectStoreModal} 
                rejectItem={rejectItem} 
                handleRejectItem={handleRejectStoreItem}
            />

            <ApproveModal
                display={approveResidentModal} 
                toggle={toggleApproveResidentModal} 
                approveItem={approveItem} 
                handleApproveItem={handleApproveResidentItem}
            />

            <RejectModal
                display={rejectResidentModal} 
                toggle={toggleRejectResidentModal} 
                rejectItem={rejectItem} 
                handleRejectItem={handleRejectResidentItem}
            />
        </Wrapper>
    );
}

export default Header;