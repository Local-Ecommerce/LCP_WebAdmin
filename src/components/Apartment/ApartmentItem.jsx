import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Badge, CircularProgress } from '@mui/material';
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
    }
`;

const TableData = styled.td`
    padding: 16px;
    vertical-align: top;
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    font-size: 15px;
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
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (loading) {
            setTimeout(() => {setLoading(false);}, 3000);
        }
    }, []);

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={4} >
                    {loading ? <CircularProgress /> : <h4>Không tìm thấy dữ liệu.</h4>}
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
            <TableData>{item.ApartmentName}</TableData>
            <TableData>{item.Address}</TableData>

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

                <Link to={"/apartment/" + item.ApartmentId}>
                    <StyledBadge badgeContent={13} overlap="circular">
                        <StyledNotificationIcon />
                    </StyledBadge>
                </Link>
            </TableData>
        </TableRow>
    )
}

export default ApartmentItem;