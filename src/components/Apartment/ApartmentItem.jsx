import React from 'react';
import styled from 'styled-components';
import { Badge } from '@mui/material';
import { Edit, Delete, Notifications } from '@mui/icons-material';
import { Link } from "react-router-dom";

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

const Status = styled.span`
    display: inline-block;
    padding: 4px 6px;
    font-size: 0.8em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: ${props => props.active === "inactive" ? "grey" : "#fff"};
    background-color: ${props => props.active === "active" ? "#28a745"
    :
    props.active === "inactive" ? "#E0E0E0"
        :
        "#dc3545"};
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

const ApartmentItem = ({ item, handleGetEditItem, handleGetDeleteItem, index }) =>  {

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={5} >
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </tr>
        )
    }
    
    let activeCheck = '';
    let activeLabel = '';
    let disabledCheck = false;
    switch (item.Status) {
        case 4001:
            activeCheck = 'active';
            activeLabel = 'Hoạt động';
            break;
        case 4002:
            activeCheck = 'inactive';
            activeLabel = 'Ngừng';
            disabledCheck = true;
            break;
        case 4004:
            activeCheck = 'deleted';
            activeLabel = 'Xóa';
            disabledCheck = true;
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
    }

    return (
        <TableRow>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.ApartmentName}</TableData>
            <TableData>{item.Address}</TableData>
            <TableData center><Status active={activeCheck}>{activeLabel}</Status></TableData>
            
            <TableData center>
                <Button onClick={() => handleGetEditItem(item.ApartmentId, item.ApartmentName, item.Address, item.Status)}>
                    <StyledEditIcon/>
                </Button>

                <Button disabled={disabledCheck} onClick={() => handleGetDeleteItem(item.ApartmentId, item.ApartmentName)}>
                    <StyledDeleteIcon disabled={disabledCheck} />
                </Button>

                <Link to={"/apartment/" + item.ApartmentId}>
                    <StyledBadge badgeContent={0} overlap="circular">
                        <StyledNotificationIcon />
                    </StyledBadge>
                </Link>
            </TableData>
        </TableRow>
    )
}

export default ApartmentItem;