import React from 'react';
import styled from 'styled-components';
import { ToggleOff, ToggleOn, Close, Check } from '@mui/icons-material';
import * as Constant from '../../Constant';
import { DateTime } from 'luxon';

const Button = styled.button`
    padding: 3px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: ${props => props.disabled === true ? "#E0E0E0" : "grey"};

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

const StyledToggleOnIcon = styled(ToggleOn)`
    && {
        font-size: 40px;
        color: ${props => props.disabled ? props.theme.disabled : props.theme.green};
        
        &:hover {
            opacity: 0.8;
        }
    }
`;

const StyledToggleOffIcon = styled(ToggleOff)`
    && {
        font-size: 40px;
        color: ${props => props.disabled ? props.theme.disabled : props.theme.red};

        &:hover {
            opacity: 0.8;
        }
    }
`;

const StyledCheckIcon = styled(Check)`
    && {
        padding: 8px;
        border-radius: 20px;
        color: ${props => props.theme.green};
        opacity: 0.5;
    }

    &:hover {
    opacity: 1;
    background-color: ${props => props.theme.disabled};
    }
`;

const StyledCancelIcon = styled(Close)`
    && {
        padding: 8px;
        border-radius: 20px;
        color: ${props => props.theme.red};
        opacity: 0.5;
    }

    &:hover {
    opacity: 1;
    background-color: ${props => props.theme.disabled};
    }
`;

const Grey = styled.span`
    color: ${props => props.theme.grey};
`;

const ResidentItem = ({ item, handleGetToggleStatusItem, handleGetDetailItem, handleGetApproveItem, handleGetRejectItem, index }) =>  {

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={100} >
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </tr>
        )
    }

    const handleSetDetailItem = (e) => {
        e.stopPropagation();
        handleGetDetailItem(item);
    }

    const handleSetToggleStatusItem = (e, id, name, status) => {
        e.stopPropagation();
        handleGetToggleStatusItem(id, name, status);
    }

    const handleSetApproveItem = (e) => {
        e.stopPropagation();
        handleGetApproveItem(item.ResidentId, item.ResidentName, /*image*/ '', item.ResidentId);
    }

    const handleSetRejectItem = (e) => {
        e.stopPropagation();
        handleGetRejectItem(item.ResidentId, item.ResidentName, /*image*/ '', item.ResidentId);
    }
    
    let phoneNumber = item.PhoneNumber || <Grey>-</Grey>;
    if (phoneNumber.length) {
        phoneNumber = phoneNumber.slice(0, 4) + " " + phoneNumber.slice(4, 7) + " " + phoneNumber.slice(7);
    }

    return (
        <TableRow onClick={handleSetDetailItem}>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.ResidentName}</TableData>
            <TableData center>{item.DateOfBirth ? DateTime.fromISO(item.DateOfBirth).toFormat('dd/MM/yyyy') : <Grey>-</Grey>}</TableData>
            <TableData center>{phoneNumber}</TableData>
            <TableData center>
                {
                    item.Type === Constant.MARKET_MANAGER ? 'Quản lý chung cư'
                    : item.Type === Constant.MERCHANT ? 'Thương nhân' 
                    : item.Type === Constant.CUSTOMER ? 'Khách hàng'
                    : null
                }    
            </TableData>
            <TableData center>
                {
                    item.Type === 'MarketManager' ? 
                    <StyledToggleOnIcon disabled />
                    :
                    <>
                        {
                            item.Status === Constant.VERIFIED_RESIDENT ?
                            <StyledToggleOnIcon onClick={(e) => handleSetToggleStatusItem(e, item.ResidentId, item.ResidentName, true)} />
                            : item.Status === Constant.INACTIVE_RESIDENT ?
                            <StyledToggleOffIcon onClick={(e) => handleSetToggleStatusItem(e, item.ResidentId, item.ResidentName, false)} />
                            : item.Status === Constant.UNVERIFIED_RESIDENT ?
                            <Status active='unverified'>Chờ duyệt</Status>
                            : null
                        }
                    </>
                }
            </TableData>

            {
                item.Status === Constant.UNVERIFIED_RESIDENT ?
                <TableData center>
                    <Button onClick={handleSetApproveItem}>
                        <StyledCheckIcon />
                    </Button>

                    <Button onClick={handleSetRejectItem}>
                        <StyledCancelIcon />
                    </Button>
                </TableData>
                : null
            }
        </TableRow>
    )
}

export default ResidentItem;