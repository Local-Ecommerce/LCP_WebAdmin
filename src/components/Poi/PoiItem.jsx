import React from 'react';
import styled from 'styled-components';
import { ToggleOff, ToggleOn, PushPin } from '@mui/icons-material';
import { DateTime } from 'luxon';
import * as Constant from '../../Constant';

const TableRow = styled.tr`
    &:hover {
        background-color: #F5F5F5;
        cursor: pointer;
    }
`;

const TableData = styled.td`
    padding: 16px 8px;
    vertical-align: top;
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    font-size: 15px;
    color: ${props => props.grey ? props.theme.grey : null};

    height: 50px;
`;

const Text = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const StyledToggleOnIcon = styled(ToggleOn)`
    && {
        font-size: 40px;
        color: ${props => props.disabled ? "rgba(0,0,0,0.1)" : props.theme.green};
        
        &:hover {
            opacity: 0.8;
        }
    }
`;

const StyledToggleOffIcon = styled(ToggleOff)`
    && {
        font-size: 40px;
        color: ${props => props.disabled ? "rgba(0,0,0,0.1)" : props.theme.red};
        
        &:hover {
            opacity: 0.8;
        }
    }
`;

const Type = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 3px 5px;
    font-size: 11px;
    font-weight: 700;
    text-align: center;
    border-radius: 20px;
    color: ${props => props.theme.white};
    background-color: ${props => 
      props.type === 'Thông tin' ? props.theme.blue
    : props.type === 'Thông báo' ? props.theme.green
    : props.type === 'Tin tức' ? props.theme.orange
    : props.type === 'Ghim' ? props.theme.red
    : props.theme.disabled};
`;

const StyledPin = styled(PushPin)`
    && {
        font-size: 14px;
    }
`;

const PoiItem = ({ item, handleGetDetailItem, handleGetToggleStatusItem, index }) =>  {
    const user = JSON.parse(localStorage.getItem('USER'));

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={100} >
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </tr>
        )
    }

    let disableEdit = false;
    if (user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === Constant.MARKET_MANAGER) {
        if (!item.ResidentId) {
            disableEdit = true;
        }
    }

    const handleSetDetailItem = (e) => {
        e.stopPropagation();
        handleGetDetailItem(item.PoiId);
    }

    const handleApproveItem = (e) => {
        e.stopPropagation();
        if (!disableEdit) {
            handleGetToggleStatusItem(item.PoiId, item.Title, true);
        }
    }

    const handleRejectItem = (e) => {
        e.stopPropagation();
        if (!disableEdit) {
            handleGetToggleStatusItem(item.PoiId, item.Title, false);
        }
    }

    return (
        <TableRow onClick={handleSetDetailItem}>
            <TableData grey>{index + 1}</TableData>
            <TableData center><Type type={item.Type}>{item.Type}</Type></TableData>
            <TableData>
                
            <Text>{item.Title}</Text>
            </TableData>
            <TableData><Text>{item.Text}</Text></TableData>

            <TableData center>
            {
                    item.Priority ?
                    <Type type={'Ghim'}><StyledPin />{'Đang ghim'}</Type>
                    : null
                }
            </TableData>
            { 
                user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager" ? 
                null : 
                <TableData center>{item.Apartment ? item.Apartment.ApartmentName : "Hệ thống"}</TableData>
            }

            <TableData center>{item.Resident ? item.Resident.ResidentName : "Admin"}</TableData>

            <TableData center>
                <small>
                    {DateTime.fromISO(item.ReleaseDate).toFormat('dd/MM/yyyy')}<br/>
                    {DateTime.fromISO(item.ReleaseDate).toFormat('t')}
                </small>
            </TableData>

            <TableData center>
                {
                    item.Status === Constant.ACTIVE_POI ?
                    <StyledToggleOnIcon disabled={disableEdit} onClick={handleApproveItem} />
                    : item.Status === Constant.INACTIVE_POI ?
                    <StyledToggleOffIcon disabled={disableEdit} onClick={handleRejectItem} />
                    : null
                }
            </TableData>
        </TableRow>
    )
}

export default PoiItem;