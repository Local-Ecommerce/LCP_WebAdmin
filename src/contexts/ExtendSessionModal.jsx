import React from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const ModalTitle = styled.h3`
    margin: 25px 20px;
    color: #212529;
`;

const ModalContentWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    border-bottom: 1px solid #cfd2d4;
    padding: 25px 20px;
    font-size: 14px;
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
        right: '65%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const ExtendSessionModal = ({ display, toggle, extendSession, logout }) => {
    let navigate = useNavigate();

    async function handleExtendSession() {
        await extendSession();
    }

    async function handleLogout() {
        await logout();
        navigate("/");
    }

    return (
        <Modal isOpen={display} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Gia hạn đăng nhập</ModalTitle>
            <ModalContentWrapper>
                Hạn đăng nhập đã gần hết, bạn có muốn làm mới hạn đăng nhập?
            </ModalContentWrapper>

            <ModalButtonWrapper>
                {/* <ModalButton blue onClick={handleExtendSession}>Làm mới</ModalButton> */}
                <ModalButton onClick={handleLogout}>Đăng xuất</ModalButton>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default ExtendSessionModal;