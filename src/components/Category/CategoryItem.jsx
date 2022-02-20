import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowDropUp, ArrowDropDown, Edit, Delete } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";

const CategoryContent = styled.div`
    margin: ${props => props.level === 1 ? "10px" : "0px"} 0px 8px 0px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: ${props => props.center ? "center" : ""};
    list-style: none;
    width: ${props => props.level === 3 ? "90%" : props.level === 2 ? "95%" : "100%"};
    height: 60px;
    text-decoration: none;
    font-size: 18px;
    color: #404040;
    border-radius: 5px;
    border: 1px solid #fff;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    margin-left: auto;
    font-size: 1em;

    &:hover {
        background-color: #F5F5F5;
        cursor: pointer;
        text-decoration: none;
        color: #0056b3;
    }

    &:focus {
        background-color: #F5F5F5;
        cursor: pointer;
        text-decoration: none;
        color: #0056b3;
    }
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

const NameWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 8;
`;

const DropdownIcon = styled(ArrowDropDown)`
    margin-left: 10px;
`;

const DropupIcon = styled(ArrowDropUp)`
    margin-left: 10px;
`;

const Status = styled.span`
    margin-right: 20px;
    display: inline-block;
    padding: 4px 5px;
    font-size: 0.7em;
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

const ButtonWrapper = styled.div`
    flex: 1;
`;

const FloatRight = styled.div`
    float: right;
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

const CategoryItem = ({ item, handleGetDeleteItem }) => {
    const [child, setChild] = useState(false);
    const showChild = () => setChild(!child);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (loading) {
            setTimeout(() => {setLoading(false);}, 3000);
        }
    }, [loading]);

    let activeCheck = '';
    let activeLabel = '';
    let disabledCheck = false;
    switch (item.Status) {
        case 3001:
            activeCheck = 'active';
            activeLabel = 'Active';
            break;
        case 3002:
            activeCheck = 'inactive';
            activeLabel = 'Inactive';
            break;
        case 3004:
            activeCheck = 'deleted';
            activeLabel = 'Deleted';
            disabledCheck = true;
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
    }

    if (item === 0) {
        return (
            <CategoryContent level={1} center>
                {loading ? <CircularProgress /> : <h4>Không tìm thấy dữ liệu.</h4>}
            </CategoryContent>
        )
    }

    return (
        <>
            <CategoryContent level={item.CategoryLevel} onClick={item.InverseBelongToNavigation && showChild}>
                <NameWrapper>
                    <Status active={activeCheck}>{activeLabel}</Status>
                    {item.SysCategoryName}
                    {Array.isArray(item.InverseBelongToNavigation) && item.InverseBelongToNavigation.length && child
                    ? <DropupIcon />
                        : Array.isArray(item.InverseBelongToNavigation) && item.InverseBelongToNavigation.length
                        ? <DropdownIcon />
                        : null}
                </NameWrapper>

                <ButtonWrapper>
                    <FloatRight>
                        <Link to={"/editCategory/" + item.SystemCategoryId}>
                            <Button>
                                <StyledEditIcon />
                            </Button>
                        </Link>

                        <Button disabled={disabledCheck} onClick={() => handleGetDeleteItem(item.SystemCategoryId, item.SysCategoryName)}>
                            <StyledDeleteIcon disabled={disabledCheck} />
                        </Button>
                    </FloatRight>
                </ButtonWrapper>

            </CategoryContent>

            {child &&
                item.InverseBelongToNavigation.map((item, index) => {
                    return (
                        <CategoryItem item={item} handleGetDeleteItem={handleGetDeleteItem} key={index} />
                    );
                })
            }
        </>
    );
}

export default CategoryItem;