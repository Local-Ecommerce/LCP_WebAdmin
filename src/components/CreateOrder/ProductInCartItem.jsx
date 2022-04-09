/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from "../../RequestMethod";
import { HideImage, Close, Add, Remove } from '@mui/icons-material';

const ContainerWrapper = styled.div`
    font-size: 14px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dee2e6;
    text-decoration: none;
    cursor: pointer;
    background-color: #fff;

    &:hover {
    opacity: 0.9;
    background-color: #F5F5F5;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const Flex3Wrapper = styled.div`
    flex: 2.5;
    margin: 0px 10px;
`;

const Flex1Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    vertical-align: middle;
    width: 60px;
    height: 60px;
    border-radius: 3px;
`;

const StyledNoImageIcon = styled(HideImage)`
    && {
        color: ${props => props.theme.grey};
        font-size: 20px;
        padding: 20px;
        border-radius: 3px;
        border: 1px solid rgba(0,0,0,0.2);
    }
`;

const Category = styled.div`
    font-size: 14px;
    color: ${props => props.theme.grey};
`;

const Name = styled.div`
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const Quantity = styled.div`
    width: 20px;
    padding: 3px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    font-size: 14px;
    background-color: ${props => props.theme.white};
    text-align: center;
`;

const Price = styled.div`
    font-size: 14px;
    font-weight: 600;
`;

const Button = styled.button`
    padding: 3px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: grey;

    &:focus {
    outline: none;
    }
`;

const StyledAddIcon = styled(Add)`
    && {
        font-size: 14px;
        color: ${props => props.theme.dark};
        padding: 5px;
        background-color: rgba(0,0,0,0.2);
        opacity: 0.8;
    }

    &:hover {
        opacity: 1;
        color: ${props => props.theme.black};
    }
`;

const StyledRemoveIcon = styled(Remove)`
    && {
        font-size: 14px;
        color: ${props => props.theme.dark};
        padding: 5px;
        background-color: rgba(0,0,0,0.2);
        opacity: 0.8;
    }

    &:hover {
        opacity: 1;
        color: ${props => props.theme.black};
    }
`;

const StyledCloseIcon = styled(Close)`
    && {
        font-size: 22px;
        color: grey;
        opacity: 0.5;
    }

    &:hover {
    opacity: 1;
    }
`;

const ProductInCartItem = ({ item, handleChangeQuantity, RemoveItemFromCart }) =>  {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (item !== 0) {
            const fetchData = () => {
                api.get("categories?id=" + item.SystemCategoryId + "&include=parent")
                .then(function (res) {
                    setCategoryName(res.data.Data.List[0].SysCategoryName);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            fetchData();
        }
    }, [])
    
    if (item === 0) {
        return null;
    }

    const handleAddQuantity = (e) => {
        e.preventDefault();
        handleChangeQuantity(item.ProductId, item.Quantity + 1);
    }

    const handleRemoveQuantity = (e) => {
        e.preventDefault();
        if (item.Quantity > 1) {
            handleChangeQuantity(item.ProductId, item.Quantity - 1);
        }
    }

    const handleRemoveItemFromCart = (e) => {
        e.preventDefault();
        RemoveItemFromCart(item.ProductId);
    }

    return (
        <ContainerWrapper>
            {
                item.Image ?
                <Image src={item.Image ? item.Image.split("|")[0] : ''} />
                : <StyledNoImageIcon />
            }

            <Flex3Wrapper>
                <Category>{categoryName}</Category>
                <Name>{item.ProductName}</Name>
            </Flex3Wrapper>

            <Flex1Wrapper>
                <Price>{(item.DefaultPrice * item.Quantity).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</Price>
                
                <Flex>
                    <StyledRemoveIcon onClick={handleRemoveQuantity} />
                    <Quantity>{item.Quantity}</Quantity>
                    <StyledAddIcon onClick={handleAddQuantity} />
                </Flex>
            </Flex1Wrapper>

            <Button type="button" onClick={handleRemoveItemFromCart}>
                <StyledCloseIcon />
            </Button>
        </ContainerWrapper>
    )
}

export default ProductInCartItem;