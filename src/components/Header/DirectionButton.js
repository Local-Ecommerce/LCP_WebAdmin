import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import DirectionList from '../Direction/DirectionList';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #17a2b8;
    height: 44px;
    width: 120px;
    border-style: none;
    border-radius: 5px;
    color: #fff;
    text-decoration: none;
    margin: 0px 10px 0px 0px;

    &:focus {
    opacity: 0.5;
    outline: 0;
    }

    &:hover {
    opacity: 0.8;
    }
`;

const ArrowIcon = styled(DoubleArrowIcon)`
    padding-right: 5px;
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '40%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const CloseButton = styled(Button)`
    float: right;
`;

const DirectionButton = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <Button onClick={openModal}>
                <ArrowIcon sx={{ fontSize: 20 }} />
                Điều hướng
            </Button>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                <div class="modal-body">
                    <DirectionList />
                </div>

                <CloseButton onClick={closeModal}>Quay lại</CloseButton>
            </Modal>
        </>
    );
}

export default DirectionButton;