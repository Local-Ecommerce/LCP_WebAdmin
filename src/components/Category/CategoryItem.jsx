import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowDropUp, ArrowDropDown, Edit, Delete, AddCircle } from '@mui/icons-material';
import { CircularProgress, TextField } from '@mui/material';
import useClickOutside from "../../contexts/useClickOutside";
import * as Constant from '../../Constant';

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
        background-color: ${props => props.edit ? null : props.theme.hover};
        cursor: pointer;
        text-decoration: none;
        color: #0056b3;
    }

    &:focus {
        background-color: ${props => props.edit ? null : props.theme.hover};
        cursor: pointer;
        text-decoration: none;
        color: #0056b3;
    }
`;

const NameWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 3;
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
    color: ${props => props.active === "inactive" ? props.theme.grey : props.theme.white};
    background-color: ${props => props.active === "active" ? props.theme.green
    :
    props.active === "inactive" ? props.theme.disabled
    :
    props.theme.red};
`;

const ButtonWrapper = styled.div`
    flex: 1;
`;

const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: ${props => props.disabled === true ? props.theme.disabled : props.theme.grey};

    &:focus {
    outline: none;
    }

    &:active {
    box-shadow: 0 2px #666;
    transform: translateY(1px);
    }
`;

const FloatRight = styled.div`
    float: right;
`;

const StyledAddIcon = styled(AddCircle)`
    padding: 8px;
    border-radius: 20px;

    &:hover {
    background-color: ${props => props.theme.disabled};
    }
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
    background-color: ${props => props.disabled === true ? "" : props.theme.disabled};
    }
`;

const SelectWrapper = styled.div`
    width: 220px;
    margin-right: 10px;
    display: inline-block;
    background-color: ${props => props.theme.white};
    border-radius: 3px;
    border: 1px solid ${props => props.theme.greyBorder};
    transition: all .5s ease;
    position: relative;
    font-size: 14px;
    color: ${props => props.theme.black};
    text-align: left;

    &:hover {
        box-shadow: 0 0 4px rgb(204, 204, 204);
        border-radius: 2px 2px 0 0;
    }

    &:active {
        box-shadow: 0 0 4px rgb(204, 204, 204);
        border-radius: 2px 2px 0 0;
    }
`;

const Select = styled.div`
    cursor: pointer;
    display: flex;
    padding: 8px 10px 8px 15px;
    justify-content: space-between;
    align-items: center;
`;

const DropdownMenu = styled.ul`
    position: absolute;
    background-color: #fff;
    width: 100%;
    left: 0;
    margin-top: 1px;
    box-shadow: 0 1px 2px rgb(204, 204, 204);
    border-radius: 0 1px 2px 2px;
    overflow: hidden;
    display: ${props => props.dropdown === true ? "" : "none"};
    max-height: 144px;
    overflow-y: auto;
    z-index: 9;
    padding: 0;
    list-style: none;
`;

const DropdownList = styled.li`
    padding: 10px;
    transition: all .2s ease-in-out;
    cursor: pointer;
`;

const EditButton = styled.button`
    min-width: 60px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.green ? props.theme.green : props.theme.white};
    color: ${props => props.green ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.green ? props.theme.green : props.theme.greyBorder};
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    box-shadow: 0 2px #666;
    transform: translateY(1px);
    }
