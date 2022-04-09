/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ShoppingCart } from '@mui/icons-material';

const ProductWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 124px;
    height: 260px;
    margin: 10px;
    padding: 10px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.50);
    cursor: pointer;

    &:hover {
        box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 1);
    }
`;

const ImageWrapper = styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;
`;

const Image = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

const Name = styled.div`
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-top: 10px;
`;

const Price = styled.div`
    font-weight: 600;
    font-size: 16px;
    margin-top: 10px;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 15px 5px 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
        background-color: ${props => props.theme.hover};
        color: ${props => props.theme.black};
    }

    &:focus {
        outline: 0;
    }

    &:active {
        transform: translateY(1px);
    }
`;

const StyledShoppingCartIcon = styled(ShoppingCart)`
    && {
        font-size: 20px;
        margin-right: 5px;
    }
`;

const OrderProductItem = ({ item, handleGetDetailItem }) =>  {
    const [prices, setPrices] = useState([]);
    
    useEffect(() => {
        if (item.RelatedProducts.length > 0) {
            setPrices(item.RelatedProducts.map((item) => (item.DefaultPrice)));
        } else {
            setPrices([item.DefaultPrice]);
        }
    }, [])

    if (item === 0) {
        return null;
    }

    const handleSetDetailItem = (e) => {
        e.preventDefault();
        handleGetDetailItem(item);
    }

    return (
        <ProductWrapper onClick={handleSetDetailItem}>
            <div>
                <ImageWrapper>
                    <Image src={item.Image} />
                </ImageWrapper>
                <Name>{item.ProductName}</Name>
                {
                    prices.length === 1 || (prices.length > 1 && Math.min(...prices) === Math.max(...prices)) ?
                    <Price>{prices[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}</Price>
                    : prices.length > 1 ?
                    <Price>
                        {Math.min(...prices).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ - "} 
                        {Math.max(...prices).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}
                    </Price>
                    : null
                }
            </div>

            <Button type="button">
                <StyledShoppingCartIcon />
                Bỏ vào giỏ
            </Button>
        </ProductWrapper>
    )
}

export default OrderProductItem;