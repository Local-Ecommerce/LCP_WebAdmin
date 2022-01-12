/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import ProductList from '../../components/Product/ProductList';
import ReactPaginate from "react-paginate";

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 31%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #E0E0E0;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
    margin-right: 2%;
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

const SelectWrapper = styled.div`
    display: flex;
    width: 16%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #E0E0E0;
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

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #727272;
`;

const Title = styled.h1`
    font-size: 30px;
    color: #383838;
    margin: 15px;
`;

const TableWrapper = styled.div`
    width: 100%;
    margin-right: auto;
    margin-left: auto;
`;

const Table = styled.table`
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    background-color: #fff;
    overflow: hidden;
`;

const TableHead = styled.thead`
    display: table-header-group;
    vertical-align: bottom;
`;

const TableHeader = styled.th`
    width: ${props => props.width};
    text-align: ${props => props.center ? "center" : "left"};
    padding: 0.75rem;
    vertical-align: top;
    vertical-align: bottom;
`;

const TableBody = styled.tbody`
    border-top: 2px solid #dee2e6;
`;

const TableRow = styled.tr``;


const FloatRight = styled.div`
    margin-left: auto;
    margin-right: 3rem;
`;

const StyledPaginateContainer = styled.div`
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

const CollectionDetail = () => {
    const { id } = useParams();
    const [collection, setCollection] = useState({});
    const [APIdata, setAPIdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(-1);
    const itemsPerPage = 5;
    const [change, setChange] = useState(false);
    const [search, setSearch] = useState(''); //search filter
    const [status, setStatus] = useState('0'); //status filter

    useEffect(() => {
        const url = "collection/" + id;

        const fetchCollection = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setCollection(json.Data);
            } catch (error) { }
        };
        fetchCollection();
    }, [id]);

    useEffect(() => {  //fetch api data
        const url = "collection/" + id + "/products";

        const fetchData = async () => {
            try {
                const res = await fetch(publicRequest(url), { method: 'GET' });
                const json = await res.json();
                await setAPIdata(json.Data);
            } catch (error) { }
        };
        fetchData();
    }, [id, change]);

    useEffect(() => {   //filter based on 'search' & 'status'
        const result = APIdata.filter((item) => {
            if (status !== '0') {
                return [item.ProductName, item.ProductType, item.DefaultPrice].join('').toLowerCase().includes(search.toLowerCase())
                    && item.Status === parseInt(status)
            } else {
                return [item.ProductName, item.ProductType, item.DefaultPrice].join('').toLowerCase().includes(search.toLowerCase())
            }
        })
        setFilteredData(result);
    }, [search, status, APIdata]);

    useEffect(() => {   //paging
        const paging = async () => {
            try {
                const endOffset = await (itemOffset + itemsPerPage);
                await setCurrentItems(filteredData.slice(itemOffset, endOffset));
                await setPageCount(Math.ceil(filteredData.length / itemsPerPage));
            } catch (error) { }
        };
        paging();
    }, [filteredData, itemOffset]);

    useEffect(() => {   //set active page
        if (currentItems.length === 0) {
            if (itemOffset >= 5) {
                setItemOffset(itemOffset - 5);
                setCurrentPage(filteredData.length / itemsPerPage - 1);
            }
        }
    }, [currentItems]);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % filteredData.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected);
    };

    const handleSearch = (searchValue, statusValue) => {
        setSearch(searchValue);
        setStatus(statusValue);
        setItemOffset(0);   //back to page 1
        setCurrentPage(0);
    }

    const handleDeleteItem = (id) => {
        const url = "product/delete/base/" + id;
        const deleteData = async () => {
            try {
                await fetch(publicRequest(url), { method: 'PUT' });
                await setChange(!change);
            } catch (error) { }
        };
        deleteData();
    };

    return (
        <div>
            <Title><StyledLink to={"/collections"}>Bộ sưu tập</StyledLink> / {collection.CollectionName}</Title>

            <TableWrapper>
                <Row>
                    <ButtonWrapper>
                        <Input placeholder="Search sản phẩm" onChange={(event) => handleSearch(event.target.value, status)} />
                        <Button>Clear</Button>
                    </ButtonWrapper>

                    <SelectWrapper>
                        <Select value={status} onChange={(event) => handleSearch(search, event.target.value)}>
                            <option value="0">--- Lọc trạng thái ---</option>
                            <option value="1004">Deleted</option>
                            <option value="1005">Verified</option>
                            <option value="1006">Unverified - Create</option>
                            <option value="1007">Unverified - Update</option>
                        </Select>
                    </SelectWrapper>
                </Row>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader width="10%" center>Hình ảnh</TableHeader>
                            <TableHeader width="25%">Tên sản phẩm</TableHeader>
                            <TableHeader width="15%">Loại</TableHeader>
                            <TableHeader width="10%" center>Giá</TableHeader>
                            <TableHeader width="15%" center>Trạng thái</TableHeader>
                            <TableHeader width="10%" center>Chỉnh sửa</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <ProductList currentItems={currentItems} handleDeleteItem={handleDeleteItem} />
                    </TableBody>
                </Table>

                <Row>
                    <FloatRight>
                        <StyledPaginateContainer>
                            <ReactPaginate
                                nextLabel="Next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
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
                                forcePage={currentPage}
                                renderOnZeroPageCount={null}
                            />
                        </StyledPaginateContainer>
                    </FloatRight>
                </Row>
            </TableWrapper>
        </div>
    )
}

export default CollectionDetail;