/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import * as Constant from '../Constant';
import ReactPaginate from "react-paginate";
import useClickOutside from "../contexts/useClickOutside";
import { ShoppingCart, ArrowDropDown, RemoveShoppingCart, Feedback, ShoppingCartCheckout,
         FormatListBulleted, Store, Inventory } from '@mui/icons-material';

import NewsList from '../components/Home/NewsList';
import DetailModal from '../components/News/DetailModal';
import ToggleStatusModal from '../components/News/ToggleStatusModal';
import HomeNotificationList from '../components/Home/HomeNotificationList';
import ResidentDetailModal from '../components/Home/ResidentDetailModal';
import ProductDetailModal from '../components/Home/ProductDetailModal';
import StoreDetailModal from '../components/Store/DetailModal';
import WarnStoreModal from '../components/Home/WarnStoreModal';
import PictureModal from '../components/Home/PictureModal';
import NotificationDetailModal from '../components/Home/NotificationDetailModal';

const PageWrapper = styled.form`
    min-width: 1000px;
    max-width: 1200px;
    margin: 30px auto;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px 10px ${props => props.mb ? "15px" : "-5px"} 15px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: ${props => props.mb ? "20px" : "0px"};
`;

const Label = styled.div`
    margin-right: 10px;
    font-size: 13px;
`;

const SelectWrapper = styled.div`
    width: 180px;
    display: inline-block;
    background-color: ${props => props.theme.white};
    border-radius: 5px;
    border: 1px solid ${props => props.theme.greyBorder};
    transition: all .5s ease;
    position: relative;
    font-size: 14px;
    color: ${props => props.theme.black};
    text-align: left;

    &:hover {
        box-shadow: 0 0 4px rgb(204, 204, 204);
        border-radius: 2px 2px 0 0;
    }

    &:active {
        box-shadow: 0 0 4px rgb(204, 204, 204);
        border-radius: 2px 2px 0 0;
    }
`;

const Select = styled.div`
    cursor: pointer;
    display: flex;
    padding: 8px 10px 8px 15px;
    justify-content: space-between;
    align-items: center;
`;

const DropdownMenu = styled.ul`
    position: absolute;
    background-color: #fff;
    width: 100%;
    left: 0;
    margin-top: 1px;
    box-shadow: 0 1px 2px rgb(204, 204, 204);
    border-radius: 0 1px 2px 2px;
    overflow: hidden;
    display: ${props => props.dropdown === true ? "" : "none"};
    max-height: 500px;
    overflow-y: auto;
    z-index: 9;
    padding: 0;
    list-style: none;
`;

const DropdownList = styled.li`
    padding: 10px;
    transition: all .2s ease-in-out;
    cursor: pointer;
    border-bottom: 1px solid rgba(0,0,0,0.05);

    &:hover {
        background-color: ${props => props.theme.hover};
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    //grid-template-rows: 50px 50px;
    grid-gap: 20px;
`;

const GridItem = styled.div`
    border-radius: 5px;
    background-color: ${props => props.theme.white};
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: ${props => props.p1 ? "15px" : props.p0 ? "0px" : "25px"};
    
    grid-area: ${props => props.area ? props.area : null};
`;

const GridLabel = styled.div`
    color: ${props => props.theme.grey};
    font-size: 15px;
    margin-bottom: 10px;
    font-weight: 600;
`;

const Align = styled.div`
    display: flex;
    align-items: center;
`;

const GridParam = styled.div`
    color: ${props => props.theme.black};
    font-size: 24px;
    font-weight: 600;
`;

const GridParamSmall = styled.div`
    color: rgba(0,0,0,0.3);
    font-size: 18px;
    font-weight: 600;
    margin-left: 5px;
    padding-top: 5px;
`;

const GridParamExSmall = styled(GridParamSmall)`
    font-size: 14px;
    padding-top: 8px;
`;

const StyledCartIcon = styled(ShoppingCart)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: ${props => props.theme.blue};
        margin-right: 15px;
    }
`;

const StyledCartCheckoutIcon = styled(ShoppingCartCheckout)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: #28a745;
        margin-right: 15px;
    }
`;

