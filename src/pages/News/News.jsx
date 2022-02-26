/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsList from '../../components/News/NewsList';
import ReactPaginate from "react-paginate";
import { AddCircle, Search } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { api } from "../../RequestMethod";
import { toast } from 'react-toastify';
import CreateModal from './CreateModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const PageWrapper = styled.div`
    margin: 40px;
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
    border-collapse: collapse;
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

const News = () =>  {
    const [createModal, setCreateModal] = useState(false);
    function toggleCreateModal() { setCreateModal(!createModal); }
    const [deleteModal, setDeleteModal] = useState(false);
    function toggleDeleteModal() { setDeleteModal(!deleteModal); }
    const [editModal, setEditModal] = useState(false);
    function toggleEditModal() { setEditModal(!editModal); }

    const [input, setInput] = useState({ title: '', text: '', apartment: '' });
    const [deleteItem, setDeleteItem] = useState({id: '', name: ''});
    const [editItem, setEditItem] = useState({ id: '', title: '', text: '', residentId: '', apartmentId: '', status: '' });
    const [error, setError] = useState({ titleError: '', editError: '' });

    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('USER'));


    const [APIdata, setAPIdata] = useState([]);
    const [change, setChange] = useState(false);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(0);

    const [sort, setSort] = useState('-releasedate');
    const [typing, setTyping] = useState('');
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(12001);

    useEffect( () => {  //fetch api data
        setLoading(true);
        let url = "news?limit=" + limit + "&page=" + (page + 1) + "&sort=" + sort + "&include=apartment&include=resident"
        + (search !== '' ? ("&search=" + search) : '') + (status !== '' ? ("&status=" + status) : '');
        if (user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
            url = "news?apartmentid=" + user.Residents[0].apartmentId;
        }
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
        setInput({ title: '', text: '', apartment: '' });
        setError(error => ({ ...error, titleError: '' }));
        toggleCreateModal();
    }

    const handleAddItem = (event) => {
        event.preventDefault();
        if (validCheck()) {
            const url = "news";
            const addData = async () => {
                api.post(url, {
                    title: input.title,
                    text: input.text,
                    residentId: (user.Residents[0] ? user.Residents[0].ResidentId : null),
                    apartmentId: (user.Residents[0] ? user.Residents[0].ApartmentId : (input.apartment.ApartmentId || null))
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Tạo thành công tin mới!", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        notify();
                        toggleCreateModal();
                        setChange(!change);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            };
            addData();
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, titleError: '' }));

        if (input.title === null || input.title === '') {
            setError(error => ({ ...error, titleError: 'Vui lòng nhập tiêu đề' }));
            check = true;
        }
        if (check === true) {
            return false;
        }
        return true;
    }

    const handleGetDeleteItem = (id, name) => {
        setDeleteItem({id: id, name: name});
        toggleDeleteModal();
    }

    const handleDeleteItem = (event) => {
        event.preventDefault();
        const url = "news?id=" + deleteItem.id;
        const deleteData = async () => {
            api.delete(url)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    const notify = () => toast.success("Xóa thành công danh mục " + deleteItem.name + "!", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    notify();
                    setChange(!change);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        };
        deleteData();
        toggleDeleteModal();
    };

    const handleGetEditItem = (id) => {
        setEditItem(data => ({ ...data, id: id }));
        toggleEditModal();
    }

    const handleEditItem = (event) => {
        event.preventDefault();
        if (validEditCheck()) {
            const url = "news?id=" + editItem.id;
            const editData = async () => {
                api.put(url, {
                    title: editItem.title,
                    text: editItem.text,
                    status: editItem.status,
                    residentId: editItem.residentId || null,
                    apartmentId: editItem.apartmentId || null
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Cập nhật thành công!", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        notify();
                        setChange(!change);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            editData();
            toggleEditModal();
        }
    }

    const validEditCheck = () => {
        let check = false;
        setError(error => ({ ...error, editError: '' }));

        if (editItem.title === null || editItem.title === '') {
            setError(error => ({ ...error, editError: 'Vui lòng nhập tiêu đề' }));
            check = true;
        }
        if (!(editItem.status === 12001 || editItem.status === 12002)) {
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
                <Title>News</Title>

                <AddButton onClick={handleToggleCreateModal}>
                    <AddIcon /> Tạo tin mới
                </AddButton>
            </Row>

            <TableWrapper>
            <Row mb>
                    <Align>
                        <SearchBar>
                            <StyledSearchIcon />
                            <Input id="search" placeholder="Tìm kiếm tin tức" onChange={handleSetSearch} />
                            <Button onClick={() => clearSearch()}>Clear</Button>
                        </SearchBar>

                        <small>Trạng thái:&nbsp;</small>
                        <DropdownWrapper>
                            <Select value={status} onChange={handleSetStatus}>
                                <option value=''>Toàn bộ</option>
                                <option value={12001}>Hoạt động</option>
                                <option value={12002}>Ngừng hoạt động</option>
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
                            <TableHeader width="15%">Tựa đề</TableHeader>
                            <TableHeader width="30%">Nội dung</TableHeader>
                            <TableHeader width="10%" center>Chung cư</TableHeader>
                            <TableHeader width="10%" center>Quản lý</TableHeader>
                            <TableHeader width="10%" center>Ngày tạo</TableHeader>
                            <TableHeader width="10%" center>Trạng thái</TableHeader>
                            <TableHeader width="12%" center>Chỉnh sửa</TableHeader>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                        loading ? 
                        <TableData center colSpan={7}> <CircularProgress /> </TableData>
                        : 
                        <NewsList 
                            currentItems={APIdata} 
                            handleGetEditItem={handleGetEditItem} 
                            handleGetDeleteItem={handleGetDeleteItem} 
                        />
                        }
                    </TableBody>
                </Table>

                <Row mt>
                    { loading ? null
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

            <DeleteModal 
                display={deleteModal}
                toggle={toggleDeleteModal}
                deleteItem={deleteItem}
                handleDeleteItem={handleDeleteItem}
            />

            <EditModal 
                display={editModal}
                toggle={toggleEditModal}
                editItem={editItem}
                error={error}
                setEditItem={setEditItem}
                handleEditItem={handleEditItem}
            />
        </PageWrapper>
    )
}

export default News;