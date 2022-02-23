import React from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { TextField, MenuItem } from '@mui/material';

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

const CreateModal = ({ display, toggle, input, handleChange, error, handleAddItem }) => {
    const types = ['Tươi sống', 'Khác'];

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Tạo danh mục mới</ModalTitle>
            <ModalContentWrapper>
                <FormLabel>Tên danh mục</FormLabel>
                <TextField
                    fullWidth size="small" 
                    value={input.name ? input.name : ''} name='name'
                    onChange={handleChange}
                    error={error.nameError !== ''}
                    helperText={error.nameError}
                />

                <FormLabel mt>Loại</FormLabel>
                <TextField
                    fullWidth size="small" select
                    value={input.type ? input.type : ''} name='type'
                    onChange={handleChange}
                    error={error.typeError !== ''}
                    helperText={error.typeError}
                >
                    {types.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
                
                {
                input.belongTo === '' ?
                null :
                <>
                    <FormLabel mt>Danh mục cha</FormLabel>
                    <TextField
                        fullWidth size="small"
                        InputProps={{ readOnly: true }}
                        value={input.belongToName ? input.belongToName : ''} name='name'
                        onChange={handleChange}
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