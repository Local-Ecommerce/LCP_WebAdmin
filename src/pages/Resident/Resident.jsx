/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ResidentList from '../../components/Resident/ResidentList';
import ReactPaginate from "react-paginate";
import { AddCircle, Search } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { api } from "../../RequestMethod";
import { toast } from 'react-toastify';
import * as Constant from '../../Constant';
import ToggleStatusModal from './ToggleStatusModal';


const PageWrapper = styled.div`
    margin: 40px;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px;
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
    width: 70%;
    align-items: center;
`;

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const SearchBar = styled.div`
    display: flex;
    width: 50%;
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

const Resident = () =>  {
    const user = JSON.parse(localStorage.getItem('USER'));
    const [createModal, setCreateModal] = useState(false);
    function toggleCreateModal() { setCreateModal(!createModal); }
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    function toggleEditModal() { setEditModal(!editModal); }
    const [toggleStatusModal, setToggleStatusModal] = useState(false);
    const toggleToggleStatusModal = () => { setToggleStatusModal(!toggleStatusModal) };

    const [input, setInput] = useState({ name: '', address: '' });
    const [editItem, setEditItem] = useState({ id: '', name: '', address: '', status: '' });
    const [toggleStatusItem, setToggleStatusItem] = useState({ id: '', name: '', status: true });
    const [error, setError] = useState({ nameError: '', addressError: '', editNameError: '', editAddressError: '' });

    const [loading, setLoading] = useState(false);

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

    useEffect( () => {  //fetch api data
        setLoading(true);
        let url = "residents?limit=" + 
        limit + "&page=" + 
        (page + 1) + 
        "&sort=" + sort +
        "&apartmentid=" + user.Residents[0].ApartmentId +
        (search !== '' ? ("&search=" + search) : '') + 
        (status !== '' ? ("&status=" + status) : '');
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
    }, [change, limit, page, sort, status, search]);

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

    const handleToggleCreateModal = () => {
        setInput({ name: '', address: '' });
        setError(error => ({ ...error, nameError: '', addressError: '' }));
        toggleCreateModal();
    }

    const handleAddItem = (event) => {
        event.preventDefault();
        if (validCheck()) {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            const url = "Residents";
            const addData = async () => {
                api.post(url, {
                    ResidentName: input.name,
                    address: input.address
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        toast.update(notification, { render: "Cập nhật thành công!", type: "success", autoClose: 5000, isLoading: false });
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
        setError(error => ({ ...error, nameError: '', addressError: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, nameError: 'Vui lòng nhập tên cư dân' }));
            check = true;
        }
        if (input.address === null || input.address === '') {
            setError(error => ({ ...error, addressError: 'Vui lòng nhập địa chỉ cư dân' }));
            check = true;
        }
        if (check === true) {
            return false;
        }
        return true;
    }

    const handleGetEditItem = (id, name, address, status) => {
        setEditItem({ id: id, name: name, address: address, status: status });
        toggleEditModal();
    }

    const handleEditItem = (event) => {
        event.preventDefault();
        if (validEditCheck()) {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            const url = "Residents?id=" + editItem.id;
            const editData = async () => {
                api.put(url, {
                    ResidentName: editItem.name,
                    address: editItem.address,
                    status: editItem.status
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
            toggleEditModal();
        }
    }

    const validEditCheck = () => {
        let check = false;
        setError(error => ({ ...error, editNameError: '', editAddressError: '' }));

        if (editItem.name === null || editItem.name === '') {
            setError(error => ({ ...error, editNameError: 'Vui lòng nhập tên cư dân' }));
            check = true;
        }
        if (editItem.address === null || editItem.address === '') {
            setError(error => ({ ...error, editAddressError: 'Vui lòng nhập địa chỉ cư dân' }));
            check = true;
        }
        if (!(editItem.status === Constant.VERIFIED_RESIDENT || editItem.status === Constant.INACTIVE_RESIDENT )) {
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
           <Title>Cư dân</Title>

            <TableWrapper>
                <Row mb>
                    <Align>
                        <SearchBar>
                            <StyledSearchIcon />
                            <Input id="search" placeholder="Tìm kiếm cư dân" onChange={handleSetSearch} />
                            <Button onClick={() => clearSearch()}>Clear</Button>
                        </SearchBar>

                        <small>Trạng thái:&nbsp;</small>
                        <DropdownWrapper>
                            <Select value={status} onChange={handleSetStatus}>
                                <option value=''>Toàn bộ</option>
                                <option value={Constant.VERIFIED_RESIDENT}>Cư dân đang hoạt động</option>
                                <option value={Constant.INACTIVE_RESIDENT}>Cư dân ngừng hoạt động</option>
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
                            <TableHeader width="3%" grey>#</TableHeader>
                            <TableHeader width="27%">Tên cư dân</TableHeader>
                            <TableHeader width="20%" center>Ngày tháng năm sinh</TableHeader>
                            <TableHeader width="20%" center>Số điện thoại</TableHeader>
                            <TableHeader width="20%" center>Cư dân</TableHeader>
                            <TableHeader width="10%" center>Trạng thái</TableHeader>
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
                            handleGetEditItem={handleGetEditItem} 
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