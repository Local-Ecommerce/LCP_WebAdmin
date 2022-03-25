import React from 'react';
import styled from 'styled-components';
import * as Constant from '../../Constant';

const TableRow = styled.tr`
    &:hover {
        background-color: #F5F5F5;
        cursor: pointer;
    }
`;

const TableData = styled.td`
    padding: 8px 16px;
    vertical-align: top;
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    font-size: 15px;
    color: ${props => props.grey ? props.theme.grey : null};

    height: 30px;
`;

const Image = styled.img`
    vertical-align: middle;
    width: 35px;
    height: 35px;
    border-radius: 50%;
`;

const Status = styled.span`
    display: inline-block;
    padding: 3px 5px;
    font-size: 11px;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: ${props => props.active === "inactive" ? "grey" : "#fff"};
    background-color: ${props => props.active === "active" ? "#28a745"
        :
        props.active === "unverified" ? "#FF8800"
            :
            props.active === "deleted" ? "#dc3545"
                :
                "#dc3545"};
`;

const ProductItem = ({ item, index, search, status }) =>  {

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={100} >
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </tr>
        )
    }

    if (status === '') {
        if (!item.Product.ProductName.includes(search)) {
            return null;
        }
    } else {
        if (!item.Product.ProductName.includes(search) || item.Product.Status.toString() !== status.toString()) {
            return null;
        }
    }

    let activeCheck = '';
    let activeLabel = '';
    switch (item.Product.Status) {
        case Constant.VERIFIED_PRODUCT:
            activeCheck = 'active';
            activeLabel = 'Hoạt động';
            break;
        case Constant.REJECTED_PRODUCT:
            activeCheck = 'deleted';
            activeLabel = 'Từ chối';
            break;
        case Constant.UNVERIFIED_PRODUCT:
            activeCheck = 'unverified';
            activeLabel = 'Chờ duyệt';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS';
            break;
    }

    return (
        <TableRow>
            <TableData center> <Image src={item.Product.Image} /> </TableData>
            <TableData>{item.Product.ProductName}</TableData>
            <TableData center>{item.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</TableData>
            <TableData center> <Status active={activeCheck}>{activeLabel}</Status> </TableData>
        </TableRow>
    )
}

export default ProductItem;