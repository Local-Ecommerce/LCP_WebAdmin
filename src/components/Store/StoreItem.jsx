import React from 'react';
import styled from 'styled-components';
import * as Constant from '../../Constant';

const TableRow = styled.tr`
    &:hover {
        background-color: #F5F5F5;
    }
`;

const TableData = styled.td`
    padding: 5px 16px;
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
    props.active === "unverified" ? "#FF8800"
        :
    props.active === "deleted" ? "#dc3545"
        :
    "#dc3545"};
`;

const StoreItem = ({ item, index, handleGetDetailItem }) => {

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={100}>
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </tr>
        )
    }
    
    let activeCheck = '';
    let activeLabel = '';
    switch (item.Status) {
        case Constant.DELETED_MERCHANT_STORE:
            activeCheck = 'deleted';
            activeLabel = 'Xóa';
            break;
        case Constant.VERIFIED_MERCHANT_STORE:
            activeCheck = 'verified';
            activeLabel = 'Hoạt động';
            break;
        case Constant.UNVERIFIED_MERCHANT_STORE:
            activeCheck = 'unverified';
            activeLabel = 'Chờ duyệt';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS';
            break;
    }
    
    const handleSetDetailItem = () => {
        handleGetDetailItem(item.MerchantStoreId);
    }

    return (
        <TableRow onClick={handleSetDetailItem}>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.StoreName}</TableData>
            <TableData center>{item.Resident.ResidentName}</TableData>
            <TableData center><Status active={activeCheck}>{activeLabel}</Status></TableData>
        </TableRow>
    )
}

export default StoreItem;