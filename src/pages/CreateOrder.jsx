/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import useClickOutside from "../contexts/useClickOutside";
import { Search, ArrowDropDown, ShoppingCart, ArrowRight } from '@mui/icons-material';
import { TextField as MuiTextField, Autocomplete, Box, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import * as Constant from '../Constant';

import OrderProductList from '../components/CreateOrder/OrderProductList';
import ProductInCartList from '../components/CreateOrder/ProductInCartList';
import DetailProductModal from '../components/CreateOrder/DetailProductModal';
import ConfirmModal from '../components/CreateOrder/ConfirmModal';

const PageWrapper = styled.div`
    min-width: 720px;
    max-width: 1200px;
    margin: 60px auto;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

const LeftWrapper = styled.div`
    flex: 3;
    margin-right: 30px;
`;

const RightWrapper = styled.div`
    flex: 2;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-top: ${props => props.mt ? "20px" : null};
`;

const ContainerWrapper = styled.div`
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const HeaderWrapper = styled.div`
    padding-left: 20px;
    border-bottom: 1px solid #D8D8D8;
`;

const Header = styled.div`
    font-weight: 600;
    padding: 20px 0;
`;

const TextFieldWrapper = styled.div`
    padding: ${props => props.mb0 ? "20px 20px 0px 20px" : "20px"};
`;

const FooterWrapper = styled.div`
    border-top: 1px solid #d6d6d6;
    padding-top: 20px;
    height: 100px;
`;

const FloatRight = styled.div`
    float: right;
`;

const Button = styled.button`
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    background-color: ${props => props.disabled ? props.theme.disabled : props.theme.blue};
    color: white;
    font-weight: 600;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const FieldLabel = styled.div`
    font-weight: 400;
    font-size: 14px;
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: 10px;
    color: ${props => props.theme.dark};
`;

const TextField = styled.input`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px 14px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;

    &:disabled {
        color: ${props => props.theme.black};
    }
`;

const HelperText = styled.span`
    font-size: 13px;
    padding: 5px;
    color: ${props => props.error ? props.theme.red : props.theme.grey};
`;

const StyledFormControlLabel = styled(FormControlLabel)`
    && {
        margin-right: 15px;
    }
`;

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const SearchBar = styled.div`
    display: flex;
    width: 53%;
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

const ClearButton = styled.button`
    height: 36px;
    width: 60px;
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

const SelectWrapper = styled.div`
    width: 200px;
    margin-right: 10px;
    display: inline-block;
    background-color: ${props => props.theme.white};
    border-radius: 5px;
    border: 1px solid ${props => props.theme.greyBorder};
    transition: all .5s ease;
    position: relative;
    font-size: 14px;
    color: ${props => props.theme.black};
    text-align: left;

    &:hover {
        box-shadow: 0 0 4px rgb(204, 204, 204);
        border-radius: 2px 2px 0 0;
    }

    &:active {
        box-shadow: 0 0 4px rgb(204, 204, 204);
        border-radius: 2px 2px 0 0;
    }
`;

const Select = styled.div`
    cursor: pointer;
    display: flex;
    padding: 8px 10px 8px 15px;
    justify-content: space-between;
    align-items: center;
`;

const DropdownLv1Menu = styled.ul`
    position: absolute;
    background-color: #fff;
    width: 100%;
    left: 0;
    margin-top: 1px;
    box-shadow: 0 1px 2px rgb(204, 204, 204);
    border-radius: 0 1px 2px 2px;
    overflow: hidden;
    display: ${props => props.lv1CateDropdown === true ? "" : "none"};
    max-height: 500px;
    overflow-y: auto;
    z-index: 9;
    padding: 0;
    list-style: none;
`;

const DropdownLv2Menu = styled.ul`
    position: absolute;
    background-color: #fff;
    width: 100%;
    right: -200px;
    margin-top: 1px;
    box-shadow: 0 1px 2px rgb(204, 204, 204);
    border-radius: 0 1px 2px 2px;
    overflow: hidden;
    display: ${props => props.lv2CateDropdown === true ? "" : "none"};
    max-height: 500px;
    overflow-y: auto;
    z-index: 9;
    padding: 0;
    list-style: none;
`;

const DropdownLv3Menu = styled.ul`
    position: absolute;
    background-color: #fff;
    width: 100%;
    right: -400px;
    margin-top: 1px;
    box-shadow: 0 1px 2px rgb(204, 204, 204);
    border-radius: 0 1px 2px 2px;
    overflow: hidden;
    display: ${props => props.lv3CateDropdown === true ? "" : "none"};
    max-height: 500px;
    overflow-y: auto;
    z-index: 9;
    padding: 0;
    list-style: none;
`;

const DropdownList = styled.li`
    padding: 10px;
    height: 25px;
    transition: all .2s ease-in-out;
    cursor: pointer;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background-color: ${props => props.theme.hover};
    }
