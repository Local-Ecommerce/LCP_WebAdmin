import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowDropUp, ArrowDropDown, Edit, Delete, AddCircle, HideImage } from '@mui/icons-material';
import { TextField } from '@mui/material';
import useClickOutside from "../../contexts/useClickOutside";
import imageCompression from 'browser-image-compression';
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
    margin-right: 10px;
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

const ImageWrapper = styled.div`
    margin-right: 10px;
    border-radius: 3px;
    border: ${props => props.edit ? "1px solid " + props.theme.greyBorder : null};

    &:hover {
        opacity: 0.8;
    }
`;

const Image = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 3px;
    margin-right;
    cursor: pointer;
`;

const StyledNoImageIcon = styled(HideImage)`
    && {
        color: ${props => props.theme.grey};
        font-size: 30px;
        padding: 5px;
        border-radius: 3px;
        border: 1px solid rgba(0,0,0,0.2);
        cursor: pointer;
    }
`;

const HiddenInputFile = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
`;

const CategoryItem = ({ item, getCreateItem, getEditItem, getDeleteItem, parentDisabled }) => {
    const [child, setChild] = useState(false);
    const [edit, toggleEdit] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const toggleDropdown = () => { setDropdown(!dropdown); }

    const [input, setInput] = useState({ image: '', name: '', status: '' });
    const [error, setError] = useState({ image: '', name: '' });

    const handleToggleChild = () => {
        setChild(!child);
    }

    let clickOutside = useClickOutside(() => {
        setDropdown(false);
    });

    const handleGetCreateItem = (e) => {
        e.stopPropagation();
        getCreateItem(item.SystemCategoryId, item.SysCategoryName);
    }

    const handleGetEditItem = (e) => {
        if (validCheck()) {
            e.stopPropagation();
            getEditItem(item.SystemCategoryId, input.name, input.image, item.BelongTo || null, input.status);
            toggleEdit(!edit);
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, name: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, name: 'Vui lòng nhập tên danh mục' }));
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
        setInput({ image: item.CategoryImage, name: item.SysCategoryName, status: item.Status });
        toggleEdit(!edit);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    function handleStatusChange(value) {
        setInput(input => ({ ...input, status: value }));
        setDropdown(!dropdown);
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSetImage = async (e) => {
        setError(error => ({ ...error, image: '' }));
        const [file] = e.target.files;
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 640,
            fileType: "image/jpg"
        }
        if (file) {
            const compressedFile = await imageCompression(file, options);
            let base64 = await toBase64(compressedFile);
            setInput(input => ({ ...input, image: base64.toString() }));
        }
    };

    let activeCheck = '';
    let activeLabel = '';
    let disabledCheck = false;
    if (parentDisabled) {
        activeCheck = 'inactive';
        activeLabel = 'Ngừng hoạt động';
    } else {
        switch (item.Status) {
            case Constant.ACTIVE_SYSTEM_CATEGORY:
                activeCheck = 'active';
                activeLabel = 'Hoạt động';
                break;
            case Constant.INACTIVE_SYSTEM_CATEGORY:
                activeCheck = 'inactive';
                activeLabel = 'Ngừng hoạt động';
                break;
            default:
                activeCheck = 'inactive';
                activeLabel = 'WRONG STATUS NUMBER';
                break;
        }
    }

    if (item === 0) {
        return (
            <CategoryContent level={1} center>
                <h4>Không tìm thấy dữ liệu.</h4>
            </CategoryContent>
        )
    }

    return (
        <>
            {
            edit ?
            <CategoryContent edit level={item.CategoryLevel}>
                <SelectWrapper ref={clickOutside}>
                    <Select onClick={toggleDropdown}>
                        {input.status === Constant.ACTIVE_SYSTEM_CATEGORY ? 'Hoạt động' : input.status === Constant.INACTIVE_SYSTEM_CATEGORY ? 'Ngừng hoạt động' : ''}
                        <ArrowDropDown />
                    </Select>
                    
                    <DropdownMenu dropdown={dropdown}>
                        <DropdownList onClick={() => handleStatusChange(Constant.ACTIVE_SYSTEM_CATEGORY)}>Hoạt động</DropdownList>
                        <DropdownList onClick={() => handleStatusChange(Constant.INACTIVE_SYSTEM_CATEGORY)}>Ngừng hoạt động</DropdownList>
                    </DropdownMenu>
                </SelectWrapper>

                <ImageWrapper edit>
                    <label>
                        {
                            input.image ?
                            <Image src={input.image ? input.image : ''} />
                            : <StyledNoImageIcon />
                        }
                        <HiddenInputFile type="file" accept="image/png, image/jpeg" onChange={handleSetImage} />
                    </label>
                </ImageWrapper>

                <TextField
                    fullWidth size="small" 
                    inputProps={{ maxLength: 250 }} 
                    value={input.name ? input.name : ''} name='name'
                    onChange={handleChange}
                    error={error.name !== ''}
                />

                <EditButton onClick={handleToggleEdit}>Hủy</EditButton>
                <EditButton green onClick={handleGetEditItem}>Lưu</EditButton>
            </CategoryContent>

            :

            <CategoryContent level={item.CategoryLevel} onClick={item.Children && handleToggleChild}>
                <NameWrapper>
                    <Status active={activeCheck}>{activeLabel}</Status>

                    <ImageWrapper>
                        {
                            item.CategoryImage ?
                            <Image src={item.CategoryImage ? item.CategoryImage : ''} />
                            : <StyledNoImageIcon />
                        }
                    </ImageWrapper>

                    {item.SysCategoryName}
                    {Array.isArray(item.Children) && item.Children.length && child
                    ? <DropupIcon />
                        : Array.isArray(item.Children) && item.Children.length
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
                item.Children.map((sub, index) => {
                    return (
                        <CategoryItem 
                            item={sub} 
                            getCreateItem={getCreateItem} 
                            getEditItem={getEditItem}
                            getDeleteItem={getDeleteItem}
                            parentDisabled={item.Status === Constant.INACTIVE_SYSTEM_CATEGORY ? true : false}
                            key={index}
                        />
                    );
                })
            }
        </>
    );
}

export default CategoryItem;