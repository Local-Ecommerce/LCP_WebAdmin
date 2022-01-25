import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowDropUp, ArrowDropDown, Edit, Delete, ContentPasteSearch } from '@mui/icons-material';
import { Link } from "react-router-dom";

const CategoryContent = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: center;
    margin: ${props => props.level === 1 ? "20px" : "0px"} 0px 8px 0px;
    list-style: none;
    width: ${props => props.level === 3 ? "90%" : props.level === 2 ? "95%" : "100%"};
    height: 60px;
    text-decoration: none;
    font-size: 18px;
    color: #404040;
    border-radius: 10px;
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
    flex: 8;
    text-align: left;
    margin-left: 20px;
`;

const DropdownIcon = styled(ArrowDropDown)`
    margin-left: 10px;
`;

const DropupIcon = styled(ArrowDropUp)`
    margin-left: 10px;
`;

const ButtonWrapper = styled.div`
    flex: 1;
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

const CategoryItem = ({ item, handleGetDeleteItem, filterStatus }) => {
    const [child, setChild] = useState(false);
    const showChild = () => setChild(!child);

    let disabledCheck = false;
    switch (item.Status) {
        case 3004:
            disabledCheck = true;
            break;
        default:
            break;
    }

    return (
        <>
            <CategoryContent level={item.CategoryLevel} onClick={item.InverseBelongToNavigation && showChild}>
                <NameWrapper>
                    {item.SysCategoryName}
                    {Array.isArray(item.InverseBelongToNavigation) && item.InverseBelongToNavigation.length && child
                    ? <DropupIcon />
                        : Array.isArray(item.InverseBelongToNavigation) && item.InverseBelongToNavigation.length
                        ? <DropdownIcon />
                        : null}
                </NameWrapper>

                <ButtonWrapper>
                    <Link to={"/"}>
                        <Button>
                            <StyledSearchIcon />
                        </Button>
                    </Link>

                    <Link to={"/editCategory/" + item.SystemCategoryId}>
                        <Button>
                            <StyledEditIcon />
                        </Button>
                    </Link>

                    <Button disabled={disabledCheck} onClick={() => handleGetDeleteItem(item.SystemCategoryId, item.SysCategoryName)}>
                        <StyledDeleteIcon disabled={disabledCheck} />
                    </Button>
                </ButtonWrapper>

            </CategoryContent>

            {child &&
                item.InverseBelongToNavigation.map((item, index) => {
                    if (item.Status === parseInt(filterStatus)) {
                        return (
                            <CategoryItem item={item} handleGetDeleteItem={handleGetDeleteItem} filterStatus={filterStatus} key={index} />
                        );
                    } else return null;
                })
            }
        </>
    );
}

export default CategoryItem;