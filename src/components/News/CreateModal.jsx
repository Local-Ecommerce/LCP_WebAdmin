import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { TextField, Autocomplete, Box } from '@mui/material';

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
        right: '50%',
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

const CreateModal = ({ display, toggle, input, error, setInput, handleAddItem }) => {
    const user = JSON.parse(localStorage.getItem('USER'));
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

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Tạo tin mới</ModalTitle>
            <ModalContentWrapper>
                <Row spacebetween>
                    <FormLabel>Tiêu đề</FormLabel>
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

                <Row spacebetween>
                    <FormLabel mt>Nội dung</FormLabel>
                    <HelperText ml0 mt>{input.text.length}/5000 kí tự</HelperText>
                </Row>
                <TextField
                    fullWidth size="small"
                    inputProps={{ maxLength: 5000 }} 
                    multiline rows={4}
                    value={input.text} name='text'
                    onChange={(event) => setInput(input => ({ ...input, text: event.target.value }))}
                />
                
                {
                user.RoleId === "R002" ?
                <>
                    <FormLabel mt>Chung cư</FormLabel>
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
                        renderInput={(params) => <TextField  {...params} helperText="Để trống để tạo tin mới cho toàn bộ hệ thống." />}
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