const StyledNoCartIcon = styled(RemoveShoppingCart)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: #dc3545;
        margin-right: 15px;
    }
`;

const StyledFeedbackIcon = styled(Feedback)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: ${props => props.theme.red};
        margin-right: 15px;
    }
`;

const StyledProductIcon = styled(Inventory)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: ${props => props.theme.blue};
        margin-right: 15px;
    }
`;

const StyledMenuIcon = styled(FormatListBulleted)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: ${props => props.theme.blue};
        margin-right: 15px;
    }
`;

const StyledStoreIcon = styled(Store)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: ${props => props.theme.blue};
        margin-right: 15px;
    }
`;

const Tab = styled.h1`
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px 5px 0px 0px;
    background-color: rgba(0,0,0,0.1);
    padding: 15px 0;
    margin: 0px;
    border-bottom: ${props => props.active ? "2px solid " + props.theme.blue : "2px solid rgba(0,0,0,0.05)"};
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Table = styled.table`
    table-layout: fixed;
    border-spacing: 0px;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    overflow: hidden;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0.1);
`;

const TableHead = styled.thead`
    display: table-header-group;
    vertical-align: bottom;
`;

const TableHeader = styled.th`
    width: ${props => props.width};
    text-align: ${props => props.center ? "center" : "left"};
    padding: 16px 8px;
    font-size: 15px;
    color: ${props => props.grey ? props.theme.grey : null};
    background-color: rgba(0,0,0,0.1);
    border-bottom: 1px solid #dee2e6;
`;

const TableBody = styled.tbody`
    border-top: 1px solid #dee2e6;
`;

const TableRow = styled.tr``;

const StyledPaginateContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    .pagination {
    padding: 0px;
    margin: 0px;
    color: #0366d6;
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
    }

    .break-me {
    cursor: default;
    }

    .active {
    border-color: transparent;
    background-color: #0366d6;
    color: white;
    }

    .page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #dee2e6;
    }

    .page-link:hover {
    color: #0056b3;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
    }

    .page-link:focus {
    z-index: 2;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    .page-link:not(:disabled):not(.disabled) {
    cursor: pointer;
    }

    .page-item:first-child .page-link {
    margin-left: 0;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    }

    .page-item:last-child .page-link {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    }

    .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    }

    .page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    cursor: auto;
    background-color: #fff;
    border-color: #dee2e6;
    }
`;

const SpaceBetween = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

const Footer = styled.div`
    padding: 20px;
