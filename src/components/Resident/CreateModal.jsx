/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import useClickOutside from "../../contexts/useClickOutside";
import { ArrowDropDown } from "@mui/icons-material";
import { TextField as MuiTextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.spacebetween ? "space-between" : null};
    margin-top: ${props => props.mt ? "20px" : null};
`;

const ModalTitle = styled.h4`
    margin: 25px 20px;
    color: #212529;
`;

const TextField = styled.input`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px 14px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;

    &:disabled {
        color: ${props => props.theme.black};
    }
`;

const FieldLabel = styled.div`
    font-weight: 400;
    font-size: 14px;
    margin-top: ${props => props.mt ? "10px" : "0px"};
    margin-bottom: 5px;
    color: ${props => props.theme.dark};
`;

const ModalContentWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    border-bottom: 1px solid #cfd2d4;
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    float: right;
`;

const ModalButton = styled.button`
    min-width: 60px;
    padding: 8px 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
    border-radius: 4px;
    text-align: center;
    font-size: 14px;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '60%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const HelperText = styled.div`
    align-items: center;
    text-decoration: none;
    font-size: 13px;
    margin-top: ${props => props.mt ? "5px" : "0px"};
    color: ${props => props.error ? props.theme.red : props.theme.dark};
`;

const InputWrapper = styled.div`
    margin: 25px;
	padding-bottom: ${props => props.pb ? "20px" : null};
	margin-top: ${props => props.mt0 ? "0px" : null};
	margin-bottom: ${props => props.mb0 ? "0px" : null};
`;

const Flex = styled.div`
    display: flex;
`;

const FlexChild = styled.div`
  	width: 100%;
`;

const SelectWrapper = styled.div`
    width: 100%;
    display: inline-block;
    border-radius: 3px;
	background-color: ${props => props.disabled ? "#fafafa" : null};
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    transition: all .5s ease;
    position: relative;
    font-size: 14px;
    text-align: left;

    &:hover {
        box-shadow: 0 0 4px rgb(204, 204, 204);
        border-radius: 2px 2px 0 0;
    }

    &:active {
        box-shadow: 0 0 4px rgb(204, 204, 204);
        border-radius: 2px 2px 0 0;
    }

	&:disabled {
        color: ${props => props.theme.black};
    }
`;

const Select = styled.div`
    cursor: pointer;
    display: flex;
    padding: 7px 10px 7px 15px;
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
	border-top: 1px solid rgba(0,0,0,0.05);
    cursor: pointer;

	&:hover {
		background-color: ${props => props.theme.hover};
	}
`;

const CreateModal = ({ display, toggle, input, error, handleChange, setInput, handleAddItem }) => {
    const [dropdown, setDropdown] = useState(false);
	const toggleDropdown = () => { setDropdown(!dropdown); }

    let clickOutside = useClickOutside(() => {
        setDropdown(false);
    });

    const handleSetGender = (e, gender) => {
        e.stopPropagation();
        setInput(input => ({ ...input, gender: gender }))
        setDropdown(false);
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Tạo tài khoản cư dân</ModalTitle>
            <ModalContentWrapper>
                <InputWrapper>
                    <Row spacebetween>
                        <FieldLabel>Email</FieldLabel>
                        <HelperText ml0>{input.email.length}/100 kí tự</HelperText>
                    </Row>

                    <TextField
                        maxLength={100}
                        type="text" value={input.email} name='email'
                        onChange={handleChange}
                        error={error.email !== ''}
                    />
                    <HelperText error>{error.email}</HelperText>
                </InputWrapper>

                <InputWrapper>
                    <Row spacebetween>
                        <FieldLabel>Tên</FieldLabel>
                        <HelperText ml0>{input.fullname.length}/100 kí tự</HelperText>
                    </Row>

                    <TextField
                        maxLength={100}
                        type="text" value={input.fullname} name='fullname'
                        onChange={handleChange}
                        error={error.fullname !== ''}
                    />
                    <HelperText error>{error.fullname}</HelperText>
                </InputWrapper>

                <Flex>
                    <FlexChild>
                        <InputWrapper mt0>
                            <Row spacebetween>
                                <FieldLabel>Địa chỉ</FieldLabel>
                                <HelperText ml0>{input.deliveryAddress.length}/100 kí tự</HelperText>
                            </Row>

                            <TextField
                                maxLength={100}
                                type="text" value={input.deliveryAddress} name='deliveryAddress'
                                onChange={handleChange}
                                error={error.deliveryAddress !== ''}
                                />
                                <HelperText error>{error.deliveryAddress}</HelperText>
                        </InputWrapper>
                    </FlexChild>

                    <FlexChild>
                        <InputWrapper mt0>
                            <FieldLabel>Số điện thoại</FieldLabel>

                            <TextField
                                maxLength={11}
                                type="text" value={input.phoneNumber} name='phoneNumber'
                                onChange={handleChange}
                                error={error.phoneNumber !== ''}
                            />
                            <HelperText error>{error.phoneNumber}</HelperText>
                        </InputWrapper>
                    </FlexChild>
                </Flex>

                <Flex>
                    <FlexChild>
                        <InputWrapper mt0>
                            <FieldLabel>Giới tính</FieldLabel>
                            
                            <SelectWrapper ref={clickOutside}>
                                <Select onClick={toggleDropdown}>
                                    {input.gender}
                                    <ArrowDropDown />
                                </Select>
    
                                <DropdownMenu dropdown={dropdown}>
                                    <DropdownList onClick={(e) => handleSetGender(e, 'Nam')}>Nam</DropdownList>
                                    <DropdownList onClick={(e) => handleSetGender(e, 'Nữ')}>Nữ</DropdownList>
                                    <DropdownList onClick={(e) => handleSetGender(e, 'Không xác định')}>Không xác định</DropdownList>
                                </DropdownMenu>
                            </SelectWrapper>
                        </InputWrapper>
                    </FlexChild>

                    <FlexChild>
                        <InputWrapper mt0>
                            <FieldLabel>Ngày sinh</FieldLabel>
                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                <DatePicker
                                    inputFormat="d/M/yyyy"
                                    disableHighlightToday={true}
                                    value={input.dob}
                                    onChange={(newValue) => { setInput(input => ({ ...input, dob: newValue })) }}
                                    renderInput={(params) => <MuiTextField {...params} size={'small'} />}
                                />
                            </LocalizationProvider>
                            <HelperText error mt>{error.dob}</HelperText>
                        </InputWrapper>
                    </FlexChild>
                </Flex>
            </ModalContentWrapper>
            <ModalButtonWrapper>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
                <ModalButton blue onClick={handleAddItem}>Tạo</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default CreateModal;