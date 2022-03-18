/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ResidentList from '../../components/Resident/ResidentList';
import ReactPaginate from "react-paginate";
import { Search } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { api } from "../../RequestMethod";
import { toast } from 'react-toastify';
import RejectModal from './RejectModal';
import ApproveModal from './ApproveModal';
import ToggleStatusModal from './ToggleStatusModal';
import * as Constant from '../../Constant';

const PageWrapper = styled.div`
    margin: 40px;
`;

const Tab = styled.h1`
    font-size: 16px;
    color: #383838;
    padding: 15px;
    margin: 0px;
    background-color: ${props => props.active ? props.theme.white : null};
    border-radius: 5px 5px 0 0;
    border: 1px solid rgba(0,0,0,0.1);
    margin-right: 5px;
    cursor: pointer;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
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

const Resident = () =>  {
    const user = JSON.parse(localStorage.getItem('USER'));

    const [toggleStatusModal, setToggleStatusModal] = useState(false);
    const toggleToggleStatusModal = () => { setToggleStatusModal(!toggleStatusModal) };

    const [toggleStatusItem, setToggleStatusItem] = useState({ id: '', name: '', status: true });

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
    const [type, setType] = useState(Constant.CUSTOMER);

    useEffect( () => {  //fetch api data
        setLoading(true);
        let url = "residents?limit=" + 
        limit + "&page=" + 
        (page + 1) + 
        "&sort=" + sort +
        "&apartmentid=" + user.Residents[0].ApartmentId +
        (search !== '' ? ("&search=" + search) : '') + 
        (status !== '' ? ("&status=" + status) : '') + 
        (type !== '' ? ("&type=" + type) : '');
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
    }, [change, limit, page, sort, status, search, type]);

    useEffect(() => {   //timer when search
        const timeOutId = setTimeout(() => setSearch(typing), 500);
        return () => clearTimeout(timeOutId);
    }, [typing]);

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


    const handleGetToggleStatusItem = (id, name, status) => {
        setToggleStatusItem({ id: id, name: name, status: status });
        toggleToggleStatusModal();
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
           <Row ml start>
                <Tab active={activeTab === 1 ? true : false} onClick={() => handleSwitchTab(1)}>Cư dân</Tab>
                <Tab active={activeTab === 2 ? true : false} onClick={() => handleSwitchTab(2)}>Cư dân chờ duyệt</Tab>
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
                            <TableHeader width="15%" center>Cư dân</TableHeader>
                            <TableHeader width="20%" center>Hoạt động</TableHeader>
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

        </PageWrapper>
    )
}

export default Resident;