`;

const Home = () => {
    const user = JSON.parse(localStorage.getItem('USER'));
    const [day, setDay] = useState(7);
    const [change, setChange] = useState(false);
    const [feedbackChange, setFeedbackChange] = useState(false);

    const [dropdown, setDropdown] = useState(false);
    const toggleDropdown = () => { setDropdown(!dropdown); }
    const [detailModal, setDetailModal] = useState(false);
    function toggleDetailModal() { setDetailModal(!detailModal); }
    const [toggleStatusModal, setToggleStatusModal] = useState(false);
    const toggleToggleStatusModal = () => { setToggleStatusModal(!toggleStatusModal) };

    const [detailItem, setDetailItem] = useState({ id: '', type: Constant.NEWS_TYPE_01, title: '', priority: false, text: '', currentImages: [], images: [], residentId: '', apartmentId: '', status: '' });
    const [toggleStatusItem, setToggleStatusItem] = useState({ id: '', name: '', status: true });
    const [error, setError] = useState({ titleError: '', apartmentError: '', editError: '' });

    const [productItem, setProductItem] = useState({});
    const [productModal, setProductModal] = useState(false);
    const toggleProductModal = () => { setProductModal(!productModal); }

    const [residentItem, setResidentItem] = useState({});
    const [residentModal, setResidentModal] = useState(false);
    const toggleResidentModal = () => { setResidentModal(!residentModal); }

    const [storeItem, setStoreItem] = useState({});
    const [storeModal, setStoreModal] = useState(false);
    const toggleStoreModal = () => { setStoreModal(!storeModal); }

    const [warnStoreItem, setWarnStoreItem] = useState({});
    const [warnStoreModal, setWarnStoreModal] = useState(false);
    const toggleWarnStoreModal = () => { setWarnStoreModal(!warnStoreModal); }

    const [notificationItem, setNotificationItem] = useState({});
    const [notificationModal, setNotificationModal] = useState(false);
    function toggleNotificationModal() { setNotificationModal(!notificationModal); }

    const [picItem, setPicItem] = useState({});
    const [pictureModal, setPictureModal] = useState(false);
    function togglePictureModal() { setPictureModal(!pictureModal); }

    const [dashboardData, setDashboardData] = useState({});
    const [news, setNews] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);

    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);

    useEffect( () => {
        const fetchData = () => {
            api.get("dashboard?days=" + day)
            .then(function (res) {
                console.log(res.data)
                setDashboardData(res.data.Data);

                let url2 = "news"
                    + "?limit=5"
                    + "&sort=-priority" 
                    + "&sort=-releasedate"
                    + "&status=" + Constant.ACTIVE_NEWS;
                if (user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
                    url2 = url2 + "&apartmentid=" + user.Residents[0].ApartmentId;
                } else if (user.RoleId === "R002") {
                    url2 = url2 + "&apartmentid=admin";
                }
                api.get(url2)
                .then(function (res2) {
                    setNews(res2.data.Data.List);
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    }, [change, day]);

    useEffect( () => {
        const fetchData = () => {
            let url = "feedbacks"
                + "?limit=9" 
                + "&page=" + (page + 1) 
                + "&sort=-feedbackdate";
            api.get(url)
            .then(function (res) {
                console.log(res.data.Data);
                setFeedbacks(res.data.Data.List);
                setLastPage(res.data.Data.LastPage);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    }, [page, feedbackChange]);

    let clickOutside = useClickOutside(() => {
        setDropdown(false);
    });

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    const handleSetDay = (e, day) => {
        e.stopPropagation();
        setDay(day);
        setDropdown(false);
    }

    const handleGetDetailItem = (id) => {
        setDetailItem({ id: id, type: Constant.NEWS_TYPE_01, title: '', priority: false, text: '', currentImages: [], images: [], residentId: '', apartmentId: '', status: '' });
        toggleDetailModal();
    }

    const handleEditItem = (event) => {
        event.preventDefault();
        if (validCheck()) {
            let imageDifference = [];
            imageDifference = detailItem.currentImages.filter(o1 => !detailItem.images.some(o2 => o1.image === o2.image))
            .concat(detailItem.images.filter(o1 => !detailItem.currentImages.some(o2 => o1.image === o2.image)))
            .filter(item => item.image !== '').map(item => item.image.includes(',') ? item.image.split(',')[1] : item.image);

            const editData = async () => {
                const notification = toast.loading("Đang xử lí yêu cầu...");
                const url = "news?id=" + detailItem.id;
                api.put(url, {
                    title: detailItem.title,
                    text: detailItem.text,
                    priority: detailItem.priority,
                    type: detailItem.type,
                    image: imageDifference,
                    status: detailItem.status,
                    residentId: detailItem.residentId || null,
                    apartmentId: detailItem.apartmentId || null
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        toast.update(notification, { render: "Cập nhật thành công!", type: "success", autoClose: 5000, isLoading: false });
                        setChange(!change);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
                });
            }
            editData();
            toggleDetailModal();
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, editError: '' }));

        if (detailItem.title.trim() === null || detailItem.title.trim() === '') {
            setError(error => ({ ...error, editError: 'Vui lòng nhập tiêu đề' }));
            check = true;
        }
        if (!(detailItem.status === Constant.ACTIVE_NEWS || detailItem.status === Constant.INACTIVE_NEWS)) {
            check = true;
        }
        if (check === true) {
            return false;
        }
        return true;
    }

    const handleGetToggleStatusItem = (id, name, status) => {
        setToggleStatusItem({ id: id, name: name, status: status });
        toggleToggleStatusModal();
    }

    const handleToggleStatus = (event) => {
        event.preventDefault();
        const notification = toast.loading("Đang xử lí yêu cầu...");

        const url = "news?id=" + toggleStatusItem.id;
        const editData = async () => {
            api.put(url, {
                status: toggleStatusItem.status === true ? Constant.INACTIVE_NEWS : Constant.ACTIVE_NEWS
            })
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toast.update(notification, { render: "Cập nhật thành công!", type: "success", autoClose: 5000, isLoading: false });
                    setChange(!change);
                    toggleToggleStatusModal();
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        editData();
    }

    const handleGetItem = (item) => {
        setNotificationItem(item);
        toggleNotificationModal();
    }

    const handleGetResidentItem = (item) => {
        setResidentItem(item);
        toggleResidentModal();
    }

    const handleGetProductItem = (id) => {
        setProductItem({ id: id });
        toggleProductModal();
    }

    const handleGetStoreItem = (id) => {
        setStoreItem({ id: id });
        toggleStoreModal();
    }

    const handleGetPicItem = (url) => {
        setPicItem(url);
        togglePictureModal();
    }

    const handleGetWarnStoreItem = (id, name) => {
        setWarnStoreItem({ id: id, name: name });
        toggleWarnStoreModal();
    }

    const handleWarnStore = (event) => {
        event.preventDefault();

        const warnStore = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            api.put("stores/warning?id=" + warnStore.id + "&isWarning=" + true)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    api.put("stores/warning?id=" + notificationItem.FeedbackId)
                    toast.update(notification, { render: "Cảnh cáo cửa hàng thành công!", type: "success", autoClose: 5000, isLoading: false });
                    setFeedbackChange(!feedbackChange);
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        warnStore();
        toggleNotificationModal();
    }

    const handleSetRead = (event) => {
        event.preventDefault();

        const read = async () => {
            api.put("feedbacks?id=" + notificationItem.FeedbackId)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setFeedbackChange(!feedbackChange);
                }
            })
            .catch(function (error) {
                console.log(error);
                const notification = toast.loading("Đang xử lí yêu cầu...");
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        read();
        toggleNotificationModal();
    }
    
    return (
        <PageWrapper>
            <Row mb>
                <Title>Trang chủ</Title>

                <Align>
                    <Label>Thống kê theo:</Label>
                    <SelectWrapper ref={clickOutside}>
                        <Select onClick={toggleDropdown}>
                            {day} ngày gần nhất
                            <ArrowDropDown />
                        </Select>

                        <DropdownMenu dropdown={dropdown}>
                            <DropdownList onClick={(e) => handleSetDay(e, 7)}>7 ngày gần nhất</DropdownList>
                            <DropdownList onClick={(e) => handleSetDay(e, 30)}>30 ngày gần nhất</DropdownList>
                            <DropdownList onClick={(e) => handleSetDay(e, 365)}>365 ngày gần nhất</DropdownList>
                        </DropdownMenu>
                    </SelectWrapper>
                </Align>
            </Row>

            <Grid>
                <GridItem>
                    <GridLabel>Tổng số đơn hàng</GridLabel>
                    <Align>
                        <StyledCartIcon />
                        <GridParam>{dashboardData.TotalCanceledOrder + dashboardData.TotalCompletedOrder}</GridParam>
                        <GridParamSmall>đơn</GridParamSmall>
                    </Align>
                </GridItem>

                <GridItem>
                    <GridLabel>Tổng số đơn hoàn thành</GridLabel>
                    <Align>
                        <StyledCartCheckoutIcon />
                        <GridParam>{dashboardData.TotalCompletedOrder}</GridParam>
                        <GridParamSmall>đơn</GridParamSmall>
                    </Align>
                </GridItem>

                <GridItem>
                    <GridLabel>Tổng số đơn thất bại</GridLabel>
                    <Align>
                        <StyledNoCartIcon />
                        <GridParam>{dashboardData.TotalCanceledOrder}</GridParam>
                        <GridParamSmall>đơn</GridParamSmall>
                    </Align>
                </GridItem>

                <GridItem>
                    <GridLabel>Tổng số phản hồi</GridLabel>
                    <Align>
                        <StyledFeedbackIcon />
                        <GridParam>{dashboardData.TotalFeedback}</GridParam>
                        <GridParamExSmall>phản hồi</GridParamExSmall>
                    </Align>
                </GridItem>

                <GridItem>
                    <GridLabel>Sản phẩm mới</GridLabel>
                    <Align>
                        <StyledProductIcon />
                        <GridParam>{dashboardData.TotalProduct}</GridParam>
                        <GridParamExSmall>sản phẩm</GridParamExSmall>
                    </Align>
                </GridItem>

                <GridItem>
                    <GridLabel>Bảng giá mới</GridLabel>
                    <Align>
                        <StyledMenuIcon />
                        <GridParam>{dashboardData.TotalMenu}</GridParam>
                        <GridParamExSmall>bảng giá</GridParamExSmall>
                    </Align>
                </GridItem>

                <GridItem>
                    <GridLabel>Cửa hàng mới</GridLabel>
                    <Align>
                        <StyledStoreIcon />
                        <GridParam>{dashboardData.TotalStore}</GridParam>
                        <GridParamExSmall>cửa hàng</GridParamExSmall>
                    </Align>
                </GridItem>

                <GridItem area={"3 / 1 / 3 / 4"}>
                    {
                        user.RoleId === "R002" ?
                        <GridLabel>Tin mới hệ thống</GridLabel>
                        : <GridLabel>Tin mới chung cư</GridLabel>
                    }

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader width="1%" grey>#</TableHeader>
                                <TableHeader width="9%" center>Loại</TableHeader>
                                <TableHeader width="20%">Tựa đề</TableHeader>
                                <TableHeader width="40%">Nội dung</TableHeader>
                                <TableHeader width="15%" center>Ghim</TableHeader>
                                <TableHeader width="15%" center>Hoạt động</TableHeader>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <NewsList 
                                currentItems={news}
                                handleGetDetailItem={handleGetDetailItem}
                                handleGetToggleStatusItem={handleGetToggleStatusItem}
                            />
                        </TableBody>
                    </Table>
                </GridItem>

                <GridItem p0 area={"2 / 4 / 4 / 4"}>
                    <SpaceBetween>
                        <div>
                            <Tab>Danh sách Phản hồi</Tab>

                            <HomeNotificationList 
                                currentItems={feedbacks}
                                handleGetItem={handleGetItem}
                            />
                        </div>

                        <StyledPaginateContainer>
                            <ReactPaginate
                                nextLabel="Next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={lastPage}
                                previousLabel="< Prev"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                forcePage={page}
                                renderOnZeroPageCount={null}
                            />
                        </StyledPaginateContainer>
                    </SpaceBetween>
                </GridItem>
            </Grid>

            <Footer />

            <DetailModal 
                display={detailModal}
                toggle={toggleDetailModal}
                detailItem={detailItem}
                error={error}
                setDetailItem={setDetailItem}
                handleEditItem={handleEditItem}
            />

            <ToggleStatusModal
                display={toggleStatusModal}
                toggle={toggleToggleStatusModal}
                toggleStatusItem={toggleStatusItem}
                handleToggleStatus={handleToggleStatus}
            />

            <NotificationDetailModal 
                display={notificationModal} 
                toggle={toggleNotificationModal} 
                detailItem={notificationItem}
                handleGetResidentItem={handleGetResidentItem}
                handleGetProductItem={handleGetProductItem}
                handleGetStoreItem={handleGetStoreItem}
                handleGetWarnStoreItem={handleGetWarnStoreItem}
                handleGetPicItem={handleGetPicItem}
                handleSetRead={handleSetRead}
            />

            <ResidentDetailModal
                display={residentModal} 
                toggle={toggleResidentModal}
                resident={residentItem}
            />

            <ProductDetailModal
                display={productModal} 
                toggle={toggleProductModal}
                detailItem={productItem}
            />

            <StoreDetailModal 
                display={storeModal}
                toggle={toggleStoreModal}
                detailItem={storeItem}
            />

            <WarnStoreModal
                display={warnStoreModal} 
                toggle={toggleWarnStoreModal} 
                warnItem={warnStoreItem} 
                handleWarnStore={handleWarnStore}
            />

            <PictureModal
                display={pictureModal} 
                toggle={togglePictureModal} 
                url={picItem}
            />
        </PageWrapper>
    )
}

export default Home;