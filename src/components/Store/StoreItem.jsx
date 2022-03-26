import React from 'react';
import styled from 'styled-components';
import * as Constant from '../../Constant';
import { Close, Check } from '@mui/icons-material';
import { DateTime } from 'luxon';

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

const Image = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 3px;
`;

const StoreItem = ({ item, handleGetRejectItem, handleGetApproveItem, handleGetDetailItem }) => {

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
        item.UpdatedMerchantStore ?
        handleGetDetailItem(item) 
        :
        handleGetDetailItem(item.MerchantStoreId);
    }

    const handleSetApproveItem = (e) => {
        e.stopPropagation();
        handleGetApproveItem(
            item.MerchantStoreId, 
            item.UpdatedMerchantStore.StoreName, 
            item.UpdatedMerchantStore.StoreImage || '', 
            item.ResidentId
        );
    }

    const handleSetRejectItem = (e) => {
        e.stopPropagation();
        handleGetRejectItem(
            item.MerchantStoreId, 
            item.UpdatedMerchantStore.StoreName, 
            item.UpdatedMerchantStore.StoreImage || '', 
            item.ResidentId
        );
    }

    return (
        <TableRow onClick={handleSetDetailItem}>
            <TableData center> <Image src={item.StoreImage} /> </TableData>
            <TableData>{item.StoreName}</TableData>
            {
                item.UpdatedMerchantStore ?
                <>
                    <TableData center>{DateTime.fromISO(item.UpdatedMerchantStore.UpdatedDate).toFormat('dd/MM/yyyy t')}</TableData> 
                    <TableData center><Status active='unverified'>Chờ duyệt</Status></TableData>
                    <TableData center>
                        <Button onClick={handleSetApproveItem}>
                            <StyledCheckIcon />
                        </Button>

                        <Button onClick={handleSetRejectItem}>
                            <StyledCancelIcon />
                        </Button>
                    </TableData>
                </>
                :
                <>
                    <TableData center><Status active={activeCheck}>{activeLabel}</Status></TableData>
                    <TableData center>{item.Resident.ResidentName}</TableData>
                </>
            }
        </TableRow>
    )
}

export default StoreItem;