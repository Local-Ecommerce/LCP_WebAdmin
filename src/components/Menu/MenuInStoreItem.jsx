/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from "../../RequestMethod";
import { ArrowDropUp, ArrowDropDown} from '@mui/icons-material';
import * as Constant from '../../Constant';

import ProductInMenuList from '../Menu/ProductInMenuList';

const ContainerWrapper = styled.div`
    font-size: 15px;
    padding: 18px 20px;
    margin-bottom: ${props => props.dropdown ? "0px" : "10px"};
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    text-decoration: none;
    cursor: pointer;
    background-color: ${props => props.theme.white};
    color: #404040;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0.2);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

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

const NameWrapper = styled.div`
    flex: 3;
    width: 1px; //constraint width
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
`;

const TimeWrapper = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
`;

const RepeatDateWrapper = styled.div`
    flex: 3;
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
    padding: 3px 5px;
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

const DaySpan = styled.span`
    display: inline-block;
    padding: 4px;
    font-size: 0.8em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: ${props => props.green ? props.theme.green : props.theme.disabled};
`;

const DropdownIcon = styled(ArrowDropDown)`
    && {
        margin-left: 10px;
        font-size: 22px;
    }
`;

const DropupIcon = styled(ArrowDropUp)`
    && {
        margin-left: 10px;
        font-size: 22px;
    }
`;

const ProductWrapper = styled.div`
    margin-top: -10px;
    margin-bottom: 15px;
`;

const MenuInStoreItem = ({ item, menuId }) =>  {
    const [products, setProducts] = useState([]);

    const [dropdown, setDropdown] = useState(menuId === item.MenuId ? true : false);
    const toggleDropdown = () => { setDropdown(!dropdown) };

    useEffect(() => {
        const fetchData = () => {
            
            let url = "menu-products" 
            + "?menuid=" + item.MenuId
            + "&status=" + Constant.ACTIVE_PRODUCT_IN_MENU
            + "&include=product";
            api.get(url)
            .then(function (res) {
                setProducts(res.data.Data.map((item) => ({ 
                    ...item, 
                    Price: item.Price.toString().replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    RelatedProductInMenu: item.RelatedProductInMenu.map((related) => ({
                        ...related,
                        Price: related.Price.toString().replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }))
                })));
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        fetchData();
    }, []);

    let activeCheck = '';
    let activeLabel = '';
    switch (item.Status) {
        case Constant.ACTIVE_MENU:
            activeCheck = 'active';
            activeLabel = 'Hoạt động';
            break;
        case Constant.INACTIVE_MENU:
            activeCheck = 'inactive';
            activeLabel = 'Ngừng';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
    }

    return (
        <>
            <ContainerWrapper dropdown={item.ProductInMenus.length && dropdown} onClick={toggleDropdown}>
                <NameWrapper> 
                    {item.MenuName} 
                    {
                        item.ProductInMenus.length && dropdown ?
                        <DropupIcon />
                        : item.ProductInMenus.length && !dropdown ?
                        <DropdownIcon />
                        : null
                    }
                </NameWrapper>

                <TimeWrapper>
                    {
                        item.TimeStart === '00:00:00' && item.TimeEnd === '23:59:59' ?
                        "00:00 - 24:00" :
                        item.TimeStart.slice(0,5) + " - " + item.TimeEnd.slice(0,5)
                    }
                </TimeWrapper>

                <RepeatDateWrapper>
                    {item.RepeatDate.includes('1') ? <DaySpan green>2</DaySpan> : <DaySpan>2</DaySpan>}
                    {item.RepeatDate.includes('2') ? <DaySpan green>3</DaySpan> : <DaySpan>3</DaySpan>}
                    {item.RepeatDate.includes('3') ? <DaySpan green>4</DaySpan> : <DaySpan>4</DaySpan>}
                    {item.RepeatDate.includes('4') ? <DaySpan green>5</DaySpan> : <DaySpan>5</DaySpan>}
                    {item.RepeatDate.includes('5') ? <DaySpan green>6</DaySpan> : <DaySpan>6</DaySpan>}
                    {item.RepeatDate.includes('6') ? <DaySpan green>7</DaySpan> : <DaySpan>7</DaySpan>}
                    {item.RepeatDate.includes('0') ? <DaySpan green>CN</DaySpan> : <DaySpan>CN</DaySpan>}
                </RepeatDateWrapper>

                <StatusWrapper>
                    <Status active={activeCheck}>{activeLabel}</Status>
                </StatusWrapper>
            </ContainerWrapper>

            {
                products.length && dropdown ? 
                <ProductWrapper>
                    <ProductInMenuList currentItems={products} />
                </ProductWrapper>
                : null
            }
        </>
    )
}

export default MenuInStoreItem;