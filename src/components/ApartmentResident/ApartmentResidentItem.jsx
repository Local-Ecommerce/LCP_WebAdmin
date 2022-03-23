import React from 'react';
import styled from 'styled-components';
import * as Constant from '../../Constant';
import { DateTime } from 'luxon';

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

    height: 50px;
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

const ApartmentResidentItem = ({ item, index }) =>  {

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={100} >
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </tr>
        )
    }
    
    let phoneNumber = item.PhoneNumber || '';
    phoneNumber = phoneNumber.slice(0, 4) + " " + phoneNumber.slice(4, 7) + " " + phoneNumber.slice(7);

    let activeCheck = '';
    let activeLabel = '';
    switch (item.Status) {
        case Constant.VERIFIED_RESIDENT:
            activeCheck = 'active';
            activeLabel = 'Hoạt động';
            break;
        case Constant.UNVERIFIED_RESIDENT:
            activeCheck = 'unverified';
            activeLabel = 'Chờ duyệt';
            break;
        case Constant.INACTIVE_RESIDENT:
            activeCheck = 'inactive';
            activeLabel = 'Ngừng hoạt động';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS';
            break;
    }

    return (
        <TableRow>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.ResidentName}</TableData>
            <TableData center>{DateTime.fromISO(item.DateOfBirth).toFormat('dd/MM/yyyy')}</TableData>
            <TableData center>{phoneNumber}</TableData>
            <TableData center>
                {
                    item.Type === 'MarketManager' ? 'Quản lý chung cư'
                    : item.Type === 'Merchant' ? 'Thương nhân' 
                    : item.Type === 'Customer' ? 'Khách hàng'
                    : null
                }    
            </TableData>
            <TableData center>
                <Status active={activeCheck}>{activeLabel}</Status>
            </TableData>
        </TableRow>
    )
}

export default ApartmentResidentItem;