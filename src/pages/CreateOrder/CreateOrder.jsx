import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from "../../RequestMethod";
import { toast } from 'react-toastify';
import { Search } from '@mui/icons-material';
import { TextField as MuiTextField, Autocomplete, Box, FormControlLabel, Checkbox } from '@mui/material';
import * as Constant from '../../Constant';

const PageWrapper = styled.div`
    width: 720px;
    margin: 40px auto;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px 15px ${props => props.mb0 ? "-5px" : "15px"} 15px;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
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

const ProductWrapper = styled.div`
    padding: 20px;
`;

const CreateOrder = () => {
    const user = JSON.parse(localStorage.getItem('USER'));

    const [manual, setManual] = useState(false);
    const [loading, setLoading] = useState(false);

    const [autocomplete, setAutocomplete] = useState([]);
    const [input, setInput] = useState({ name: '', phone: '', address: '', otp: '' });
    const [error, setError] = useState({ name: '', phone: '', address: '', otp: '' });

    const [change, setChange] = useState(false);
    const [search, setSearch] = useState('');
    const [typing, setTyping] = useState('');

    useEffect (() => {
        if (user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
            const fetchData = () => {
                api.get("residents?status=" + Constant.VERIFIED_RESIDENT + "&apartmentid=" + user.Residents[0].ApartmentId)
                .then(function (res) {
                    setAutocomplete(res.data.Data.List);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            fetchData();
        }
    }, []);

    useEffect(() => {   //timer when search apartment
        const timeOutId = setTimeout(() => setSearch(typing), 500);
        return () => clearTimeout(timeOutId);
    }, [typing]);

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        setError(error => ({ ...error, [name]: '' }));
    }

    useEffect(() => {
        console.log(input)
    },[input])

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

    return (
        <PageWrapper>
            <Title>Tạo đơn</Title>

            <form id="form">
                <ContainerWrapper>
                    <HeaderWrapper>
                        <Row>
                            <Header>Thông tin người đặt đơn</Header>

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
                                <HelperText>Chọn <b>chưa có tài khoản</b> để điền thủ công thông tin người đặt đơn</HelperText>
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
                        <Header>Sản phẩm</Header>
                    </HeaderWrapper>

                    <ProductWrapper>
                        <SearchBar width="100%">
                            <StyledSearchIcon />
                            <Input id="search" placeholder="Tìm sản phẩm" onChange={handleSetSearch} />
                            <ClearButton onClick={() => clearSearch()}>Clear</ClearButton>
                        </SearchBar>
                    </ProductWrapper>
                </ContainerWrapper>

                <FooterWrapper>
                    <FloatRight>
                        <Button>Tạo</Button>
                    </FloatRight>
                </FooterWrapper>
            </form>
        </PageWrapper>
    )
}

export default CreateOrder;