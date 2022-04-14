/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { DateTime } from 'luxon';
import useClickOutside from "../../contexts/useClickOutside";
import { ArrowDropDown } from "@mui/icons-material";
import { FormControlLabel, Checkbox } from '@mui/material';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 0;
    display: flex;
    justify-content: center;
`;

const LeftWrapper = styled.div`
    flex: 2;
`;

const RightWrapper = styled.div`
    flex: 3;
`;

const HeaderWrapper = styled.div`
    padding: 20px;
    border-bottom: 1px solid #D8D8D8;
`;

const ContentWrapper = styled.div`
    padding: 20px;
`;

const Header = styled.div`
    font-weight: 600;
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    float: right;
`;

const ModalButton = styled.button`
    padding: 8px 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
    border-radius: 6px;
    text-align: center;
    font-size: 14px;
    display: inline-flex;
    align-items: center;

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

const FieldLabel = styled.div`
    font-weight: 400;
    font-size: 14px;
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: 10px;
    color: ${props => props.theme.dark};
`;

const TextField = styled.input`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;

    &:disabled {
        color: ${props => props.theme.black};
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;
    resize: none;

    &:disabled {
        color: ${props => props.theme.black};
    }
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.spacebetween ? "space-between" : null};
    margin-top: ${props => props.mt ? "20px" : null};
`;

const HelperText = styled.div`
    margin-left: ${props => props.ml0 ? "0px" : "30px"};
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    margin-top: ${props => props.mt ? "30px" : "0px"};
    color: #727272;
`;

const Flex = styled.div`
    display: flex;
`;

const FlexChild = styled.div`
  	width: 100%;
    flex: ${props => props.flex ? props.flex : 1};
    margin-right: ${props => props.mr ? "20px" : null};
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

const StyledFormControlLabel = styled(FormControlLabel)`
    && {
        margin: 5px -10px;
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '40%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const DetailModal = ({ display, toggle, detailItem, error, setDetailItem, handleEditItem }) => {
    const user = JSON.parse(localStorage.getItem('USER'));

    const [item, setItem] = useState({});
    const [disableEdit, setDisableEdit] = useState(false);

    const [dropdown, setDropdown] = useState(false);
	const toggleDropdown = () => { 
        if (!disableEdit) { 
            setDropdown(!dropdown); 
        }
    }

    const types = [
        'Tin tức', 
        'Thông tin',   
        'Thông báo'
    ];

    useEffect(() => {
        if (display) {
            setDisableEdit(false);
            const fetchData = async () => {
                api.get("news?id=" + detailItem.id + "&include=apartment&include=resident")
                .then(function (res) {
                    setItem(res.data.Data.List[0]);

                    setDetailItem(data => ({ ...data, 
                        title: res.data.Data.List[0].Title,
                        text: res.data.Data.List[0].Text,
                        type: res.data.Data.List[0].Type,
                        priority: res.data.Data.List[0].Priority,
                        status: res.data.Data.List[0].Status,
                        residentId: res.data.Data.List[0].ResidentId,
                        apartmentId: res.data.Data.List[0].ApartmentId
                    }));

                    if (user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
                        if (!res.data.Data.List[0].ResidentId) {
                            setDisableEdit(true);
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            };
            fetchData();
        }
    }, [display]);

    let clickOutside = useClickOutside(() => {
        setDropdown(false);
    });

    function handleSetType(value) {
        setDetailItem(prev => ({ ...prev, type: value }));
        setDropdown(!dropdown);
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>

            <ModalContentWrapper>
                <LeftWrapper>
                    <HeaderWrapper>
                        <Header>Chi tiết</Header>
                    </HeaderWrapper>

                    <ContentWrapper>
                        <FieldLabel>Quản lí</FieldLabel>
                        <TextField
                            disabled={true}
                            type="text" value={item.ResidentId ? item.Resident.ResidentName : "Admin"}
                        />

                        <FieldLabel mt>Chung cư</FieldLabel>
                        <TextField
                            disabled={true}
                            type="text" value={item.ApartmentId ? item.Apartment.ApartmentName : "Hệ thống"}
                        />

                        <FieldLabel mt>Ngày tạo</FieldLabel>
                        <TextField
                            disabled={true}
                            type="text" value={DateTime.fromISO(item.ReleaseDate).toFormat('dd/MM/yyyy t')}
                        />
                    </ContentWrapper>
                </LeftWrapper>

                <RightWrapper>
                    <HeaderWrapper>
                        <Header>Chỉnh sửa</Header>
                    </HeaderWrapper>

                    <ContentWrapper>
                        <Flex>
                            <FlexChild flex={1} mr>
                                <FieldLabel>Loại</FieldLabel>
                                
                                <SelectWrapper ref={clickOutside} disabled={disableEdit}>
                                    <Select onClick={toggleDropdown}>
                                        {detailItem.type}
                                        <ArrowDropDown />
                                    </Select>

                                    <DropdownMenu dropdown={dropdown}>
                                        {types.map(type => {
                                            return <DropdownList onClick={() => handleSetType(type)}>{type}</DropdownList>
                                        })}
                                    </DropdownMenu>
                                </SelectWrapper>
                            </FlexChild>

                            <FlexChild flex={3}>
                                <Row spacebetween>
                                    <FieldLabel>Tiêu đề</FieldLabel>
                                    <HelperText ml0>{detailItem.title.length}/250 kí tự</HelperText>
                                </Row>

                                <TextField
                                    disabled={disableEdit}
                                    type="text" value={detailItem.title ? detailItem.title : ''}
                                    onChange={(event) => setDetailItem(data => ({ ...data, title: event.target.value }))}
                                    error={error.editError !== ''}
                                />
                            </FlexChild>
                        </Flex>

                        <StyledFormControlLabel 
                            style={{ pointerEvents: "none" }}
                            control={
                                <Checkbox
                                    disabled={disableEdit}
                                    onClick={(event) => setDetailItem(data => ({ ...data, priority: event.target.checked }))}
                                    style={{ pointerEvents: "auto" }}
                                    checked={detailItem.priority}
                                />
                            }
                            label={<span style={{ fontSize: '14px' }}>Ghim lên đầu bảng thông báo</span>} 
                        />

                        <FieldLabel>Nội dung</FieldLabel>
                        <TextArea
                            disabled={disableEdit} rows="12"
                            type="text" value={detailItem.text ? detailItem.text : ''}
                            onChange={(event) => setDetailItem(data => ({ ...data, text: event.target.value }))}
                        />
                    </ContentWrapper>
                </RightWrapper>
            </ModalContentWrapper>

            <ModalButtonWrapper>
                {
                    disableEdit ?
                    null :
                    <ModalButton blue onClick={handleEditItem}>Cập nhật</ModalButton>
                }
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default DetailModal;