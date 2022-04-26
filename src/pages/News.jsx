/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import NewsList from '../components/News/NewsList';
import ReactPaginate from "react-paginate";
import { AddCircle, Search, DoubleArrow, ArrowRight, Article } from '@mui/icons-material';
import { CircularProgress, Checkbox } from '@mui/material';
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import { List, AutoSizer } from 'react-virtualized';
import * as Constant from '../Constant';

import CreateModal from '../components/News/CreateModal';
import DetailModal from '../components/News/DetailModal';
import ToggleStatusModal from '../components/News/ToggleStatusModal';

const PageWrapper = styled.div`
    margin: 50px 40px 50px ${props => props.toggle ? "370px" : "45px"};
    transition: 0.3s;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px 15px -5px 15px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: ${props => props.mb ? "20px" : "0px"};
`;

const Align = styled.div`
    display: flex;
    align-items: center;
`;

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const SearchBar = styled.div`
    display: flex;
    width: ${props => props.width};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #D8D8D8;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
    margin-right: 10px;
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

const Button = styled.button`
    height: 36px;
    width: 70px;
    background-color: #17a2b8;
    border-style: none;
    border-radius: 5px;
    color: #fff;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const DropdownWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #D8D8D8;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
`;

const Select = styled.select`
    padding: 4px;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;

    &:focus {
    outline: 0;
    }
`;

const AddButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: ${props => props.theme.green};
    border-style: none;
    border-radius: 5px;
    color: ${props => props.theme.white};
    text-decoration: none;
    font-size: 0.9em;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const AddIcon = styled(AddCircle)`
    && {
        margin-right: 5px;
        font-size: 20px;
    }
`;

const TableWrapper = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Table = styled.table`
    table-layout: fixed;
    border-spacing: 0px;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    overflow: hidden;
    border-radius: 5px;
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
    border-bottom: 1px solid #dee2e6;
`;

const TableBody = styled.tbody`
    border-top: 1px solid #dee2e6;
`;

const TableData = styled.td`
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    height: 100px;
`;

const TableRow = styled.tr``;

const ItemsPerPageWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const StyledPaginateContainer = styled.div`
    margin-right; 10px;
    margin-left: auto;

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

const Footer = styled.div`
    padding-top: 50px;
`;

const LeftWrapper = styled.div`
    margin-right: 20px;
    position: absolute;
    left: ${props => props.toggle ? "245px" : "-80px"}; top: 62px; right: 0; bottom: 0;
    min-width: 300px;
    max-width: 300px;
    height: calc(~"100vh - 62px");
    background-color: #fff;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    position: fixed;
    transition: 0.3s;
`;

const ButtonWrapper = styled.div`
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 100%;
    transform: translate(-50%, -50%) ${props => props.toggle ? "rotate(-180deg)" : null};
    padding: 5px;
    border-radius: 5px;
    background-color: ${props => props.theme.white};
`;

const StyledDoubleArrowIcon = styled(DoubleArrow)`
    && {
        font-size: 22px;
        color: ${props => props.theme.grey};

        &:hover {
            opacity: 0.8;
        }
    
        &:active {
            transform: translateY(1px);
        }
    }
`;

const CheckboxWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CheckboxLabel = styled.span`
    font-size: 13px;
    margin-right: 20px;
`;

const StyledArrowRight = styled(ArrowRight)`
    && {
        color: #44474a;
        margin-right: 5px;
    }
`;

const ListWrapper = styled.div`
    border: 1px solid #d6d6d6;
    border-radius: 5px;
    width: 100%;
    min-height: 100px;
    height: auto;
    overflow: hidden;
    height: 85%;
`;

const Center = styled.div`
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    top: 45%;
`;

const ApartmentContainer = styled.div`
    height: ${props => props.displayAddress ? "60px" : "35px"};
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    height: 100%;
    border-bottom: 1px solid #e0e0e0;

    &:hover {
    opacity: 0.8;
    background-color: ${props => props.theme.hover};
    }

    &:active {
    transform: translateY(1px);
    }
`;

const ApartmentName = styled.div`
    font-size: 13px;
    color: #44474a; 
    padding: 0px 10px;
`;

const ApartmentAddress = styled.div`
    font-size: 12px;
    color: ${props => props.theme.grey}; 
    padding: 0px 10px;
`;

const AlignColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const NoItemWrapper = styled.div`
    height: auto;
    margin: 0 auto;
    text-align: center;
`;

const StyledNewsIcon = styled(Article)`
    && {
        margin-top: 150px;
        margin-bottom: 20px;
        font-size: 144px;
        color: #D8D8D8;
    }
`;

const NoItemText = styled.div`
    margin-bottom: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    color: #383838;
`;

const News = () =>  {
    const user = JSON.parse(localStorage.getItem('USER'));
    const listRef = useRef();

    const [createModal, setCreateModal] = useState(false);
    function toggleCreateModal() { setCreateModal(!createModal); }
    const [detailModal, setDetailModal] = useState(false);
    function toggleDetailModal() { setDetailModal(!detailModal); }
    const [toggleStatusModal, setToggleStatusModal] = useState(false);
    const toggleToggleStatusModal = () => { setToggleStatusModal(!toggleStatusModal) };
    const [displayApartment, setDisplayApartment] = useState(false);
    function toggleDisplayApartment() { setDisplayApartment(!displayApartment); };
    const [displayAddress, setDisplayAddress] = useState(false);
    function toggleDisplayAddress() { setDisplayAddress(!displayAddress); listRef.current.recomputeRowHeights(); }

    const [input, setInput] = useState({ type: Constant.NEWS_TYPE_01, title: '', priority: false, text: '', images: [{ name: 0, image: '' }], apartment: '' });
    const [detailItem, setDetailItem] = useState({ id: '', type: Constant.NEWS_TYPE_01, title: '', priority: false, text: '', currentImages: [], images: [], residentId: '', apartmentId: '', status: '' });
    const [toggleStatusItem, setToggleStatusItem] = useState({ id: '', name: '', status: true });
    const [error, setError] = useState({ titleError: '', apartmentError: '', editError: '' });

    const [loading, setLoading] = useState(false);
    const [apartmentLoading, setApartmentLoading] = useState(false);

    const [APIdata, setAPIdata] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [change, setChange] = useState(false);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [type, setType] = useState('');
    const [status, setStatus] = useState(Constant.ACTIVE_NEWS);

    
    const [apartment, setApartment] = useState({ id: '', name: '', address: ''});
    const [newsTyping, setNewsTyping] = useState('');
    const [apartmentTyping, setApartmentTyping] = useState('');
    const [newsSearch, setNewsSearch] = useState('');
    const [apartmentSearch, setApartmentSearch] = useState('');

    useEffect( () => {  //fetch api data
        if (apartment.id !== '') {
            setLoading(true);
            let url = "news"
                    + "?limit=" + limit 
                    + "&page=" + (page + 1) 
                    + "&sort=-priority" 
                    + "&sort=-releasedate"
                    + "&include=apartment&include=resident"
                    + (newsSearch !== '' ? ("&search=" + newsSearch) : '') 
                    + (type !== '' ? ("&type=" + type) : '')
                    + (status !== '' ? ("&status=" + status) : '')
                    + "&apartmentid=" + apartment.id;
            const fetchData = () => {
                api.get(url)
                .then(function (res) {
                    setAPIdata(res.data.Data.List);
                    setTotal(res.data.Data.Total);
                    setLastPage(res.data.Data.LastPage);
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false);
                });
            }
            fetchData();
        }
    }, [change, limit, page, status, newsSearch, type, apartment]);

    useEffect( () => {  //fetch apartment
        if (user.RoleId === "R002") {
            setApartmentLoading(true);
            let url = "apartments" 
                    + "?status=4001" 
                    + "&limit=1000" 
                    + (apartmentSearch !== '' ? ("&search=" + apartmentSearch) : '');
            const fetchData = () => {
                api.get(url)
                .then(function (res) {
                    setApartments(res.data.Data.List);
                    setApartmentLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                    setApartmentLoading(false);
                });
            }
            fetchData();
            setDisplayApartment(true);
        } else if (user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
            setApartment({ id: user.Residents[0].ApartmentId, name: '', address: '' });
        }
    }, [apartmentSearch]);

    useEffect(() => {   //timer when search apartment
        const timeOutId = setTimeout(() => setApartmentSearch(apartmentTyping), 500);
        return () => clearTimeout(timeOutId);
    }, [apartmentTyping]);

    useEffect(() => {   //timer when search news
        const timeOutId = setTimeout(() => setNewsSearch(newsTyping), 500);
        return () => clearTimeout(timeOutId);
    }, [newsTyping]);

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    const clearApartmentSearch = () => {
        setApartmentTyping('');
        document.getElementById("apartmentSearch").value = '';
    }

    const clearNewsSearch = () => {
        setNewsTyping('');
        setPage(0);
        document.getElementById("newsSearch").value = '';
    }

    function handleSetApartmentSearch(e) {
        const { value } = e.target;
        setApartmentTyping(value);
    }

    function handleSetNewsSearch(e) {
        const { value } = e.target;
        setNewsTyping(value);
        setPage(0);
    }

    function handleSetType(e) {
        const { value } = e.target;
        setType(value);
        setPage(0);
    }

    function handleSetStatus(e) {
        const { value } = e.target;
        setStatus(value);
        setPage(0);
    }

    function handleSetLimit(e) {
        const { value } = e.target;
        setLimit(value);
        setPage(0);
    }

    const handleSelectApartment = (id, name, address) => {
        setApartment({id: id, name: name, address: address});
    }

    const handleToggleCreateModal = () => {
        setInput({ type: Constant.NEWS_TYPE_01, title: '', priority: false, text: '', images: [{ name: 0, image: '' }], apartment: '' });
        setError(error => ({ ...error, titleError: '' }));
        toggleCreateModal();
    }

    const handleAddItem = (event) => {
        event.preventDefault();
        if (validCheck()) {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            const url = "news";
            const addData = async () => {
                api.post(url, {
                    title: input.title,
                    text: input.text,
                    priority: input.priority,
                    type: input.type,
                    image: input.images.filter(item => item.image !== '').map(item => item.image.split(',')[1]),
                    residentId: (user.Residents[0] ? user.Residents[0].ResidentId : null),
                    apartmentId: (user.Residents[0] ? user.Residents[0].ApartmentId : (input.apartment.ApartmentId || null))
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        toast.update(notification, { render: "Tạo tin mới thành công!", type: "success", autoClose: 5000, isLoading: false });
                        toggleCreateModal();
                        setChange(!change);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
                });
            };
            addData();
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, titleError: '' }));

        if (input.title.trim() === null || input.title.trim() === '') {
            setError(error => ({ ...error, titleError: 'Vui lòng nhập tiêu đề' }));
            check = true;
        }
        if (check === true) {
            return false;
        }
        return true;
    }

    const handleGetDetailItem = (id) => {
        setDetailItem({ id: id, type: Constant.NEWS_TYPE_01, title: '', priority: false, text: '', currentImages: [], images: [], residentId: '', apartmentId: '', status: '' });
        toggleDetailModal();
    }

    const handleEditItem = (event) => {
        event.preventDefault();
        if (validEditCheck()) {
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

    const validEditCheck = () => {
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
                    setChange(!change);
                    toggleToggleStatusModal();
                    toast.update(notification, { render: "Cập nhật thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        editData();
    }

    return (
        <>
        {
            user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager" ? 
            null :
            <LeftWrapper toggle={displayApartment}>
                <ButtonWrapper toggle={displayApartment} onClick={toggleDisplayApartment}>
                    <StyledDoubleArrowIcon />
                </ButtonWrapper>

                <Row>
                    <SearchBar width="100%">
                        <StyledSearchIcon />
                        <Input id="apartmentSearch" placeholder="Tìm chung cư" onChange={handleSetApartmentSearch} />
                        <Button onClick={() => clearApartmentSearch()}>Clear</Button>
                    </SearchBar>
                </Row>

                <CheckboxWrapper>
                    <Checkbox size="small" onChange={toggleDisplayAddress} /> 
                    <CheckboxLabel>Hiển thị địa chỉ</CheckboxLabel>
                </CheckboxWrapper>

                <ListWrapper>
                    {
                        apartmentLoading ?
                        <Center><CircularProgress /></Center>
                        :
                    <AutoSizer>
                        {({width, height}) => (
                            <List
                                ref={listRef}
                                data={displayAddress}
                                height={height}
                                rowCount={apartments ? apartments.length : 0}
                                rowHeight={displayAddress ? 60 : 35}
                                width={width}
                                rowRenderer={({index, key, style}) => {
                                    const apartment = apartments[index];
                                    return (
                                        <ApartmentContainer onClick={() => handleSelectApartment(apartment.ApartmentId, apartment.ApartmentName, apartment.Address)} 
                                            displayAddress={displayAddress} key={key} style={style}>
                                            <AlignColumn>
                                                <ApartmentName>{apartment.ApartmentName}</ApartmentName>
                                                {displayAddress ? <ApartmentAddress>{apartment.Address}</ApartmentAddress> : null}
                                            </AlignColumn>
                                            <StyledArrowRight />
                                        </ApartmentContainer>
                                    )
                                }}
                            />
                        )}
                    </AutoSizer>
                    }
                </ListWrapper>
            </LeftWrapper>
        }

        <PageWrapper toggle={displayApartment}>
            <Row mb>
                <Title>Tin tức</Title>

                <AddButton onClick={handleToggleCreateModal}>
                    <AddIcon /> Tạo tin mới
                </AddButton>
            </Row>

            <TableWrapper>
                {
                    apartment.id === '' ?
                    <NoItemWrapper>
                        <StyledNewsIcon />

                        <NoItemText>
                            Chọn chung cư để xem các tin tức thuộc quản lí của chung cư.
                        </NoItemText>
                    </NoItemWrapper>
                    :
                    <>
                        <Row mb>
                            <SearchBar width="35%">
                                <StyledSearchIcon />
                                <Input id="newsSearch" placeholder="Tìm kiếm tin tức" onChange={handleSetNewsSearch} />
                                <Button onClick={() => clearNewsSearch()}>Clear</Button>
                            </SearchBar>

                            <Align>
                                <small>Loại:&nbsp;</small>
                                <DropdownWrapper>
                                    <Select value={type} onChange={handleSetType}>
                                        <option value=''>Toàn bộ</option>
                                        <option value={Constant.NEWS_TYPE_01}>{Constant.NEWS_TYPE_01}</option>
                                        <option value={Constant.NEWS_TYPE_02}>{Constant.NEWS_TYPE_02}</option>
                                    </Select>
                                </DropdownWrapper>
                            </Align>

                            <Align>
                                <small>Trạng thái:&nbsp;</small>
                                <DropdownWrapper>
                                    <Select value={status} onChange={handleSetStatus}>
                                        <option value=''>Toàn bộ</option>
                                        <option value={Constant.ACTIVE_NEWS}>Hoạt động</option>
                                        <option value={Constant.INACTIVE_NEWS}>Ngừng hoạt động</option>
                                    </Select>
                                </DropdownWrapper>
                            </Align>

                            <ItemsPerPageWrapper>
                                <small>Số hàng mỗi trang:&nbsp;</small>
                                <DropdownWrapper>
                                    <Select value={limit} onChange={handleSetLimit}>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>
                                    </Select>
                                </DropdownWrapper>              
                            </ItemsPerPageWrapper>  
                        </Row>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader width="1%" grey>#</TableHeader>
                                    <TableHeader width="10%" center>Loại</TableHeader>
                                    <TableHeader width="15%">Tựa đề</TableHeader>
                                    <TableHeader width="35%">Nội dung</TableHeader>
                                    <TableHeader width="10%" center>Ghim</TableHeader>
                                    { 
                                        user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager"
                                        ? null : <TableHeader width="10%" center>Chung cư</TableHeader> 
                                    }
                                    <TableHeader width="10%" center>Quản lý</TableHeader>
                                    <TableHeader width="10%" center>Ngày tạo</TableHeader>
                                    <TableHeader width="10%" center>Hoạt động</TableHeader>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                loading ? 
                                <tr>
                                    <TableData center colSpan={100}> <CircularProgress /> </TableData>
                                </tr>
                                : 
                                <NewsList 
                                    currentItems={APIdata} 
                                    handleGetDetailItem={handleGetDetailItem} 
                                    handleGetToggleStatusItem={handleGetToggleStatusItem}
                                />
                                }
                            </TableBody>
                        </Table>

                        <Row mt>
                            { 
                            loading || APIdata.length === 0 ? null
                            : <small>Hiển thị {page * limit + 1} - {page * limit + APIdata.length} trong tổng số {total} tin tức.</small> 
                            }

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
                        </Row>
                    </>
                }
            </TableWrapper>

            <Footer />

            <CreateModal 
                display={createModal}
                toggle={toggleCreateModal}
                input={input}
                error={error} 
                setInput={setInput}
                handleAddItem={handleAddItem}
            />

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
        </PageWrapper>
        </>
    )
}

export default News;