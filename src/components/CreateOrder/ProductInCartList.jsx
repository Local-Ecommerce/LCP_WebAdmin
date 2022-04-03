import React from 'react';
import styled from 'styled-components';
import ProductInCartItem from './ProductInCartItem';

const CartWrapper = styled.div`
    margin: 0 20px;
`;

const TotalPriceWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 30px 40px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.spacebetween ? "space-between" : null};
    margin-top: ${props => props.mt ? "20px" : null};
    margin-bottom: ${props => props.mb ? "5px" : null};
`;

const TotalPriceLabel = styled.div`
    font-size: 13px;
    color: ${props => props.theme.grey};
    margin-right: 15px;
`;

const TotalPriceText = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

const ProductInCartList = ({ currentItems, handleChangeQuantity }) => {

    if (currentItems.length === 0) {
        return <ProductInCartItem item={0} />
    }

    let totalAmount = 0;
    currentItems.forEach(item => {
        totalAmount = totalAmount + item.Price * item.Quantity
    })

    return (
        <CartWrapper>
            {currentItems && currentItems.map((item, index) => {
                return (
                    <ProductInCartItem
                        item={item} key={index}
                        handleChangeQuantity={handleChangeQuantity}
                    />
                )
            })}

            <TotalPriceWrapper>
                <Row>
                    <TotalPriceLabel>Tổng cộng</TotalPriceLabel>
                    <TotalPriceText>{totalAmount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</TotalPriceText>
                </Row>
            </TotalPriceWrapper>
        </CartWrapper>
    );
}

export default ProductInCartList;