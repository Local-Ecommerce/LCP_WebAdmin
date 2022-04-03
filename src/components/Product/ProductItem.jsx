import React from 'react';
import styled from 'styled-components';
import { Close, Check } from '@mui/icons-material';
import * as Constant from '../../Constant';

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

    height: 51px;
`;

const Image = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 3px;
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

const ProductItem = ({ item, handleGetRejectItem, handleGetApproveItem, handleGetDetailItem }) =>  {

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={100} >
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </tr>
        )
    }

    let activeCheck = '';
    let activeLabel = '';
    switch (item.Status) {
        case Constant.VERIFIED_PRODUCT:
            activeCheck = 'active';
            activeLabel = 'Hoạt động';
            break;
        case Constant.REJECTED_PRODUCT:
            activeCheck = 'deleted';
            activeLabel = 'Từ chối';
            break;
        case Constant.UNVERIFIED_PRODUCT:
            activeCheck = 'unverified';
            activeLabel = 'Chờ duyệt';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS';
            break;
    }

    const handleSetDetailItem = () => {
        handleGetDetailItem(item.ProductId);
    }

    const handleSetApproveItem = (e) => {
        e.stopPropagation();
        handleGetApproveItem(item.ProductId, item.ProductName, item.Image.split('|')[0], item.ResidentId);
    }

    const handleSetRejectItem = (e) => {
        e.stopPropagation();
        handleGetRejectItem(item.ProductId, item.ProductName, item.Image.split('|')[0], item.ResidentId);
    }

    return (
        <TableRow onClick={handleSetDetailItem}>
            <TableData center> <Image src={item.Image} /> </TableData>
            <TableData>{item.ProductName}</TableData>
            <TableData center>{item.DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</TableData>
            <TableData center> <Status active={activeCheck}>{activeLabel}</Status> </TableData>

            {
                item.Status === Constant.UNVERIFIED_PRODUCT ?
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

export default ProductItem;