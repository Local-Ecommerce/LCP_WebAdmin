/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { DateTime } from 'luxon';
import imageCompression from 'browser-image-compression';
import useClickOutside from "../../contexts/useClickOutside";
import { ArrowDropDown, Close, AddPhotoAlternate, Add } from "@mui/icons-material";
import { FormControlLabel, Checkbox } from '@mui/material';
import * as Constant from '../../Constant';

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

const ImageListWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
    margin-top: 25px;
`;

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    margin: 0px 25px 0px 0px;
    position: relative;
`;

const Image = styled.img`
    object-fit: contain;
    width: 88px;
    height: 88px;
    margin-bottom: 10px;
    display: ${(props) => (props.display === "true" ? null : "none")};
    cursor: pointer;
`;

const StyledPhotoIcon = styled(AddPhotoAlternate)`
  && {
    cursor: pointer;
    border: 2px dashed #727272;
    padding: 30px;
    border-radius: 5px;
    color: #383838;
    margin-bottom: 10px;

    &:active {
      transform: translateY(1px);
    }

    &:hover {
      opacity: 0.8;
      background-color: #e8e8e8;
    }
  }
`;

const StyledAddIcon = styled(Add)`
  && {
    cursor: pointer;
    border: 2px dashed #727272;
    padding: 30px;
    border-radius: 5px;
    color: #383838;
    margin-bottom: 10px;

    &:active {
      transform: translateY(1px);
    }

    &:hover {
      opacity: 0.8;
      background-color: #e8e8e8;
    }
  }
`;

const StyledCloseButton = styled(Close)`
  && {
    position: absolute;
    padding: 2px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 25px;
    color: white;
    font-size: 20px;
    top: -10px;
    right: -10px;
    cursor: pointer;

    &:active {
      transform: translateY(1px);
    }

    &:hover {
      opacity: 0.8;
      background-color: ${(props) => props.theme.dark};
    }
  }
`;

const HiddenInputFile = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '30%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const DetailModal = ({ display, toggle, detailItem, error, setDetailItem, handleEditItem }) => {
    const user = JSON.parse(localStorage.getItem('USER'));

    const [index, setIndex] = useState(0);
    const [item, setItem] = useState({});
    const [disableEdit, setDisableEdit] = useState(false);

    const [dropdown, setDropdown] = useState(false);
	const toggleDropdown = () => { 
        if (!disableEdit) { 
            setDropdown(!dropdown); 
        }
    }

    const types = [
        Constant.POI_TYPE_01, 
        Constant.POI_TYPE_02   
    ];

    useEffect(() => {
        if (display) {
            const url = "pois?id=" + detailItem.id + "&include=apartment&include=resident";
            const fetchData = async () => {
                api.get(url)
                .then(function (res) {
                    setItem(res.data.Data.List[0]);
                    
                    setDetailItem(data => ({ ...data, 
                        title: res.data.Data.List[0].Title,
                        text: res.data.Data.List[0].Text,
                        type: res.data.Data.List[0].Type,
                        priority: res.data.Data.List[0].Priority,
                        currentImages: res.data.Data.List[0].Image ? res.data.Data.List[0].Image.split("|").map((item, index) => (
                            { name: index, image: item }
                        )).filter(item => item.image !== '') : [],
                        images: res.data.Data.List[0].Image ? res.data.Data.List[0].Image.split("|").map((item, index) => (
                            { name: index, image: item }
                        )).filter(item => item.image !== '') : [],
                        status: res.data.Data.List[0].Status,
                        residentId: res.data.Data.List[0].ResidentId,
                        apartmentId: res.data.Data.List[0].ApartmentId
                    }));

                    setIndex(res.data.Data.List[0].Image.split("|").length);

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

    const addImage = () => {
		if (Object.keys(detailItem.images).length <= 5) {
            let newImages = [...detailItem.images];
            newImages.push({ name: index, image: "" });
            setDetailItem(prev => ({ ...prev, images: newImages }));
			setIndex(index + 1);
		}
	};

	const removeBlankImage = (name) => {
        const newImages = [...detailItem.images].filter((item) => {
            return item.name !== name;
        });
        setDetailItem(prev => ({ ...prev, images: newImages }));
	};

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSetImage = async (e) => {
        const { name } = e.target;
        const [file] = e.target.files;
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 640,
            fileType: "image/jpg"
        }
        if (file) {
            const compressedFile = await imageCompression(file, options);
            let base64 = await toBase64(compressedFile);

            let newImages = [...detailItem.images];
            let index = newImages.findIndex(obj => parseInt(obj.name) === parseInt(name));
            newImages[index] = { name: name, image: base64.toString() };
            setDetailItem(prev => ({ ...prev, images: newImages }));
        }
    };

    const handleRemoveImage = (name) => {
        let newImages = [...detailItem.images];
        let index = newImages.findIndex(obj => parseInt(obj.name) === parseInt(name));
        newImages[index] = { name: name, image: '' };
        setDetailItem(prev => ({ ...prev, images: newImages }));
    };

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
                                <FieldLabel>Tiêu đề</FieldLabel>

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
                            disabled={disableEdit} rows="8"
                            type="text" value={detailItem.text ? detailItem.text : ''}
                            onChange={(event) => setDetailItem(data => ({ ...data, text: event.target.value }))}
                        />

                        <ImageListWrapper>
                            {detailItem.images.map((image, index) => {
                                return (
                                    <ImageWrapper key={index}>
                                        {
                                            image.image === "" ? 
                                            <>
                                                <StyledCloseButton
                                                onClick={() => removeBlankImage(image.name)}
                                                />
                                                <label>
                                                <HiddenInputFile
                                                    type="file"
                                                    name={image.name}
                                                    accept="image/png, image/jpeg"
                                                    onChange={handleSetImage}
                                                />
                                                <StyledPhotoIcon />
                                                </label>
                                            </>
                                            : 
                                            <StyledCloseButton onClick={() => handleRemoveImage(image.name)} />
                                        }
                                        <Image
                                        id={image.name}
                                        src={image.image}
                                        display={image.image === "" ? "false" : "true"}
                                        />
                                        Hình ảnh {index + 1}
                                    </ImageWrapper>
                                );
                            })}

                            {
                                Object.keys(detailItem.images).length <= 5 ? 
                                (
                                    <ImageWrapper>
                                        <StyledAddIcon onClick={addImage} />
                                        Thêm ảnh
                                    </ImageWrapper>
                                ) 
                                : null
                            }
                        </ImageListWrapper>
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