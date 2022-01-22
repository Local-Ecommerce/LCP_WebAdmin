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
    background-color: rgba(0, 0, 0, 0.075);
    }
`;

const TableData = styled.td`
    padding: 1rem;
    vertical-align: top;
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
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
    && {
        color: grey;
        padding: 0px 0px 4px 4px;
    }

    &:hover {
    color: #dc3545;
    }
`;

const StyledBadge = styled(Badge)`
    && {    
        color: #fff;

        & .MuiBadge-badge {
            top: 1px;
            right: 4px;
            background: #dc3545;
            font-size: 0.7em;
        }
    }
`;

const StyledEditIcon = styled(Edit)`
    &:hover {
    color: #dc3545;
    }
`;

const StyledDeleteIcon = styled(Delete)`
    &:hover {
    color: ${props => props.disabled === true ? "#E0E0E0" : "#dc3545"};
    }
`;

const ApartmentItem = ({ item, handleGetDeleteItem }) =>  {
    if (item === 0) {
        return (
            <tr>
                <TableData colSpan={4} >
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
            activeLabel = 'Active';
            break;
        case 4002:
            activeCheck = 'inactive';
            activeLabel = 'Inactive';
            disabledCheck = true;
            break;
        case 4004:
            activeCheck = 'deleted';
            activeLabel = 'Deleted';
            disabledCheck = true;
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
    }

    return (
        <TableRow>
            <TableData>{item.Address}</TableData>
            <TableData center>({item.Lat},<br/>{item.Long})</TableData>

            <TableData center>
                <Status active={activeCheck}>{activeLabel}</Status>
            </TableData>
            
            <TableData center>
                <Link to={"/editApartment/" + item.ApartmentId}>
                    <Button>
                        <StyledEditIcon/>
                    </Button>
                </Link>

                <Button disabled={disabledCheck} onClick={() => handleGetDeleteItem(item.ApartmentId, item.Address)}>
                    <StyledDeleteIcon disabled={disabledCheck} />
                </Button>

                <StyledBadge badgeContent={2} overlap="circular">
                    <StyledNotificationIcon />
                </StyledBadge>
            </TableData>
        </TableRow>
    )
}

export default ApartmentItem;