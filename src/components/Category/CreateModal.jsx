import React from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { TextField } from '@mui/material';
import { Close, AddPhotoAlternate } from "@mui/icons-material";

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.spacebetween ? "space-between" : null};
    margin-top: ${props => props.mt ? "20px" : null};
`;

const ModalTitle = styled.h2`
    margin: 25px 20px;
    color: #212529;
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
    min-width: 80px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
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
    transform: translateY(1px);
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '65%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const FormLabel = styled.div`
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: ${props => props.mt ? "30px" : null};
`;

const HelperText = styled.div`
    margin-left: ${props => props.ml0 ? "0px" : "30px"};
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    margin-top: ${props => props.mt ? "30px" : "0px"};
    color: #727272;
`;

const ImageContainer = styled.div`
    width: 120px;
    height: 120px;
    font-size: 14px;
    position: relative;
    margin-bottom: 30px;
`;

const StyledPhotoIcon = styled(AddPhotoAlternate)`
  && {
    cursor: pointer;
    font-size: 30px;
    border: ${props => props.disabled ? "2px dashed rgba(0,0,0,0.2)" : "2px dashed #727272"};
    padding: 45px;
    border-radius: 5px;
    color: ${props => props.disabled ? "rgba(0,0,0,0.2)" : props.theme.grey};
    margin-bottom: 10px;

    &:active {
      transform: ${props => props.disabled ? null : "translateY(1px)"};
    }

    &:hover {
      opacity: 0.8;
      background-color: ${props => props.disabled ? null : "#e8e8e8"}
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

const Image = styled.img`
  object-fit: contain;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
  display: ${(props) => (props.display === "true" ? null : "none")};
  cursor: pointer;
`;

const CreateModal = ({ display, toggle, input, error, handleChange, handleAddItem, handleSetImage, handleRemoveImage }) => {

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Tạo danh mục mới</ModalTitle>
            <ModalContentWrapper>

                <FormLabel>Ảnh danh mục</FormLabel>
                <ImageContainer>
                    {
                        input.image === "" ? 
                        <label>
                            <HiddenInputFile type="file" accept="image/png, image/jpeg" onChange={handleSetImage} />
                            <StyledPhotoIcon />
                        </label>
                        : 
                        <StyledCloseButton onClick={handleRemoveImage} />
                    }
                    <Image src={input.image} display={input.image === "" ? "false" : "true"} />
                </ImageContainer>

                <Row spacebetween>
                    <FormLabel>Tên danh mục</FormLabel>
                    <HelperText ml0>{input.name.length}/250 kí tự</HelperText>
                </Row>
                <TextField
                    fullWidth size="small" 
                    inputProps={{ maxLength: 250 }} 
                    value={input.name ? input.name : ''} name='name'
                    onChange={handleChange}
                    error={error.name !== ''}
                    helperText={error.name}
                />
                
                {
                input.belongTo === '' ?
                null :
                <>
                    <FormLabel mt>Danh mục cha</FormLabel>
                    <TextField
                        fullWidth size="small"
                        InputProps={{ readOnly: true }}
                        value={input.belongToName ? input.belongToName : ''}
                    />
                </>
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