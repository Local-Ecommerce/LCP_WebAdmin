/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import StoreList from '../components/Store/StoreList';
import ReactPaginate from "react-paginate";
import { Search, ArrowRight, Store as StoreIcon, DoubleArrow } from '@mui/icons-material';
import { CircularProgress, Checkbox } from '@mui/material';
import { api } from "../RequestMethod";
import { List, AutoSizer } from 'react-virtualized';
import * as Constant from '../Constant';

import DetailModal from '../components/Store/DetailModal';

const PageWrapper = styled.div`
    margin: 50px 40px 50px ${props => props.toggle ? "370px" : "45px"};
    transition: 0.3s;
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

const ListWrapper = styled.div`
    border: 1px solid #d6d6d6;
    border-radius: 5px;
    width: 100%;
    min-height: 100px;
    height: auto;
    overflow: hidden;
    height: 85%;
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

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.start ? "flex-start" : "space-between"};
    margin-left: ${props => props.ml ? "10px" : "0px"};
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: ${props => props.mb ? "20px" : "0px"};
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

const Align = styled.div`
    display: flex;
    width: 70%;
    align-items: center;
`;

const AlignColumn = styled.div`
    display: flex;
    flex-direction: column;
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
    margin-right: ${props => props.mr ? "15px" : "0px"};
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

const NoItemWrapper = styled.div`
    height: auto;
    margin: 0 auto;
    text-align: center;
`;

const StyledStoreIcon = styled(StoreIcon)`
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

const Footer = styled.div`
    padding-top: 50px;
`;

const  Center = styled.div`
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    top: 45%;
`;

const Store = () => {
    const listRef = useRef();

    const [detailModal, setDetailModal] = useState(false);
    function toggleDetailModal() { setDetailModal(!detailModal); }
    const [detailItem, setDetailItem] = useState({ id: '' });

    const [displayAddress, setDisplayAddress] = useState(false);
    function toggleDisplayAddress() { setDisplayAddress(!displayAddress); listRef.current.recomputeRowHeights(); }

    const [displayApartment, setDisplayApartment] = useState(false);
    function toggleDisplayApartment() { setDisplayApartment(!displayApartment); };

    const [loading, setLoading] = useState(false);
    const [apartmentLoading, setApartmentLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('USER'));

    const [APIdata, setAPIdata] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [change, setChange] = useState(false);
    const [activeTab, setActiveTab] = useState(1);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(0);

    const sort = '-createddate';
    const [apartment, setApartment] = useState({ id: '', name: '', address: ''});
    const [storeTyping, setStoreTyping] = useState('');
    const [apartmentTyping, setApartmentTyping] = useState('');
    const [storeSearch, setStoreSearch] = useState('');
    const [apartmentSearch, setApartmentSearch] = useState('');
    const [status, setStatus] = useState(Constant.VERIFIED_MERCHANT_STORE);

    useEffect( () => {  //fetch api data
        if (apartment.id !== '') {
            setLoading(true);
            let url = "stores" 
                    + "?limit=" + limit 
                    + "&page=" + (page + 1) 
                    + "&sort=" + sort 
                    + "&include=apartment&include=resident"
                    + (storeSearch !== '' ? ("&search=" + storeSearch) : '') 
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
    }, [change, limit, page, sort, status, storeSearch, apartment]);

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
            toggleDisplayApartment();
        } else if (user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
            setApartment({ id: user.Residents[0].ApartmentId, name: '', address: '' });
        }
    }, [change, apartmentSearch]);

    useEffect(() => {   //timer when search apartment
        const timeOutId = setTimeout(() => setApartmentSearch(apartmentTyping), 500);
        return () => clearTimeout(timeOutId);
    }, [apartmentTyping]);

    useEffect(() => {   //timer when search store
        const timeOutId = setTimeout(() => setStoreSearch(storeTyping), 500);
        return () => clearTimeout(timeOutId);
    }, [storeTyping]);

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    const handleSelectApartment = (id, name, address) => {
        setApartment({id: id, name: name, address: address});
    }

    const clearApartmentSearch = () => {
        setApartmentTyping('');
        document.getElementById("apartmentSearch").value = '';
    }

    const clearStoreSearch = () => {
        setStoreTyping('');
        setPage(0);
        document.getElementById("storeSearch").value = '';
    }

    function handleSetApartmentSearch(e) {
        const { value } = e.target;
        setApartmentTyping(value);
    }

    function handleSetStoreSearch(e) {
        const { value } = e.target;
        setStoreTyping(value);
        setPage(0);
    }

    function handleSetLimit(e) {
        const { value } = e.target;
        setLimit(value);
        setPage(0);
    }

    function handleSwitchTab(value) {
        setActiveTab(value);
        if (value === 1) {
            setStatus(Constant.VERIFIED_MERCHANT_STORE);
        } else {
            setStatus(Constant.UNVERIFIED_MERCHANT_STORE);
        }
        setPage(0);
    }

    const handleGetDetailItem = (id) => {
        setDetailItem({ id: id });
        toggleDetailModal();
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
            {
                user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager" ?
                <Row ml start>
                    <Tab active={activeTab === 1 ? true : false} onClick={() => handleSwitchTab(1)}>Cửa hàng</Tab>
                    <Tab active={activeTab === 2 ? true : false} onClick={() => handleSwitchTab(2)}>Cửa hàng chờ duyệt</Tab>
                </Row> 
                :
                <Title>
                    <Row>
                    Cửa hàng&nbsp;
                    <small>{apartment.name !== '' ? apartment.name : null}
                        {apartment.address !== '' ? " - " + apartment.address : null}</small>
                    </Row>
                </Title>
            }
                
            <TableWrapper>
                {
                apartment.id === '' ?
                <NoItemWrapper>
                    <StyledStoreIcon />

                    <NoItemText>
                        Chọn chung cư để xem các cửa hàng thuộc quản lí của chung cư.
                    </NoItemText>
                </NoItemWrapper>
                :
                <>
                    <Row mb>
                        <SearchBar>
                            <StyledSearchIcon />
                            <Input id="search" placeholder="Tìm kiếm cửa hàng" onChange={handleSetStoreSearch} />
                            <Button onClick={() => clearStoreSearch()}>Clear</Button>
                        </SearchBar>

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
                                <TableHeader width="57%">Tên cửa hàng</TableHeader>
                                <TableHeader width="20%" center>Quản lý</TableHeader>
                                <TableHeader width="20%" center>Trạng thái</TableHeader>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {
                            loading ? 
                            <tr>
                                <TableData center colSpan={100}> <CircularProgress /> </TableData>
                            </tr>
                            : 
                            <StoreList 
                                currentItems={APIdata}
                                handleGetDetailItem={handleGetDetailItem}
                            />
                            }
                        </TableBody>
                    </Table>

                    <Row mt>
                        { 
                        loading || APIdata.length === 0 ? null
                        : <small>Hiển thị {page * limit + 1} - {page * limit + APIdata.length} trong tổng số {total} cửa hàng.</small> 
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

            <DetailModal 
                display={detailModal}
                toggle={toggleDetailModal}
                detailItem={detailItem}
            />
        </PageWrapper>
        </>
    )
}

export default Store;