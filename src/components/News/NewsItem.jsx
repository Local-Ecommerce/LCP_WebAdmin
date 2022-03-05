import React from 'react';
import styled from 'styled-components';
import { Edit, ToggleOff, ToggleOn } from '@mui/icons-material';
import { DateTime } from 'luxon';
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
    padding: 16px;
    vertical-align: top;
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    font-size: 15px;
    color: ${props => props.grey ? props.theme.grey : null};

    height: 50px;
`;

const StyledEditIcon = styled(Edit)`
    padding: 8px;
    border-radius: 20px;

    &:hover {
    background-color: ${props => props.theme.disabled};
    }
`;

const StyledToggleOnIcon = styled(ToggleOn)`
    && {
        font-size: 40px;
        color: ${props => props.theme.green};

        
        &:hover {
            opacity: 0.8;
        }
    }
`;

const StyledToggleOffIcon = styled(ToggleOff)`
    && {
        font-size: 40px;
        color: ${props => props.theme.red};

        
        &:hover {
            opacity: 0.8;
        }
    }
`;

const NewsItem = ({ item, handleGetEditItem, handleGetToggleStatusItem, index }) =>  {
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
    
    let disableEdit = false;

    if (user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
        if (!item.ResidentId) {
            disableEdit = true;
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
            <TableData center>
                {
                    item.Status === Constant.ACTIVE_NEWS ?
                    <StyledToggleOnIcon onClick={() => handleGetToggleStatusItem(item.NewsId, item.Title, true)} />
                    : item.Status === Constant.INACTIVE_NEWS ?
                    <StyledToggleOffIcon onClick={() => handleGetToggleStatusItem(item.NewsId, item.Title, false)} />
                    : null
                }
            </TableData>

            <TableData center>

                <Button disabled={disableEdit} onClick={() => handleGetEditItem(item.NewsId)}>
                    <StyledEditIcon/>
                </Button>
            </TableData>
        </TableRow>
    )
}

export default NewsItem;