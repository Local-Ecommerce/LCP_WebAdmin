import React from 'react';
import styled from 'styled-components';
import { Edit, Delete } from '@mui/icons-material';
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
    padding: 8px;
    border-radius: 20px;

    &:hover {
    background-color: ${props => props.theme.disabled};
    }
`;

const StyledDeleteIcon = styled(Delete)`
    padding: 8px;
    border-radius: 20px;

    &:hover {
    background-color: ${props => props.disabled === true ? null : props.theme.disabled};
    }
`;

const NewsItem = ({ item, handleGetEditItem, handleGetDeleteItem, index }) =>  {
    const user = JSON.parse(localStorage.getItem('USER'));

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={8} >
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </tr>
        )
    }
    
    let activeCheck = '';
    let activeLabel = '';
    let disableEdit = false;
    let disableDelete = false;
    switch (item.Status) {
        case 12001:
            activeCheck = 'active';
            activeLabel = 'Hoạt động';
            break;
        case 12002:
            activeCheck = 'inactive';
            activeLabel = 'Ngừng';
            disableDelete = true;
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS';
            break;
    }

    if (user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
        if (!item.ResidentId) {
            disableEdit = true;
            disableDelete = true;
        }
    }

    return (
        <TableRow>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.Title}</TableData>
            <TableData>{item.Text}</TableData>
            { 
                user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager"
                ? null : <TableData center>{item.Apartment ? item.Apartment.ApartmentName : "Hệ thống"}</TableData>
            }
            <TableData center>{item.Resident ? item.Resident.ResidentName : "Admin"}</TableData>
            <TableData center>
                <small>
                    {DateTime.fromISO(item.ReleaseDate).toFormat('dd/MM/yyyy')}<br/>
                    {DateTime.fromISO(item.ReleaseDate).toFormat('t')}
                </small>
            </TableData>
            <TableData center><Status active={activeCheck}>{activeLabel}</Status></TableData>

            <TableData center>

                <Button disabled={disableEdit} onClick={() => handleGetEditItem(item.NewsId)}>
                    <StyledEditIcon/>
                </Button>

                <Button disabled={disableDelete} onClick={() => handleGetDeleteItem(item.NewsId, item.Title)}>
                    <StyledDeleteIcon disabled={disableDelete} />
                </Button>
            </TableData>
        </TableRow>
    )
}

export default NewsItem;