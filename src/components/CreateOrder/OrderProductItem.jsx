import React from 'react';
import styled from 'styled-components';
import { ShoppingCart } from '@mui/icons-material';

const ProductWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 140px;
    height: 270px;
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
    font-size: 18px;
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

const OrderProductItem = ({ item, handleGetDetailItem, AddItemToCart }) =>  {

    if (item === 0) {
        return null;
    }

    const handleSetDetailItem = (e) => {
        e.preventDefault();
        handleGetDetailItem(item.ProductId);
    }

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        AddItemToCart(item, 1);
    }

    return (
        <ProductWrapper>
            <div>
                <ImageWrapper>
                    <Image src={item.Product.Image} />
                </ImageWrapper>
                <Name>{item.Product.ProductName}</Name>
                <Price>{item.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}</Price>
            </div>

            <Button type="button" onClick={handleAddItemToCart}>
                <StyledShoppingCartIcon />
                Bỏ vào giỏ
            </Button>
        </ProductWrapper>
    )
}

export default OrderProductItem;