/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import PoiList from '../../components/Poi/PoiList';
import ReactPaginate from "react-paginate";
import { AddCircle, Search } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { api } from "../../RequestMethod";
import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../../contexts/AuthContext";
import * as Constant from '../../Constant';

const PageWrapper = styled.div`
    margin: 50px 40px;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: ${props => props.mb ? "20px" : "0px"};
`;

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const SearchBar = styled.div`
    display: flex;
    width: 31%;
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

    &:focus {
    opacity: 0.5;
    }
`;

const DropdownWrapper = styled.div`
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

const AddButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #28a745;
    height: 44px;
    width: 12%;
    border-style: none;
    border-radius: 5px;
    color: #fff;
    text-decoration: none;
    font-size: 0.9em;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

    &:focus {
    opacity: 0.5;
    }
`;

const AddIcon = styled(AddCircle)`
    padding-right: 5px;
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
    justify-content: center;
    width: 35%;
`;

const StyledPaginateContainer = styled.div`
    margin-right; 10px;

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

const ModalTitle = styled.h2`
    margin: 25px 20px;
    color: #212529;
`;

const ModalContentWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    border-bottom: 1px solid #cfd2d4;
`;

const ModalContent = styled.p`
    margin: 25px 20px;
    color: #762a36;
    padding: 20px;
    background: #f8d7da;
    border-radius: 5px;
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    float: right;
`;

const ModalButton = styled.button`
    min-width: 80px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.red ? "#dc3545" : "#fff"};
    color: ${props => props.red ? "#fff" : "#212529"};;
    border: 1px solid ${props => props.red ? "#dc3545" : "#fff"};
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '65%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const Footer = styled.div`
    padding-top: 50px;
`;

const Poi = () =>  {
    const location = useLocation(); //để fetch state name truyền từ AddPoi qua
    const [loading, setLoading] = useState(false);
    const { resident } = useAuth();

    const [DeleteModal, toggleDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState({id: '', name: ''});

    const [APIdata, setAPIdata] = useState([]);

    const [pageCount, setPageCount] = useState(1);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [change, setChange] = useState(false);
    const [status, setStatus] = useState('0'); //status filter

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('-releasedate');
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        if (location.state && location.state.name) {
            const notify = () => toast.success("Tạo thành công " + location.state.name + "!", {
                position: toast.POSITION.TOP_CENTER
              });
            notify();
        }
    }, []);

    useEffect( () => {  //fetch api data
        setLoading(true);
        let url = "pois?limit=" + limit + "&page=" + (page + 1) + "&sort=" + sort;
        if (resident.role === Constant.MARKET_MANAGER) {
            url = "pois?apartmentid=" + resident.apartmentId;
        }
        const fetchData = () => {
            api.get(url)
            .then(function (res) {
                console.log("bruh");
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
    }, [change, limit, page, sort]);

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    const handleSearch = (searchValue, statusValue) => {
        setSearch(searchValue);
        setStatus(statusValue);
        setItemOffset(0);   //back to page 1
        setPage(0);
    }

    const clearSearch = () => {
        setSearch('');
        document.getElementById("search").value = '';
    }

    const handleChangeItemsPerPage = (value) => {
        setItemsPerPage(parseInt(value));
        setItemOffset(0);   //back to page 1
        setPage(0);
    }

    const handleGetDeleteItem = (id, name) => {
        setDeleteItem({id: id, name: name});
        toggleDeleteModal(!DeleteModal)
    }

    const handleDeleteItem = (id) => {
        const url = "pois?id=" + id;
        api.delete(url)
        .then(function (res) {
            if (res.data.ResultMessage === "SUCCESS") {
                setChange(!change);
                const notify = () => toast.success("Xóa thành công " + deleteItem.name + "!", {
                    position: toast.POSITION.TOP_CENTER
                    });
                notify();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <PageWrapper>
            <Title>POIs</Title>

            <TableWrapper>
                <Row mb>
                    <SearchBar>
                        <StyledSearchIcon />
                        <Input id="search" placeholder="Tìm kiếm POI" onChange={(event) => handleSearch(event.target.value, status)} />
                        <Button onClick={() => clearSearch()}>Clear</Button>
                    </SearchBar>

                    <DropdownWrapper width="16%">
                        <Select value={status} onChange={(event) => handleSearch(search, event.target.value)}>
                            <option value="0">--- Lọc trạng thái ---</option>
                            <option value="13001">Active</option>
                            <option value="13002">Inactive</option>
                        </Select>
                    </DropdownWrapper>

                    <ItemsPerPageWrapper>
                        Số hàng mỗi trang:&nbsp;
                        <DropdownWrapper width="40px">
                            <Select value={limit} onChange={(event) => setLimit(event.target.value)}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </Select>
                        </DropdownWrapper>              
                    </ItemsPerPageWrapper>  

                    <AddButton to={"/addPoi/"}>
                        <AddIcon />
                        Tạo POI mới
                    </AddButton>
                </Row>
                
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader width="3%" grey>#</TableHeader>
                            <TableHeader width="17%">Tựa đề</TableHeader>
                            <TableHeader width="30%">Nội dung</TableHeader>
                            <TableHeader width="20%">Địa chỉ chung cư</TableHeader>
                            <TableHeader width="10%">Quản lý</TableHeader>
                            <TableHeader width="10%" center>Trạng thái</TableHeader>
                            <TableHeader width="10%" center>Chỉnh sửa</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                        loading ? 
                        <TableData center colSpan={7}> <CircularProgress /> </TableData>
                        : 
                        <PoiList currentItems={APIdata} handleGetDeleteItem={handleGetDeleteItem} />
                        }
                    </TableBody>
                </Table>

                <Row mt>
                    { APIdata.length !== 0 
                    ? <small>Hiển thị {page * limit + 1} - {page * limit + APIdata.length} trong tổng số {total} pois.</small>
                    : null }
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

            <Modal isOpen={DeleteModal} onRequestClose={() => toggleDeleteModal(!DeleteModal)} style={customStyles} ariaHideApp={false}>
                <ModalTitle>Xác Nhận Xóa</ModalTitle>
                <ModalContentWrapper>
                    <ModalContent>Bạn có chắc chắn muốn xóa danh mục【<b>{deleteItem.name}</b>】?</ModalContent>
                </ModalContentWrapper>
                <ModalButtonWrapper>
                    <ModalButton onClick={() => toggleDeleteModal(!DeleteModal)}>Quay lại</ModalButton>
                    <ModalButton red onClick={() => { handleDeleteItem(deleteItem.id); toggleDeleteModal(!DeleteModal) }}>Xóa</ModalButton>
                </ModalButtonWrapper>
            </Modal>
        </PageWrapper>
    )
}

export default Poi;