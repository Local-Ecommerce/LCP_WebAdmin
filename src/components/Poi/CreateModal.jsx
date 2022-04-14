/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import imageCompression from 'browser-image-compression';
import useClickOutside from "../../contexts/useClickOutside";
import { ArrowDropDown, Close, AddPhotoAlternate, Add } from "@mui/icons-material";
import { TextField, Autocomplete, Box, FormControlLabel, Checkbox } from '@mui/material';

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
    padding: 25px;
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
        right: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

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
        margin: 10px -10px;
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
    margin: 0px 35px 0px 0px;
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

const CreateModal = ({ display, toggle, input, error, setInput, handleAddItem }) => {
    const user = JSON.parse(localStorage.getItem('USER'));

    const [index, setIndex] = useState(0);
    const [dropdown, setDropdown] = useState(false);
	const toggleDropdown = () => { setDropdown(!dropdown); }

    const types = [
        'Vui chơi', 
        'Mua sắm',   
        'Thể thao'
    ];
    const [autocomplete, setAutocomplete] = useState([]);

    useEffect (() => {
        if (user.RoleId === "R002") {
            const url = "apartments?status=4001";
            const fetchData = () => {
                api.get(url)
                .then(function (res) {
                    setAutocomplete(res.data.Data.List);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            fetchData();
        }
    }, []);

    let clickOutside = useClickOutside(() => {
        setDropdown(false);
    });

    function handleSetType(value) {
        setInput(input => ({ ...input, type: value }));
        setDropdown(!dropdown);
    }

    const addImage = () => {
		if (Object.keys(input.images).length <= 5) {
            let newImages = [...input.images];
            newImages.push({ name: index, image: "" });
            setInput(input => ({ ...input, images: newImages }));
			setIndex(index + 1);
		}
	};

	const removeBlankImage = (name) => {
        const newImages = [...input.images].filter((item) => {
            return item.name !== name;
        });
        setInput(input => ({ ...input, images: newImages }));
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

            let newImages = [...input.images];
            let index = newImages.findIndex(obj => parseInt(obj.name) === parseInt(name));
            newImages[index] = { name: name, image: base64.toString() };
            setInput(input => ({ ...input, images: newImages }));
        }
    };

    const handleRemoveImage = (name) => {
        let newImages = [...input.images];
        let index = newImages.findIndex(obj => parseInt(obj.name) === parseInt(name));
        newImages[index] = { name: name, image: '' };
        setInput(input => ({ ...input, images: newImages }));
    };

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Tạo POI mới</ModalTitle>
            <ModalContentWrapper>
                <Flex>
                    <FlexChild flex={1} mr>
                        <FieldLabel>Loại</FieldLabel>
                        
                        <SelectWrapper ref={clickOutside}>
                            <Select onClick={toggleDropdown}>
                                {input.type}
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
                            <HelperText ml0>{input.title.length}/250 kí tự</HelperText>
                        </Row>

                        <TextField
                            fullWidth size="small"
                            inputProps={{ maxLength: 250 }} 
                            value={input.title} name='title'
                            onChange={(event) => setInput(input => ({ ...input, title: event.target.value }))}
                            error={error.titleError !== ''}
                            helperText={error.titleError}
                        />
                    </FlexChild>
                </Flex>

                <StyledFormControlLabel 
                    style={{ pointerEvents: "none" }}
                    control={
                        <Checkbox
                            onClick={(event) => setInput(input => ({ ...input, priority: event.target.checked }))}
                            style={{ pointerEvents: "auto" }}
                            checked={input.priority}
                        />
                    }
                    label={<span style={{ fontSize: '14px' }}>Ghim lên đầu bảng thông báo</span>} 
                />

                <Row spacebetween>
                    <FieldLabel>Nội dung</FieldLabel>
                    <HelperText ml0>{input.text.length}/5000 kí tự</HelperText>
                </Row>
                <TextField
                    fullWidth size="small"
                    inputProps={{ maxLength: 5000 }} 
                    multiline rows={4}
                    value={input.text} name='text'
                    onChange={(event) => setInput(input => ({ ...input, text: event.target.value }))}
                />

                <ImageListWrapper>
                    {input.images.map((image, index) => {
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
                        Object.keys(input.images).length <= 5 ? 
                        (
                            <ImageWrapper>
                                <StyledAddIcon onClick={addImage} />
                                Thêm ảnh
                            </ImageWrapper>
                        ) 
                        : null
                    }
                </ImageListWrapper>
                
                {
                user.RoleId === "R002" ?
                <>
                    <FieldLabel mt>Chung cư</FieldLabel>
                    <Autocomplete
                        onChange={(event, value) => setInput(input => ({ ...input, apartment: value }))}
                        selectOnFocus disablePortal
                        getOptionLabel={(item) => item.ApartmentName}
                        options={autocomplete}
                        renderOption={(props, item) => {
                            return (
                                <Box {...props} key={item.ApartmentId}>
                                    <small>{item.ApartmentName}&nbsp; - {item.Address}</small>
                                </Box>
                            );
                        }}
                        renderInput={(params) => <TextField  {...params}
                                            error={error.apartmentError !== ''}
                                            helperText={error.apartmentError} />}
                    />
                </>
                : null
                }
            </ModalContentWrapper>
            <ModalButtonWrapper>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
                <ModalButton blue onClick={handleAddItem}>Tạo</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default CreateModal;