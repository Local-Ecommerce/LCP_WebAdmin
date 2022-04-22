/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ResidentList from '../components/Resident/ResidentList';
import ReactPaginate from "react-paginate";
import { AddCircle, Search } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';
import * as Constant from '../Constant';

import { db } from "../firebase";
import { ref, push } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";

import CreateModal from '../components/Resident/CreateModal';
import RejectModal from '../components/Notification/RejectModal';
import ApproveModal from '../components/Notification/ApproveModal';
import DetailModal from '../components/Notification/ResidentNotification/DetailResidentModal';
import ToggleStatusModal from '../components/Resident/ToggleStatusModal';

const PageWrapper = styled.div`
    margin: 40px;
`;

const Tab = styled.h1`
    font-size: 16px;
    color: #383838;
    padding: 10px;
    margin: 0px;
    background-color: ${props => props.active ? props.theme.white : null};
    border-radius: 5px 5px 0 0;
    border: 1px solid rgba(0,0,0,0.1);
    margin-right: 5px;
    cursor: pointer;
`;

const Row = styled.div`
    display: flex;
    align-items: ${props => props.end ? "flex-end" : "center"};
    justify-content: ${props => props.start ? "flex-start" : "space-between"};
    margin-left: ${props => props.ml ? "10px" : "0px"};
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: ${props => props.mb ? "20px" : "0px"};
`;

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const Align = styled.div`
    display: flex;
    align-items: center;
`;

const SearchBar = styled.div`
    display: flex;
    width: 35%;
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
    padding: 16px;
    font-size: 15px;
    color: ${props => props.grey ? props.theme.grey : null};
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

const AddButton = styled.button`
    margin-bottom: 15px;
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

