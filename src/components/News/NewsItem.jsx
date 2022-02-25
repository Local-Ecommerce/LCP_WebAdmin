import React from 'react';
import styled from 'styled-components';
import { Edit, Delete } from '@mui/icons-material';

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
    padding: 16px;
    vertical-align: top;
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    font-size: 15px;
    color: ${props => props.grey ? props.theme.grey : null};

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
    color: ${props => props.active === "inactive" ? "grey" : "#fff"};
    background-color: ${props => props.active === "active" ? "#28a745"
    :
    props.active === "inactive" ? "#E0E0E0"
        :
        "#dc3545"};
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

const NewsItem = ({ item, handleGetEditItem, handleGetDeleteItem, index }) =>  {

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={7} >
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </tr>
        )
    }
    
    let activeCheck = '';
    let activeLabel = '';
    let disabledCheck = false;
    switch (item.Status) {
        case 12001:
            activeCheck = 'active';
            activeLabel = 'Hoạt động';
            break;
        case 12002:
            activeCheck = 'inactive';
            activeLabel = 'Ngừng';
            disabledCheck = true;
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS';
            break;
    }

    return (
        <TableRow>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.Title}</TableData>
            <TableData>{item.Text}</TableData>
            <TableData>{item.Apartment ? item.Apartment.Address : "Hệ thống"}</TableData>
            <TableData>{item.Resident ? item.Resident.ResidentName : "Admin"}</TableData>

            <TableData center>
                <Status active={activeCheck}>{activeLabel}</Status>
            </TableData>

            <TableData center>

                <Button onClick={() => handleGetEditItem(item.NewsId)}>
                    <StyledEditIcon/>
                </Button>

                <Button disabled={disabledCheck} onClick={() => handleGetDeleteItem(item.NewsId, item.Title)}>
                    <StyledDeleteIcon disabled={disabledCheck} />
                </Button>
            </TableData>
        </TableRow>
    )
}

export default NewsItem;