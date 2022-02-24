import React from 'react';
import styled from "styled-components";
import Modal from 'react-modal';

const ModalTitle = styled.h2`
    margin: 25px 20px;
    color: #212529;
`;

const ModalContentWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    border-bottom: 1px solid #cfd2d4;
    padding: 25px;
`;

const DangerModalContent = styled.div`
    color: #762a36;
    padding: 20px;
    background: #f8d7da;
    border-radius: 5px;
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

const DeleteModal = ({ display, toggle, deleteItem, handleDeleteItem }) => {

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Xác Nhận Xóa</ModalTitle>
            <ModalContentWrapper>
                <DangerModalContent>Bạn có chắc chắn muốn xóa danh mục【<b>{deleteItem.name ? deleteItem.name : null}</b>】?</DangerModalContent>
            </ModalContentWrapper>
            <ModalButtonWrapper>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
                <ModalButton red onClick={handleDeleteItem}>Xóa</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default DeleteModal;