`;

const CategoryItem = ({ item, getCreateItem, getEditItem, getDeleteItem }) => {
    const [child, setChild] = useState(false);
    const [loading, setLoading] = useState(true);
    const [edit, toggleEdit] = useState(false);
    const [dropdown, toggleDropdown] = useState(false);
    const [input, setInput] = useState({ name: '', status: '' });
    const [error, setError] = useState({ nameError: '' });

    useEffect(() => {
        if (loading) {
            setTimeout(() => {setLoading(false);}, 3000);
        }
    }, [loading]);

    const handleToggleChild = () => {
        setChild(!child);
    }

    let clickOutside = useClickOutside(() => {
        toggleDropdown(false);
    });

    const handleGetCreateItem = (e) => {
        e.stopPropagation();
        getCreateItem(item.SystemCategoryId, item.Type, item.SysCategoryName);
    }

    const handleGetEditItem = (e) => {
        if (validCheck()) {
            e.stopPropagation();
            getEditItem(item.SystemCategoryId, input.name, 'Khác', item.BelongTo || null, input.status);
            toggleEdit(!edit);
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, nameError: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, nameError: 'Vui lòng nhập tên danh mục' }));
            check = true;
        }
        if (check === true) {
            return false;
        }
        return true;
    }

    const handleGetDeleteItem = (e) => {
        e.stopPropagation();
        getDeleteItem(item.SystemCategoryId, item.SysCategoryName);
    }

    const handleToggleEdit = (e) => {
        e.stopPropagation();
        setInput({ name: item.SysCategoryName, status: item.Status });
        toggleEdit(!edit);
    }

    const handleToggleDropdown = () => {
        toggleDropdown(!dropdown);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    function handleStatusChange(value) {
        setInput(input => ({ ...input, status: value }));
        toggleDropdown(!dropdown);
    }

    let activeCheck = '';
    let activeLabel = '';
    let disabledCheck = false;
    switch (item.Status) {
        case Constant.ACTIVE_SYSTEM_CATEGORY:
            activeCheck = 'active';
            activeLabel = 'Hoạt động';
            break;
        case Constant.INACTIVE_SYSTEM_CATEGORY:
            activeCheck = 'inactive';
            activeLabel = 'Ngừng hoạt động';
            break;
        case Constant.DELETED_SYSTEM_CATEGORY:
            activeCheck = 'deleted';
            activeLabel = 'Ngừng hoạt động';
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
            {
            edit ?
            <CategoryContent edit level={item.CategoryLevel}>
                <SelectWrapper ref={clickOutside}>
                    <Select onClick={handleToggleDropdown}>
                        {input.status === Constant.ACTIVE_SYSTEM_CATEGORY ? 'Hoạt động' : input.status === Constant.INACTIVE_SYSTEM_CATEGORY ? 'Ngừng hoạt động' : ''}
                        <ArrowDropDown />
                    </Select>
                    <DropdownMenu dropdown={dropdown}>
                        <DropdownList onClick={() => handleStatusChange(Constant.ACTIVE_SYSTEM_CATEGORY)}>Hoạt động</DropdownList>
                        <DropdownList onClick={() => handleStatusChange(Constant.INACTIVE_SYSTEM_CATEGORY)}>Ngừng hoạt động</DropdownList>
                    </DropdownMenu>
                </SelectWrapper>

                <TextField
                    fullWidth size="small" 
                    value={input.name ? input.name : ''} name='name'
                    onChange={handleChange}
                    error={error.nameError !== ''}
                />

                <EditButton onClick={handleToggleEdit}>Hủy</EditButton>
                <EditButton green onClick={handleGetEditItem}>Lưu</EditButton>
            </CategoryContent>

            :

            <CategoryContent level={item.CategoryLevel} onClick={item.InverseBelongToNavigation && handleToggleChild}>
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
                        {
                        item && item.CategoryLevel !== 3 ?
                        <Button onClick={handleGetCreateItem}>
                            <StyledAddIcon />
                        </Button>
                        : null
                        }
                        
                        <Button onClick={handleToggleEdit}>
                            <StyledEditIcon />
                        </Button>

                        <Button disabled={disabledCheck} onClick={handleGetDeleteItem}>
                            <StyledDeleteIcon disabled={disabledCheck} />
                        </Button>
                    </FloatRight>
                </ButtonWrapper>
            </CategoryContent>
            }

            {child &&
                item.InverseBelongToNavigation.map((item, index) => {
                    return (
                        <CategoryItem 
                            item={item} 
                            getCreateItem={getCreateItem} 
                            getEditItem={getEditItem}
                            getDeleteItem={getDeleteItem} 
                            key={index} 
                        />
                    );
                })
            }
        </>
    );
}

export default CategoryItem;