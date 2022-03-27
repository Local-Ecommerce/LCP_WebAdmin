import React from 'react';
import styled from 'styled-components';
import { ToggleOff, ToggleOn } from '@mui/icons-material';
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
    
    let phoneNumber = item.PhoneNumber || '';
    phoneNumber = phoneNumber.slice(0, 4) + " " + phoneNumber.slice(4, 7) + " " + phoneNumber.slice(7);

    return (
        <TableRow>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.ResidentName}</TableData>
            <TableData center>{DateTime.fromISO(item.DateOfBirth).toFormat('dd/MM/yyyy')}</TableData>
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
                            <StyledToggleOnIcon onClick={() => handleGetToggleStatusItem(item.ResidentId, item.ResidentName, true)} />
                            : item.Status === Constant.INACTIVE_RESIDENT ?
                            <StyledToggleOffIcon onClick={() => handleGetToggleStatusItem(item.ResidentId, item.ResidentName, false)} />
                            : null
                        }
                    </>
                }
            </TableData>
        </TableRow>
    )
}

export default ResidentItem;