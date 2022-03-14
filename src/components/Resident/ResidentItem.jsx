import React from 'react';
import styled from 'styled-components';
import { Badge } from '@mui/material';
import { Edit, Delete, Notifications } from '@mui/icons-material';
import { ToggleOff, ToggleOn } from '@mui/icons-material';
import * as Constant from '../../Constant';

const Button = styled.button`
    padding: 3px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: ${props => props.disabled === true ? "#E0E0E0" : "grey"};
    vertical-align: middle;

    &:focus {
    outline: none;
    }
`;

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
`;

const StyledToggleOnIcon = styled(ToggleOn)`
    && {
        font-size: 40px;
        color: ${props => props.theme.green};

        
        &:hover {
            opacity: 0.8;
        }
    }
`;

const StyledToggleOffIcon = styled(ToggleOff)`
    && {
        font-size: 40px;
        color: ${props => props.theme.red};

        
        &:hover {
            opacity: 0.8;
        }
    }
`;

const StyledNotificationIcon = styled(Notifications)`
    padding: 8px;
    border-radius: 20px;
    color: grey;

    &:hover {
    background-color: ${props => props.theme.disabled};
    }
`;

const StyledBadge = styled(Badge)`
    && {    
        color: #fff;

        & .MuiBadge-badge {
            top: 5px;
            right: 10px;
            background: #dc3545;
            font-size: 0.7em;
        }
    }
`;

const StyledEditIcon = styled(Edit)`
    padding: 8px;
    border-radius: 20px;

    &:hover {
    background-color: ${props => props.theme.disabled};
    }
`;

const StyledDeleteIcon = styled(Delete)`
    padding: 8px;
    border-radius: 20px;

    &:hover {
    background-color: ${props => props.disabled === true ? null : props.theme.disabled};
    }
`;

const ResidentItem = ({ item, handleGetToggleStatusItem, index }) =>  {

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={100} >
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </tr>
        )
    }

    return (
        <TableRow>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.ResidentName}</TableData>
            <TableData center>{item.DateOfBirth}</TableData>
            <TableData center>{item.PhoneNumber}</TableData>
            <TableData center>
                {
                    item.Type === 'MarketManager' ? 'Quản lý chung cư'
                    : item.Type === 'Merchant' ? 'Thương nhân' 
                    : item.Type === 'Customer' ? 'Khách hàng'
                    : null
                }    
            </TableData>
            <TableData center>
                {
                    item.Status === Constant.VERIFIED_RESIDENT ?
                    <StyledToggleOnIcon onClick={() => handleGetToggleStatusItem(item.ResidentId, item.ResidentName, true)} />
                    : item.Status === Constant.INACTIVE_RESIDENT ?
                    <StyledToggleOffIcon onClick={() => handleGetToggleStatusItem(item.ResidentId, item.ResidentName, false)} />
                    : null
                }    
            </TableData>
        </TableRow>
    )
}

export default ResidentItem;