`;

const ProductWrapper = styled.div`
    padding: 20px;
`;

const NoItemWrapper = styled.div`
    height: auto;
    margin: 0 auto;
    text-align: center;
`;

const StyledNoProductIcon = styled(ShoppingCart)`
    && {
        margin-top: 50px;
        margin-bottom: 20px;
        font-size: 100px;
        color: #D8D8D8;
    }
`;

const StyledFirstSearchIcon = styled(Search)`
    && {
        margin-top: 170px;
        margin-bottom: 20px;
        font-size: 100px;
        color: #D8D8D8;
    }
`;

const NoProductText = styled.div`
    padding-bottom: 170px;
    text-decoration: none;
    font-size: 14px;
    color: ${props => props.theme.grey};
`;

const NoItemText = styled.div`
    padding-bottom: 50px;
    text-decoration: none;
    font-size: 14px;
    color: ${props => props.theme.grey};
`;

const Center = styled.div`
    margin: 30px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
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

const Align = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.div`
    margin-right: 10px;
    font-size: 13px;
`;

const CreateOrder = () => {
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('USER'));

    const [manual, setManual] = useState(false);
    const [loading, setLoading] = useState(false);

    const [confirmModal, setConfirmModal] = useState(false);
    const toggleConfirmModal = () => { setConfirmModal(!confirmModal); }
    const [detailProductModal, setDetailProductModal] = useState(false);
    const toggleDetailProductModal = () => { setDetailProductModal(!detailProductModal) };
    const [lv1CateDropdown, setLv1CateDropdown] = useState(false);
    const toggleLv1CateDropdown = () => { setLv1CateDropdown(!lv1CateDropdown); }
    const [lv2CateDropdown, setLv2CateDropdown] = useState(false);
    const [lv3CateDropdown, setLv3CateDropdown] = useState(false);
    const [sortDropdown, setSortDropdown] = useState(false);
    const toggleSortDropdown = () => { setSortDropdown(!sortDropdown); }

    const [lv1Categories, setLv1Categories] = useState([]);
    const [lv2Categories, setLv2Categories] = useState([]);
    const [lv3Categories, setLv3Categories] = useState([]);

    const [autocomplete, setAutocomplete] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const [detailItem, setDetailItem] = useState({});
    const [input, setInput] = useState({ residentId: '', name: '', phone: '', address: '' });
    const [error, setError] = useState({ name: '', phone: '', address: '' });

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState({id: '', name: 'Toàn bộ'});
    const [sort, setSort] = useState({value: '-createddate', name: 'Ngày tạo - mới nhất'});
    const [typing, setTyping] = useState('');

    const limit = 12;
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(0);

    useEffect (() => {
        if (user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
            const fetchData = () => {
                api.get("residents?status=" + Constant.VERIFIED_RESIDENT + "&apartmentid=" + user.Residents[0].ApartmentId)
                .then(function (res) {
                    setAutocomplete(res.data.Data.List);

                    const url2 = "categories" 
                        + "?sort=-syscategoryname" 
                        + "&status=" + Constant.ACTIVE_SYSTEM_CATEGORY;
                    api.get(url2)
                    .then(function (res2) {
                        setLv1Categories(res2.data.Data.List);
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            fetchData();
        }
    }, []);

    useEffect (() => {
        if ((search !== '' || category.id !== '') && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
            setLoading(true);
            const fetchData = () => {
                let url = "products" 
                + "?apartmentid=" + user.Residents[0].ApartmentId
                + "&include=related"
                + "&limit=" + limit
                + "&page=" + (page + 1)
                + "&status=" + Constant.VERIFIED_PRODUCT
                + "&search=" + search
                + "&sort=" + sort.value
                + (category.id !== '' ? "&categoryid=" + category.id : '');
                api.get(url)
                .then(function (res) {
                    setProducts(res.data.Data.List);
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
        } else {
            setProducts([]);
        }
    }, [search, page, sort, category]);

    useEffect(() => {   //timer when search apartment
        const timeOutId = setTimeout(() => setSearch(typing), 500);
        return () => clearTimeout(timeOutId);
    }, [typing]);

    let clickCateOutside = useClickOutside(() => {
        setLv1CateDropdown(false);
        setLv2CateDropdown(false);
        setLv3CateDropdown(false);
    });

    let clickSortOutside = useClickOutside(() => {
        setSortDropdown(false);
    });

    const handleSetSort = (value, name) => {
        setSort({value: value, name: name});
        toggleSortDropdown();
        setPage(0);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        setError(error => ({ ...error, [name]: '' }));
    }

    const AddItemToCart = (newItem, quantity) => {
        if (!cart.some(item => item.ProductId === newItem.ProductId)) {
            newItem.Quantity = quantity;
            setCart(cart => [...cart, newItem]);
        }
    }

    const RemoveItemFromCart = (id) => {
        setCart(cart.filter((item) => {
            return item.ProductId !== id
        }));
    }

    const handleChangeQuantity = (id, newQuantity) => {
        let index = cart.findIndex((item) => item.ProductId === id);
        let newArray = [...cart];
        newArray[index].Quantity = newQuantity;
        setCart(newArray);
    }

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    const handleSetManual = () => {
        setManual(!manual);
        setInput({ name: '', phone: '', address: '', otp: '' });
    }

    const clearSearch = () => {
        setTyping('');
        document.getElementById("search").value = '';
    }

    function handleSetSearch(e) {
        const { value } = e.target;
        setTyping(value);
    }

    const handleSetCategory = (id, name) => {
        setCategory({id: id, name: name});
        setLv1CateDropdown(false);
        setLv2CateDropdown(false);
        setLv3CateDropdown(false);
    }

    const handleGetLv2Category = (children) => {
        setLv2Categories(children);
        setLv2CateDropdown(true);
        setLv3CateDropdown(false);
    }

    const handleGetLv3Category = (children) => {
        setLv3Categories(children);
        setLv3CateDropdown(true);
    }

    const handleGetDetailItem = (item) => {
        setDetailItem(item);
        toggleDetailProductModal();
    }

    const handleCreateOrder = (event) => {
        event.preventDefault();
        const createOrder = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            const url = "orders";
            api.post(url, {
                residentId: input.residentId,
                name: input.name,
                phone: input.phone,
                address: input.address
            })
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toast.update(notification, { render: "Tạo đơn thành công!", type: "success", autoClose: 5000, isLoading: false });
                    navigate("/");
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        createOrder();
    }

    useEffect(() => {
        console.log(cart.map(item => {
            return { productId: item.ProductId, quantity : item.Quantity, discount: 0 }
        }))
    }, [cart])

    return (
        <PageWrapper>
            <FlexWrapper>
                <LeftWrapper>
                    <ContainerWrapper>
                        <HeaderWrapper>
                            <Header>Sản phẩm</Header>
                        </HeaderWrapper>

                        <ProductWrapper>
                            <Row>
                                <SearchBar>
                                    <StyledSearchIcon />
                                    <Input id="search" placeholder="Tìm sản phẩm" onChange={handleSetSearch} />
                                    <ClearButton onClick={() => clearSearch()}>Clear</ClearButton>
                                </SearchBar>

                                <Align>
                                    <Label>Sắp xếp:</Label>
                                    <SelectWrapper ref={clickSortOutside}>
                                        <Select onClick={toggleSortDropdown}>
                                            {sort.name}
                                            <ArrowDropDown />
                                        </Select>

                                        <DropdownLv1Menu lv1CateDropdown={sortDropdown}>
                                            <DropdownList onClick={() => handleSetSort('-createddate', 'Ngày tạo - mới nhất')}>Ngày tạo - mới nhất</DropdownList>
                                            <DropdownList onClick={() => handleSetSort('+createddate', 'Ngày tạo - cũ nhất')}>Ngày tạo - cũ nhất</DropdownList>
                                            <DropdownList onClick={() => handleSetSort('-defaultprice', 'Giá - từ cao đến thấp')}>Giá - từ cao đến thấp</DropdownList>
                                            <DropdownList onClick={() => handleSetSort('+defaultprice', 'Giá - từ thấp đến cao')}>Giá - từ thấp đến cao</DropdownList>
                                        </DropdownLv1Menu>
                                    </SelectWrapper>
                                </Align>
                            </Row>

                            <Row mt>
                                <div></div>
                                <Align>
                                    <Label>Danh mục:</Label>
                                    <SelectWrapper ref={clickCateOutside}>
                                        <Select onClick={toggleLv1CateDropdown}>
                                            {category.name}
                                            <ArrowDropDown />
                                        </Select>

                                        <DropdownLv1Menu lv1CateDropdown={lv1CateDropdown}>
                                            <DropdownList onClick={() => handleSetCategory('', 'Toàn bộ')}>Toàn bộ</DropdownList>
                                            {lv1Categories.map((category, index) => {
                                                return <div key={index}>
                                                    <DropdownList 
                                                        key={category.SystemCategoryId}
                                                        onClick={() => handleSetCategory(category.SystemCategoryId, category.SysCategoryName)}
                                                        onMouseEnter={() => handleGetLv2Category(category.Children)}
                                                    >
                                                        {category.SysCategoryName}
                                                        {
                                                            category.Children && category.Children.length ?
                                                            <ArrowRight />
                                                            : null
                                                        }
                                                    </DropdownList>
                                                </div>
                                            })}
                                        </DropdownLv1Menu>

                                        <DropdownLv2Menu lv2CateDropdown={lv2CateDropdown}>
                                            {lv2Categories.map((category, index) => {
                                                return <div key={index}>
                                                    <DropdownList 
                                                        key={category.SystemCategoryId}
                                                        onClick={() => handleSetCategory(category.SystemCategoryId, category.SysCategoryName)}
                                                        onMouseEnter={() => handleGetLv3Category(category.Children)}
                                                    >
                                                        {category.SysCategoryName}
                                                        {
                                                            category.Children && category.Children.length ?
                                                            <ArrowRight />
                                                            : null
                                                        }
                                                    </DropdownList>
                                                </div>
                                            })}
                                        </DropdownLv2Menu>

                                        <DropdownLv3Menu lv3CateDropdown={lv3CateDropdown}>
                                            {lv3Categories.map((category, index) => {
                                                return <div key={index}>
                                                    <DropdownList 
                                                        key={category.SystemCategoryId}
                                                        onClick={() => handleSetCategory(category.SystemCategoryId, category.SysCategoryName)}
                                                    >
                                                        {category.SysCategoryName}
                                                    </DropdownList>
                                                </div>
                                            })}
                                        </DropdownLv3Menu>
                                    </SelectWrapper>
                                </Align>
                            </Row>

                            {
                                loading ?
                                <Center>
                                    <CircularProgress />
                                </Center>
                                :
                                <>
                                    {
                                        products.length ?
                                        <>
                                            <OrderProductList
                                                currentItems={products}
                                                AddItemToCart={AddItemToCart}
                                                handleGetDetailItem={handleGetDetailItem}
                                            />

                                            <Row>
                                                <small>Hiển thị {page * limit + 1} - {page * limit + products.length} trong tổng số {total} sản phẩm.</small>
                                                
                                                {
                                                    detailProductModal ?
                                                    null :
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
                                                }
                                            </Row>
                                        </>
                                        : 
                                        <NoItemWrapper>
                                            <StyledFirstSearchIcon />
                
                                            <NoProductText>
                                                Vui lòng sử dụng thanh tìm kiếm để tìm sản phẩm.
                                            </NoProductText>
                                        </NoItemWrapper>
                                    }
                                </>
                            }
                        </ProductWrapper>
                    </ContainerWrapper>
                </LeftWrapper>

                <RightWrapper>
                    <ContainerWrapper>
                        <HeaderWrapper>
                            <Row>
                                <Header>Thông tin người đặt</Header>

                                <StyledFormControlLabel
                                    labelPlacement="start"
                                    style={{ pointerEvents: "none" }}
                                    control={
                                        <Checkbox
                                            checked={manual}
                                            onClick={handleSetManual}
                                            style={{ pointerEvents: "auto" }}
                                        />
                                    }
                                    label={<span style={{ fontSize: '14px' }} >Chưa có tài khoản</span>} 
                                />
                            </Row>
                        </HeaderWrapper>

                        <TextFieldWrapper mb0>

                            <Row spacebetween>
                                <FieldLabel>Tên</FieldLabel>
                                <HelperText ml0>{input.name.length}/250 kí tự</HelperText>
                            </Row>

                            {
                                manual ? 
                                <TextField
                                    maxLength={250}
                                    type="text" value={loading ? "Đang tải..." : input.name} name='name'
                                    onChange={handleChange}
                                    error={error.name !== ''}
                                />
                                :
                                <>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, value) => setInput(input => ({ ...input, 
                                            name: value.ResidentName, 
                                            phone: value.PhoneNumber || '',
                                            address: value.DeliveryAddress || '' 
                                        }))}
                                        selectOnFocus disablePortal
                                        getOptionLabel={(item) => item.ResidentName}
                                        options={autocomplete}
                                        renderOption={(props, item) => {
                                            return (
                                                <Box {...props} key={item.ResidentId}>
                                                    {item.ResidentName}&nbsp;
                                                    <small>{item.PhoneNumber ? "- " + item.PhoneNumber.slice(0, 4) + " " + item.PhoneNumber.slice(4, 7) + " " + item.PhoneNumber.slice(7) : ''}</small>
                                                </Box>
                                            ); 
                                        }}
                                        renderInput={(params) => <MuiTextField {...params} error={error.name !== ''} />}
                                    />
                                    <HelperText>Chọn <b>chưa có tài khoản</b> để điền thủ công.</HelperText>
                                </>
                            }
                            <HelperText error>{error.name}</HelperText>
                        </TextFieldWrapper>

                        <TextFieldWrapper mb0>
                            <Row spacebetween>
                                <FieldLabel>Số điện thoại</FieldLabel>
                                <HelperText ml0>{input.phone.length}/100 kí tự</HelperText>
                            </Row>

                            <TextField
                                maxLength={100} disabled={!manual}
                                type="text" value={loading ? "Đang tải..." : input.phone} name='phone'
                                onChange={handleChange}
                                error={error.phone !== ''}
                            />
                            <HelperText error>{error.phone}</HelperText>
                        </TextFieldWrapper>

                        <TextFieldWrapper>
                            <Row spacebetween>
                                <FieldLabel>Địa chỉ nhận hàng</FieldLabel>
                                <HelperText ml0>{input.address.length}/100 kí tự</HelperText>
                            </Row>

                            <TextField
                                maxLength={100} disabled={!manual}
                                type="text" value={loading ? "Đang tải..." : input.address} name='address'
                                onChange={handleChange}
                                error={error.address !== ''}
                            />
                            <HelperText error>{error.address}</HelperText>
                        </TextFieldWrapper>
                    </ContainerWrapper>

                    <ContainerWrapper>
                        <HeaderWrapper>
                            <Header>Giỏ hàng</Header>
                        </HeaderWrapper>

                        {
                            cart.length ?
                            <ProductInCartList 
                                currentItems={cart}
                                handleChangeQuantity={handleChangeQuantity}
                                RemoveItemFromCart={RemoveItemFromCart}
                            />
                            :
                            <NoItemWrapper>
                                <StyledNoProductIcon />

                                <NoItemText>
                                    Chưa có sản phẩm trong giỏ.
                                </NoItemText>
                            </NoItemWrapper>
                        }
                    </ContainerWrapper>
                </RightWrapper>
            </FlexWrapper>

            <FooterWrapper>
                <FloatRight>
                    <Button button="button" onClick={toggleConfirmModal}>
                        Tạo
                    </Button>
                </FloatRight>
            </FooterWrapper>

            <DetailProductModal 
                display={detailProductModal}
                toggle={toggleDetailProductModal} 
                detailItem={detailItem}
                AddItemToCart={AddItemToCart}
            />

            <ConfirmModal
                display={confirmModal} 
                toggle={toggleConfirmModal}
                handleCreateOrder={handleCreateOrder}
            />
        </PageWrapper>
    )
}

export default CreateOrder;