const Resident = ({ refresh, toggleRefresh }) =>  {
    const user = JSON.parse(localStorage.getItem('USER'));
    const { createAuthentication } = useAuth();

    const [toggleStatusModal, setToggleStatusModal] = useState(false);
    const toggleToggleStatusModal = () => { setToggleStatusModal(!toggleStatusModal) };
    const [rejectModal, setRejectModal] = useState(false);
    function toggleRejectModal() { setRejectModal(!rejectModal); }
    const [approveModal, setApproveModal] = useState(false);
    function toggleApproveModal() { setApproveModal(!approveModal); }
    const [detailModal, setDetailModal] = useState(false);
    function toggleDetailModal() { setDetailModal(!detailModal); }
    const [createModal, setCreateModal] = useState(false);
    function toggleCreateModal() { 
        setCreateModal(!createModal); 
        setInput({
            role: 'Customer',
            email: '',
            fullname: '',
            phoneNumber: '',
            deliveryAddress: '',
            dob: DateTime.fromFormat('01/01/2000', 'd/M/yyyy').toUTC().toISO(),
            gender: 'Nam',
            apartmentId: user.Residents[0].ApartmentId
        });
        setError({
            email: '',
            fullname: '',
            phoneNumber: '',
            deliveryAddress: '',
            dob: ''
        });
    }

    const [input, setInput] = useState({
        role: 'Customer',
        email: '',
        fullname: '',
        phoneNumber: '',
        deliveryAddress: '',
        dob: DateTime.fromFormat('01/01/2000', 'd/M/yyyy').toUTC().toISO(),
        gender: 'Nam',
        apartmentId: user.Residents[0].ApartmentId
    });
    const [error, setError] = useState({
        email: '',
        fullname: '',
        phoneNumber: '',
        deliveryAddress: '',
        dob: ''
    });
    const [toggleStatusItem, setToggleStatusItem] = useState({ id: '', name: '', status: true });
    const [rejectItem, setRejectItem] = useState({ id: '', name: '' });
    const [approveItem, setApproveItem] = useState({ id: '', name: '' });
    const [detailItem, setDetailItem] = useState({});

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [APIdata, setAPIdata] = useState([]);
    const [change, setChange] = useState(false);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(0);

    const sort = '+residentname';
    const [typing, setTyping] = useState('');
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(Constant.VERIFIED_RESIDENT);
    const [type, setType] = useState('');

    useEffect( () => {  //fetch api data
        setLoading(true);
        let url = "residents" 
        + "?limit=" + limit 
        + "&page=" + (page + 1) 
        + "&sort=" + sort 
        + "&apartmentid=" + user.Residents[0].ApartmentId
        + (search !== '' ? ("&search=" + search) : '')
        + (status !== '' ? ("&status=" + status) : '')
        + (type !== '' ? ("&type=" + type) : '');
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
    }, [refresh, change, limit, page, sort, status, search, type]);

    useEffect(() => {   //timer when search
        const timeOutId = setTimeout(() => setSearch(typing), 500);
        return () => clearTimeout(timeOutId);
    }, [typing]);

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        setError(error => ({ ...error, [name]: '' }));
    }

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    const clearSearch = () => {
        setTyping('');
        setPage(0);
        document.getElementById("search").value = '';
    }

    function handleSetSearch(e) {
        const { value } = e.target;
        setTyping(value);
        setPage(0);
    }

    function handleSwitchTab(value) {
        setActiveTab(value);
        if (value === 1) {
            setStatus(Constant.VERIFIED_RESIDENT);
        } else {
            setStatus(Constant.UNVERIFIED_RESIDENT);
        }
        setPage(0);
    }

    function handleSetStatus(e) {
        const { value } = e.target;
        setStatus(value);
        setPage(0);
    }

    function handleSetType(e) {
        const { value } = e.target;
        setType(value);
        setPage(0);
    }

    function handleSetLimit(e) {
        const { value } = e.target;
        setLimit(value);
        setPage(0);
    }

    const handleGetApproveItem = (id, name, image, residentId) => {
        setApproveItem({ id : id, name: name, image: image, residentId: residentId });
        toggleApproveModal();
    }

    const handleGetRejectItem = (id, name, image, residentId) => {
        setRejectItem({ id : id, name: name, image: image, residentId: residentId });
        toggleRejectModal();
    }

    const handleGetDetailItem = (item) => {
        setDetailItem(item);
        toggleDetailModal();
    }

    const handleGetToggleStatusItem = (id, name, status) => {
        setToggleStatusItem({ id: id, name: name, status: status });
        toggleToggleStatusModal();
    }

    const handleAddItem = (event) => {
        event.preventDefault();
        if (validCheck()) {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            createAuthentication(input.email, '123456', input)
            .then(() => {
                toggleCreateModal();
                toast.update(notification, { render: "Tạo tài khoản thành công!", type: "success", autoClose: 5000, isLoading: false });
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.update(notification, { render: "Email đã tồn tại trong hệ thống.", type: "error", autoClose: 5000, isLoading: false });
                } else {
                    toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
                }
            });
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, email: '', fullname: '', phoneNumber: '', deliveryAddress: '', dob: '', gender: '' }));

        let emailPattern = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        if (input.email === null || input.email === '' || !emailPattern.test(input.email)) {
            setError(error => ({ ...error, email: 'Vui lòng nhập đúng chuẩn email' }));
            check = true;
        }
        if (input.fullname === null || input.fullname === '') {
            setError(error => ({ ...error, fullname: 'Vui lòng không để trống tên' }));
            check = true;
        }
        let phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (input.phoneNumber === null || input.phoneNumber === '' || !phonePattern.test(input.phoneNumber)) {
            setError(error => ({ ...error, phoneNumber: 'Vui lòng nhập đúng chuẩn số điện thoại' }));
            check = true;
        }
        if (input.deliveryAddress === null || input.deliveryAddress === '') {
            setError(error => ({ ...error, deliveryAddress: 'Vui lòng không để trống địa chỉ' }));
            check = true;
        }
        if (input.dob === null || input.dob === '' 
            || DateTime.fromISO(input.dob).toFormat('dd/MM/yyyy') === 'Invalid DateTime') {
            setError(error => ({ ...error, dob: 'Vui lòng nhập định dạng ngày/tháng/năm' }));
            check = true;
        }

        if (check === true) {
            return false;
        }
        return true;
    }

    const handleApproveResidentItem = (event) => {
        event.preventDefault();
        const handleApprove = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            api.put("residents/" + approveItem.id + "?status=" + Constant.VERIFIED_RESIDENT)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toggleRefresh();
                    setApproveModal(false);
                    setDetailModal(false);

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
                        type: '201'
                    });

                    toast.update(notification, { render: "Duyệt cư dân thành công!", type: "success", autoClose: 5000, isLoading: false });
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
            api.put("residents/" + rejectItem.id + "?status=" + Constant.REJECTED_RESIDENT)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toggleRefresh();
                    setRejectModal(false);
                    setDetailModal(false);

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
                        type: '202'
                    });
                    
                    toast.update(notification, { render: "Từ chối cư dân thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        handleReject();
    }

    const handleToggleStatus = (event) => {
        event.preventDefault();
        const notification = toast.loading("Đang xử lí yêu cầu...");
        let updateStatus = toggleStatusItem.status === true ? Constant.INACTIVE_RESIDENT : Constant.VERIFIED_RESIDENT
        const url = "residents/" + toggleStatusItem.id + "?status=" + updateStatus;
        const editData = async () => {
            api.put(url, )
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
        <PageWrapper>
           <Row end ml>
                <Align>
                    <Tab active={activeTab === 1 ? true : false} onClick={() => handleSwitchTab(1)}>Cư dân</Tab>
                    <Tab active={activeTab === 2 ? true : false} onClick={() => handleSwitchTab(2)}>Cư dân chờ duyệt</Tab>
                </Align>

                <AddButton onClick={toggleCreateModal}>
                    <AddIcon /> Tạo tài khoản
                </AddButton>
            </Row>

            <TableWrapper>
                <Row mb>
                    <SearchBar>
                        <StyledSearchIcon />
                        <Input id="search" placeholder="Tìm kiếm cư dân" onChange={handleSetSearch} />
                        <Button onClick={() => clearSearch()}>Clear</Button>
                    </SearchBar>

                    <Align>
                        <small>Kiểu cư dân:&nbsp;</small>
                        <DropdownWrapper>
                            <Select value={type} onChange={handleSetType}>
                                <option value=''>Toàn bộ</option>
                                <option value={Constant.CUSTOMER}>Khách hàng</option>
                                <option value={Constant.MERCHANT}>Thương nhân</option>
                                <option value={Constant.MARKET_MANAGER}>Quản lí</option>
                            </Select>
                        </DropdownWrapper>
                    </Align>

                    {
                        activeTab === 1 ?
                        <Align>
                            <small>Trạng thái:&nbsp;</small>
                            <DropdownWrapper>
                                <Select value={status} onChange={handleSetStatus}>
                                    <option value=''>Toàn bộ</option>
                                    <option value={Constant.VERIFIED_RESIDENT}>Hoạt động</option>
                                    <option value={Constant.INACTIVE_RESIDENT}>Ngừng hoạt động</option>
                                </Select>
                            </DropdownWrapper>
                        </Align>
                        : null
                    }

                    <Align>
                        <small>Số hàng mỗi trang:&nbsp;</small>
                        <DropdownWrapper>
                            <Select value={limit} onChange={handleSetLimit}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                            </Select>
                        </DropdownWrapper>              
                    </Align>  
                </Row>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader width="3%" grey>#</TableHeader>
                            <TableHeader width="32%">Tên cư dân</TableHeader>
                            <TableHeader width="15%" center>Ngày sinh</TableHeader>
                            <TableHeader width="15%" center>Số điện thoại</TableHeader>
                            <TableHeader width="15%" center>Kiểu cư dân</TableHeader>
                            <TableHeader width="20%" center>Hoạt động</TableHeader>
                            {
                                activeTab === 1 ?
                                null :
                                <TableHeader width="15%" center>Hành động</TableHeader>
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                        loading ? 
                        <tr>
                            <TableData center colSpan={100}> <CircularProgress /> </TableData>
                        </tr>
                        : 
                        <ResidentList 
                            currentItems={APIdata} 
                            handleGetToggleStatusItem={handleGetToggleStatusItem}
                            handleGetDetailItem={handleGetDetailItem}
                            handleGetApproveItem={handleGetApproveItem}
                            handleGetRejectItem={handleGetRejectItem}
                        />
                        }
                    </TableBody>
                </Table>

                <Row mt>
                    { 
                    loading || APIdata.length === 0 ? null
                    : <small>Hiển thị {page * limit + 1} - {page * limit + APIdata.length} trong tổng số {total} cư dân.</small> 
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
            </TableWrapper>

            <Footer />

            <ToggleStatusModal
                display={toggleStatusModal}
                toggle={toggleToggleStatusModal}
                toggleStatusItem={toggleStatusItem}
                handleToggleStatus={handleToggleStatus}
            />

            <CreateModal 
                display={createModal}
                toggle={toggleCreateModal}
                input={input}
                error={error} 
                handleChange={handleChange}
                setInput={setInput}
                handleAddItem={handleAddItem}
            />

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
                handleApproveItem={handleApproveResidentItem}
            />

            <RejectModal
                display={rejectModal} 
                toggle={toggleRejectModal} 
                rejectItem={rejectItem} 
                handleRejectItem={handleRejectResidentItem}
            />

        </PageWrapper>
    )
}

export default Resident;