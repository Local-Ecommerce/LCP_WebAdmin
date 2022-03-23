/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from "react-router-dom";
import ApartmentResidentList from '../components/ApartmentResident/ApartmentResidentList';
import ReactPaginate from "react-paginate";
import { AddCircle, Search, KeyboardBackspace } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import { useAuth } from "../contexts/AuthContext";
import CreateModal from '../components/ApartmentResident/CreateModal';
import * as Constant from '../Constant';

const PageWrapper = styled.div`
    margin: 40px;
`;

const StyledBackIcon = styled(KeyboardBackspace)`
    && {
        color: #727272;
        padding: 5px;
        border: 1px solid #727272;
        border-radius: 4px;
        margin-right: 10px;
        cursor: pointer;
    }
`;

const TitleGrey = styled.span`
    color: #727272;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
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
    margin: ${props => props.m ? "15px 15px -5px 15px" : null};
`;

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
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

const ApartmentResident = () =>  {
    const { id } = useParams();
    let navigate = useNavigate();

    const { createAuthentication } = useAuth();
    const [apartment, setApartment] = useState({});

    const [createModal, setCreateModal] = useState(false);
    function toggleCreateModal() { setCreateModal(!createModal); }

    const [input, setInput] = useState({ email: '' });
    const [error, setError] = useState({ email: '' });

    const [loading, setLoading] = useState(true);

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
        let url = "apartments?id=" + id;
        const fetchData = () => {
            api.get(url)
            .then(function (res) {
                if (res.data.Data.List[0]) {
                    setApartment(res.data.Data.List[0]);
                
                    let url2 = "residents" 
                    + "?limit=" + limit 
                    + "&page=" + (page + 1) 
                    + "&sort=" + sort 
                    + "&apartmentid=" + id
                    + (search !== '' ? ("&search=" + search) : '')
                    + (status !== '' ? ("&status=" + status) : '')
                    + (type !== '' ? ("&type=" + type) : '');
                    api.get(url2)
                    .then(function (res2) {
                        setAPIdata(res2.data.Data.List);
                        setTotal(res2.data.Data.Total);
                        setLastPage(res2.data.Data.LastPage);
                        setLoading(false);
                    })
                } else {
                    navigate("/apartments");
                }
            })
            .catch(function (error) {
                console.log(error);
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

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        setError(error => ({ ...error, [name]: '' }));
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

    const createFirebaseAccount = (event) => {
        event.preventDefault();
        
        if (validCheck()) {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            createAuthentication(input.email, '123456', id)
            .then(() => {
                setInput(input => ({ ...input, email: '' }));
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
        setError(error => ({ ...error, email: '' }));

        let pattern= /[^@\s]+@[^@\s]+\.[^@\s]+/;
        if (input.email === null || input.email === '' || !pattern.test(input.email)) {
            setError(error => ({ ...error, email: 'Vui lòng nhập đúng chuẩn email' }));
            check = true;
        }
        if (check === true) {
            return false;
        }

        return true;
    }

    return (
        <PageWrapper>
            <Row mb>
                <Align m>
                    <StyledBackIcon onClick={() => navigate("/apartments")} />
                    <Title><TitleGrey>Chung cư </TitleGrey>/ {loading ? 'Đang tải...' : apartment.ApartmentName}</Title>
                </Align>

                <AddButton onClick={toggleCreateModal}>
                    <AddIcon /> Tạo quản lí
                </AddButton>
            </Row>

            <TableWrapper>
                <Row mb>
                    <SearchBar>
                        <StyledSearchIcon />
                        <Input id="search" placeholder="Tìm kiếm dân cư" onChange={handleSetSearch} />
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

                    <Align>
                        <small>Trạng thái:&nbsp;</small>
                        <DropdownWrapper>
                            <Select value={status} onChange={handleSetStatus}>
                                <option value=''>Toàn bộ</option>
                                <option value={Constant.ACTIVE_APARTMENT}>Hoạt động</option>
                                <option value={Constant.INACTIVE_APARTMENT}>Ngừng hoạt động</option>
                            </Select>
                        </DropdownWrapper>
                    </Align>

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
                            <TableHeader width="37%">Tên cư dân</TableHeader>
                            <TableHeader width="15%" center>Ngày sinh</TableHeader>
                            <TableHeader width="15%" center>Số điện thoại</TableHeader>
                            <TableHeader width="15%" center>Kiểu cư dân</TableHeader>
                            <TableHeader width="15%" center>Trạng thái</TableHeader>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                        loading ? 
                        <tr>
                            <TableData center colSpan={5}> <CircularProgress /> </TableData>
                        </tr>
                        : 
                        <ApartmentResidentList 
                            currentItems={APIdata} 
                        />
                        }
                    </TableBody>
                </Table>

                <Row mt>
                    { 
                    loading || APIdata.length === 0 ? null
                    : <small>Hiển thị {page * limit + 1} - {page * limit + APIdata.length} trong tổng số {total} dân cư.</small> 
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

            <CreateModal 
                display={createModal}
                toggle={toggleCreateModal}
                input={input}
                error={error} 
                handleChange={handleChange}
                createFirebaseAccount={createFirebaseAccount}
            />
        </PageWrapper>
    )
}

export default ApartmentResident;