import React from 'react';
import styled from 'styled-components';
import OrderProductItem from './OrderProductItem';

const ProductListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 20px;
`;

const OrderProductList = ({ currentItems, handleGetDetailItem, AddItemToCart }) => {

    if (currentItems.length === 0) {
        return <OrderProductItem item={0} />
    }

    return (
        <ProductListWrapper>
            {
                currentItems && currentItems.map((item, index) => {
                    return (
                        <OrderProductItem
                            item={item} index={index} key={index}
                            handleGetDetailItem={handleGetDetailItem}
                            AddItemToCart={AddItemToCart}
                        />
                    )
                })
            }
        </ProductListWrapper>
    )
    ;
}

export default OrderProductList;