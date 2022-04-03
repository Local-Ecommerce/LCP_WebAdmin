import React from 'react';
import styled from 'styled-components';
import * as Constant from '../../Constant';

const TableRow = styled.tr`
    &:hover {
        background-color: #F5F5F5;
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
    cursor: pointer;

    height: 50px;
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
    color: #fff;
    background-color: ${
    props => props.active === "verified" ? "#28a745"
        :
    props.active === "inactive" ? "grey"
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

const MenuItem = ({ item, handleGetDetailItem, index }) =>  {

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={5}>
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </tr>
        )
    }
    
    let activeCheck = '';
    let activeLabel = '';
    switch (item.Status) {
        case Constant.ACTIVE_MENU:
            activeCheck = 'verified';
            activeLabel = 'Hoạt động';
            break;
        case Constant.INACTIVE_MENU:
            activeCheck = 'inactive';
            activeLabel = 'Ngừng';
            break;
        case Constant.DELETED_MENU:
            activeCheck = 'deleted';
            activeLabel = 'Xóa';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
    }

    const handleSetDetailItem = () => {
        handleGetDetailItem(item.MenuId, item.MerchantStoreId);
    }

    return (
        <TableRow onClick={handleSetDetailItem}>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.MenuName}</TableData>
            <TableData center>
                {
                    item.TimeStart === '00:00:00' && item.TimeEnd === '23:59:59' ?
                    "Cả ngày" :
                    item.TimeStart.slice(0,5) + " - " + item.TimeEnd.slice(0,5)
                }
            </TableData>

            <TableData center>
                {item.RepeatDate.includes('1') ? <DaySpan green>2</DaySpan> : <DaySpan>2</DaySpan>}
                {item.RepeatDate.includes('2') ? <DaySpan green>3</DaySpan> : <DaySpan>3</DaySpan>}
                {item.RepeatDate.includes('3') ? <DaySpan green>4</DaySpan> : <DaySpan>4</DaySpan>}
                {item.RepeatDate.includes('4') ? <DaySpan green>5</DaySpan> : <DaySpan>5</DaySpan>}
                {item.RepeatDate.includes('5') ? <DaySpan green>6</DaySpan> : <DaySpan>6</DaySpan>}
                {item.RepeatDate.includes('6') ? <DaySpan green>7</DaySpan> : <DaySpan>7</DaySpan>}
                {item.RepeatDate.includes('0') ? <DaySpan green>CN</DaySpan> : <DaySpan>CN</DaySpan>}
            </TableData>

            <TableData center>
                <Status active={activeCheck}>{activeLabel}</Status>
            </TableData>
        </TableRow>
    )
}

export default MenuItem;