import React from 'react';
import styled from 'styled-components';
import * as Constant from '../../Constant';

const ContainerWrapper = styled.div`
    font-size: 14px;
    padding: 5px 15px;
    margin-left: 30px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    text-decoration: none;
    cursor: pointer;
    background-color: #fff;
    color: #404040;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.1);

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

const Image = styled.img`
    vertical-align: middle;
    width: 35px;
    height: 35px;
    border-radius: 50%;
`;

const ImageWrapper = styled.div`
    flex: 1;
    display: flex;
`;

const NameWrapper = styled.div`
    flex: 3;
    width: 1px; //constraint width
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
`;

const PriceWrapper = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
`;

const StatusWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`;

const Status = styled.span`
    display: inline-block;
    padding: 5px;
    font-size: 10px;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: #fff;
    background-color: ${props => props.active === "active" ? "#28a745"
        :
        props.active === "unverified" ? "#FF8800"
            :
            props.active === "deleted" ? "#dc3545"
                :
                "#dc3545"};
`;

const ProductItem = ({ item }) =>  {

    let activeCheck = '';
    switch (item.Product.Status) {
        case Constant.VERIFIED_PRODUCT:
            activeCheck = 'active';
            break;
        case Constant.REJECTED_PRODUCT:
            activeCheck = 'deleted';
            break;
        case Constant.UNVERIFIED_PRODUCT:
            activeCheck = 'unverified';
            break;
        default:
            activeCheck = 'inactive';
            break;
    }

    return (
        <ContainerWrapper>
            <ImageWrapper> <Image src={item.Product.Image} /> </ImageWrapper>
            <NameWrapper>{item.Product.ProductName}</NameWrapper>
            <PriceWrapper>{item.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</PriceWrapper>
            <StatusWrapper> <Status active={activeCheck} /> </StatusWrapper>
        </ContainerWrapper>
    )
}

export default ProductItem;