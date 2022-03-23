/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';
import ProductInMenuList from '../Product/ProductInMenuList';
import * as Constant from '../../Constant';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 20px;
    max-height: 60vh;
    overflow: auto;
    overflow-x: hidden;
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ModalButton = styled.button`
    padding: 8px 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
    border-radius: 6px;
    text-align: center;
    font-size: 14px;
    display: inline-flex;
    align-items: center;

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

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '30%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const DetailModal = ({ display, toggle, detailItem }) => {
    const [menu, setMenu] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (display) {
            setLoading(true);
            const fetchData = async () => {
                api.get("menus?id=" + detailItem.id + "&include=product")
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        setMenu(res.data.Data.List[0]);
                        setProducts(res.data.Data.List[0].ProductInMenus);
                        setLoading(false);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false);
                });
            };
            fetchData();
        }
    }, [display]);

    function handleSetSearch(e) {
        const { value } = e.target;
        setSearch(value);
    }

    const clearSearch = () => {
        setSearch('');
        document.getElementById("search").value = '';
    }

    function handleSetStatus(e) {
        const { value } = e.target;
        setStatus(value);
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>

            <ModalContentWrapper>
                <Row mb>
                    <SearchBar>
                        <StyledSearchIcon />
                        <Input id="search" placeholder="Tìm kiếm sản phẩm" onChange={handleSetSearch} />
                        <Button type="button" onClick={clearSearch}>Xóa</Button>
                    </SearchBar>

                    <Align>
                        <small>Trạng thái:&nbsp;</small>
                        <DropdownWrapper width="16%">
                            <Select value={status} onChange={handleSetStatus}>
                            <option value={''}>Toàn bộ</option>
                                <option value={Constant.VERIFIED_PRODUCT}>Hoạt động</option>
                                <option value={Constant.REJECTED_PRODUCT}>Từ chối</option>
                                <option value={Constant.UNVERIFIED_PRODUCT}>Chờ xác thực</option>
                            </Select>
                        </DropdownWrapper>
                    </Align>
                </Row>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader width="7%" center>Ảnh</TableHeader>
                            <TableHeader width="53%">Tên sản phẩm</TableHeader>
                            <TableHeader width="20%" center>Giá</TableHeader>
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
                            <ProductInMenuList 
                                currentItems={products}
                                search={search}
                                status={status}
                            />
                        }
                    </TableBody>
                </Table>
            </ModalContentWrapper>

            <ModalButtonWrapper>
                <small>{products.length} sản phẩm thuộc {menu.MenuName}</small>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default DetailModal;