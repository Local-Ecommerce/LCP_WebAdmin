import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import * as Constant from '../../Constant';

const ContainerWrapper = styled.div`
    font-size: 14px;
    padding: 10px 0;
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
    opacity: ${props => props.disabled ? "0" : null};
    justify-content: center;
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
    opacity: ${props => props.disabled ? "0" : null};
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

const StyledDropdownIcon = styled(ArrowDropDown)`
    && {
        margin-left: 5px;
        font-size: 20px;
    }
`;

const StyledDropupIcon = styled(ArrowDropUp)`
    && {
        margin-left: 5px;
        font-size: 20px;
    }
`;

const ProductInMenuItem = ({ item }) =>  {
    const [dropdown, setDropdown] = useState(false);
    const toggleDropdown = () => { setDropdown(!dropdown) };

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
        <>
            <ContainerWrapper onClick={toggleDropdown}>
                <ImageWrapper> <Image src={item.Product.Image} /> </ImageWrapper>

                <NameWrapper>
                    {item.Product.ProductName}
                    {
                        item.RelatedProductInMenu.length && !dropdown ?
                        <StyledDropdownIcon />
                        : item.RelatedProductInMenu.length && dropdown ?
                        <StyledDropupIcon />
                        : null
                    }
                </NameWrapper>

                <PriceWrapper>{item.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</PriceWrapper>
                <StatusWrapper> <Status active={activeCheck} /> </StatusWrapper>
            </ContainerWrapper>

            {
                item.RelatedProductInMenu && dropdown ?
                <>
                    {item.RelatedProductInMenu.map((related, index2) => {
                        return <ContainerWrapper key={index2}>
                            <ImageWrapper disabled> <Image src={related.Product.Image} /> </ImageWrapper>

                            <NameWrapper>
                                {related.Product.Color ? related.Product.Color : ''}
                                {related.Product.Color && (related.Product.Size || related.Product.Weight) ? " / " : ''}
                                {related.Product.Size ? related.Product.Size : ''}
                                {related.Product.Size && related.Product.Weight ? " / " : ''}
                                {related.Product.Weight ? related.Product.Weight + " kg" : ''}
                            </NameWrapper>

                            <PriceWrapper>{related.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</PriceWrapper>
                            <StatusWrapper disabled> <Status active={activeCheck} /> </StatusWrapper>
                        </ContainerWrapper>
                    })}
                </>
                : null
            }
        </>
    )
}

export default ProductInMenuItem;