import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Notifications, Search, AccountCircleOutlined, HelpOutlineOutlined, Logout } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../RequestMethod";
import { toast } from 'react-toastify';
import useClickOutside from "../../contexts/useClickOutside";
import NotificationList from '../../components/Header/NotificationList';
import RejectModal from './RejectModal';
import ApproveModal from './ApproveModal';
import DetailModal from './DetailModal';
import * as Constant from '../../Constant';

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
    width: 350px;
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

const NotificationLink = styled(Link)`
    color: ${props => props.theme.blue};
    font-size: 14px;
    text-decoration: none;
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

const Header = () => {
    const { logout } = useAuth();
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('USER'));

    const [rejectModal, setRejectModal] = useState(false);
    function toggleRejectModal() { setRejectModal(!rejectModal); }
    const [approveModal, setApproveModal] = useState(false);
    function toggleApproveModal() { setApproveModal(!approveModal); }
    const [detailModal, setDetailModal] = useState(false);
    function toggleDetailModal() { setDetailModal(!detailModal); }

    const [rejectItem, setRejectItem] = useState({ id: '', name: '' });
    const [approveItem, setApproveItem] = useState({ id: '', name: '' });
    const [detailItem, setDetailItem] = useState({ id: '' });

    const [activeTab, setActiveTab] = useState(1);
    const [notificationDropdown, toggleNotificationDropdown] = useState(false);
    const [userDropdown, toggleUserDropdown] = useState(false);

    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);
    const [residents, setResidents] = useState([]);
    const [change, setChange] = useState(false);

    useEffect( () => {  //fetch api data
        if (user && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
            let url = "products" 
            + "?limit=10"
            + "&sort=+updateddate"
            + "&apartmentid=" + user.Residents[0].ApartmentId
            + "&status=" + Constant.UNVERIFIED_PRODUCT;
            const fetchData = () => {
                api.get(url)
                .then(function (res) {
                    setProducts(res.data.Data.List);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            fetchData();
        }
    }, [change]);

    let clickOutside = useClickOutside(() => {
        toggleUserDropdown(false);
        toggleNotificationDropdown(false);
    });

    async function handleLogout() {
        try {
            await logout();
            navigate("/");
        } catch {}
    }

    const handleGetApproveItem = (id, name) => {
        setApproveItem({ id: id, name: name });
        toggleApproveModal();
    }

    const handleApproveItem = (event) => {
        event.preventDefault();
        const notification = toast.loading("Đang xử lí yêu cầu...");

        const handleApprove = async () => {
            api.put("products/approval?id=" + rejectItem.id)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setChange(!change);
                    toggleApproveModal();
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

    const handleGetRejectItem = (id, name) => {
        setRejectItem({ id: id, name: name });
        toggleRejectModal();
    }

    const handleRejectItem = (event) => {
        event.preventDefault();
        const notification = toast.loading("Đang xử lí yêu cầu...");

        const handleReject = async () => {
            api.put("products/rejection?id=" + rejectItem.id)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setChange(!change);
                    toggleRejectModal();
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

    const handleGetDetailItem = (id) => {
        setDetailItem({ id: id });
        toggleDetailModal();
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
                    <StyledBadge badgeContent={products.length} overlap="circular">
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
                        activeTab === 1 && products.length ?
                        <>
                            <NotificationList 
                                currentItems={products}
                                handleGetDetailItem={handleGetDetailItem} 
                            />
                            <Name>
                                <NotificationLink to={"/products"}>Xem tất cả sản phẩm chờ duyệt</NotificationLink> 
                            </Name>
                        </>
                        : activeTab === 2 && stores.length ?
                        <>
                            <NotificationList 
                                currentItems={stores} 
                                handleGetDetailItem={handleGetDetailItem}
                            />
                            <Name>
                                <NotificationLink to={"/stores"}>Xem tất cả cửa hàng chờ duyệt</NotificationLink> 
                            </Name>
                        </>
                        : activeTab === 3 && residents.length ?
                        <>
                            <NotificationList 
                                currentItems={residents} 
                                handleGetDetailItem={handleGetDetailItem}
                            />
                            <Name>
                                <NotificationLink to={"/residents"}>Xem tất cả cư dân chờ duyệt</NotificationLink> 
                            </Name>
                        </>
                        : 
                        <NoNotificationWrapper>
                            <StyledNoNotificationIcon />
                        </NoNotificationWrapper>
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
                        <DropdownLink to={"/"}> <StyledPersonIcon /> Thông tin cá nhân </DropdownLink>
                        <DropdownLink to={"/"}> <StyledHelpIcon /> Trợ giúp </DropdownLink>
                        <DropdownItem onClick={handleLogout}> <StyledLogoutIcon /> Đăng xuất </DropdownItem>
                    </DropdownList>
                </UserDropdownWrapper>
                : null
            }

            <DetailModal 
                display={detailModal}
                toggle={toggleDetailModal}
                detailItem={detailItem}
                handleGetApproveItem={handleGetApproveItem}
                handleGetRejectItem={handleGetRejectItem}
            />
            
            <ApproveModal
                display={approveModal} 
                toggle={toggleApproveModal} 
                approveItem={approveItem} 
                handleApproveItem={handleApproveItem}
            />

            <RejectModal
                display={rejectModal} 
                toggle={toggleRejectModal} 
                rejectItem={rejectItem} 
                handleRejectItem={handleRejectItem}
            />
        </Wrapper>
    );
}

export default Header;