import React from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { api } from "../../RequestMethod";

import { db } from "../../firebase";
import { ref, push } from "firebase/database";

const ModalTitle = styled.h4`
    border-bottom: 1px solid #cfd2d4;
    margin: 0px;
    padding: 20px;
    color: #212529;
`;

const ModalContentWrapper = styled.div`
    padding: 20px;
    font-size: 15px;
    color: #212529;
`;

const ModalButtonWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    padding: 20px;
`;

const ModalButton = styled.button`
    min-width: 80px;
    padding: 8px 10px;
    margin-left: 10px;
    background: ${props => props.color === "red" ? props.theme.red : props.color === "green" ? props.theme.green : props.theme.white};
    color: ${props => props.color === "red" || props.color === "green" ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.color === "red" ? props.theme.red : props.color === "green" ? props.theme.green : props.theme.greyBorder};
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    float: right;
    margin-bottom: 20px;

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

const ApproveModal = ({ display, toggle, approveItem, toggleRefresh, setApproveModal, setDetailModal }) => {
    const user = JSON.parse(localStorage.getItem('USER'));

    const handleApproveItem = (event) => {
        event.preventDefault();
        const handleApprove = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            api.put("products/approval?id=" + approveItem.id)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    console.log(approveItem);
                    toggleRefresh();
                    setApproveModal(false);
                    setDetailModal(false);

                    push(ref(db, `Notification/` + approveItem.residentId), {
                        createdDate: Date.now(),
                        data: {
                            image: approveItem.image ? approveItem.image : '',
                            name: approveItem.name,
                            id: approveItem.id
                        },
                        read: 0,
                        receiverId: approveItem.residentId,
                        senderId: user.Residents[0].ResidentId,
                        type: '001'
                    });

                    toast.update(notification, { render: "Duyệt sản phẩm thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        handleApprove();
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Xác thực sản phẩm</ModalTitle>

            <ModalContentWrapper>
                Bạn có chắc muốn xác thực sản phẩm【<b>{approveItem ? approveItem.name : ''}</b>】?
            </ModalContentWrapper>
            
            <ModalButtonWrapper>
                <ModalButton color="green" onClick={handleApproveItem}>Xác thực</ModalButton>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default ApproveModal;