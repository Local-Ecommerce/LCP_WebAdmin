import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { Notifications } from '@mui/icons-material';
import { Badge } from '@mui/material';

import Avatar from '../components/Header/Avatar';

const Row = styled.div`
    display: flex;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid #dee2e6;
`;

const FloatRight = styled.div`
    float: right;
    margin-bottom: 15px;
`;

const StyledBadge = styled(Badge)`
    && {    
        color: #fff;

        & .MuiBadge-badge {
            background: #dc3545;
        }
    }
`;

const IconButton = styled.button`
    margin-right: 20px;
    padding: 5px;
    background-color: #f0f3f6;
    border: 1px solid #f0f3f6;
    border-radius: 50px;

    &:hover {
    background-color: #E0E0E0;
    }

    &:active {
    transform: translateY(2px);
    }
`;

const StyledNotificationIcon = styled(Notifications)`
    && {
        font-size: 30px;
        color: grey;
    }
`;

const ModalTitle = styled.h2`
    margin: 25px 20px;
    color: #212529;
    text-align: center;
`;

const ModalContentWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    border-bottom: 1px solid #cfd2d4;
`;

const ModalButton = styled.button`
    min-width: 80px;
    margin: 20px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.red ? "#dc3545" : "#fff"};
    color: ${props => props.red ? "#fff" : "#212529"};;
    border: 1px solid ${props => props.red ? "#dc3545" : "#fff"};
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;
    float: right;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(2px);
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: 'auto',
        marginRight: '-45%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const Header = () => {
    const [NotificationModal, toggleNotificationModal] = React.useState(false);

    return (
        <Row>
            <Wrapper>
                <FloatRight>
                    <IconButton onClick={() => toggleNotificationModal(!NotificationModal)}>
                        <StyledBadge badgeContent={1} overlap="circular">
                            <StyledNotificationIcon />
                        </StyledBadge>
                    </IconButton>
                    
                    <Modal isOpen={NotificationModal} onRequestClose={() => toggleNotificationModal(!NotificationModal)} style={customStyles} ariaHideApp={false}>
                        <ModalTitle>Thông báo</ModalTitle>

                        <ModalContentWrapper>
                        </ModalContentWrapper>

                        <ModalButton red onClick={() => toggleNotificationModal(!NotificationModal)}>Quay lại</ModalButton>
                    </Modal>

                    <Avatar />
                </FloatRight>
            </Wrapper>
        </Row>
    );
}

export default Header;