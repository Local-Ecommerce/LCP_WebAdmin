import React from 'react';
import styled from 'styled-components';
import { Edit, Delete, ContentPasteSearch } from '@mui/icons-material';
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
    background-color: rgba(0, 0, 0, 0.075);
    }
`;

const TableData = styled.td`
    padding: 1rem;
    vertical-align: top;
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    overflow: hidden;
    white-space: nowrap;
    height: 45px;
`;

const Status = styled.span`
    display: inline-block;
    padding: 8px 10px 8px 10px;
    font-size: 0.9;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    color: ${props => props.active === "inactive" ? "grey" : "#fff"};
    background-color: ${props => props.active === "active" ? "#28a745"
    :
    props.active === "inactive" ? "#E0E0E0"
        :
        "#dc3545"};
`;

const StyledSearchIcon = styled(ContentPasteSearch)`
    &:hover {
    color: #dc3545;
    }
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

const MenuItem = ({ item, handleGetDeleteItem }) =>  {
    if (item === 0) {
        return (
            <TableRow>
                <TableData colSpan={4} >
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </TableRow>
        )
    }
    let activeCheck = '';
    let activeLabel = '';
    let disabledCheck = false;
    switch (item.Status) {
        case 14001:
            activeCheck = 'active';
            activeLabel = 'Active';
            break;
        case 14002:
            activeCheck = 'inactive';
            activeLabel = 'Inactive';
            break;
        case 14004:
            activeCheck = 'deleted';
            activeLabel = 'Deleted';
            disabledCheck = true;
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
    }

    return (
        <TableRow>
            <TableData>{item.MenuName}</TableData>
            <TableData>{item.Resident.ResidentName}</TableData>

            <TableData center>
                <Status active={activeCheck}>{activeLabel}</Status>
            </TableData>

            <TableData center>
                <Link to={"/menu/" + item.MenuId}>
                    <Button>
                        <StyledSearchIcon />
                    </Button>
                </Link>

                <Link to={"/editMenu/" + item.MenuId}>
                    <Button>
                        <StyledEditIcon/>
                    </Button>
                </Link>

                <Button disabled={disabledCheck} onClick={() => handleGetDeleteItem(item.MenuId, item.MenuName)}>
                    <StyledDeleteIcon disabled={disabledCheck} />
                </Button>
            </TableData>
        </TableRow>
    )
}

export default MenuItem;