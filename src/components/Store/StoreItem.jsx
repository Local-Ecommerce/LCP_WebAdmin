import React from 'react';
import styled from 'styled-components';
import { ContentPasteSearch } from '@mui/icons-material';
import { Link } from "react-router-dom";

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

const StyledDetailIcon = styled(ContentPasteSearch)`
    padding: 8px;
    border-radius: 20px;

    &:hover {
    background-color: ${props => props.theme.disabled};
    }
`;

const StoreItem = ({ item, handleGetDeleteItem, index }) => {

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
        case 6004:
            activeCheck = 'deleted';
            activeLabel = 'Xóa';
            break;
        case 6005:
            activeCheck = 'verified';
            activeLabel = 'Xác thực';
            break;
        case 6006:
            activeCheck = 'unverified';
            activeLabel = 'Tạo mới';
            break;
        case 6007:
            activeCheck = 'unverified';
            activeLabel = 'Cập nhật';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS';
            break;
    }

    return (
        <TableRow>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.StoreName}</TableData>
            <TableData center>{item.Resident.ResidentName}</TableData>
            <TableData center><Status active={activeCheck}>{activeLabel}</Status></TableData>

            <TableData center>
                <Link to={"/store/" + item.MerchantStoreId}>
                    <Button>
                        <StyledDetailIcon />
                    </Button>
                </Link>
            </TableData>
        </TableRow>
    )
}

export default StoreItem;