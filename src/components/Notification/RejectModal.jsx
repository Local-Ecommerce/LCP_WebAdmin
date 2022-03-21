import React, { useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { TextField, FormControlLabel, Radio, RadioGroup } from '@mui/material';
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

const RadioWrapper = styled.div`
    margin: 8px 20px;
`;

const RadioLabel = styled.span`
    font-size: 14px;
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

const RejectModal = ({ display, toggle, rejectItem, toggleRefresh, setRejectModal, setDetailModal }) => {
    const user = JSON.parse(localStorage.getItem('USER'));
    const [reason, setReason] = useState('Tên không hợp lệ');
    const [reasonString, setReasonString] = useState('');
    const [error, setError] = useState('');

    const reasons = [
        'Tên không hợp lệ',
        'Miêu tả không hợp lệ',
        'Giá tiền không hợp lệ',
        'Danh mục không hợp lệ',
        'Tùy chọn không hợp lệ',
        'Mã sản phẩm không hợp lệ',
        'Khác'
    ];

    const handleReject = (e) => {
        if (validCheck()) {
            if (reason === 'Khác') {
                handleRejectItem(e, reasonString);
            } else {
                handleRejectItem(e, reason);
            }
        }
    }

    const handleRejectItem = (event, reason) => {
        event.preventDefault();
        const notification = toast.loading("Đang xử lí yêu cầu...");

        const handleReject = async () => {
            api.put("products/rejection?id=" + rejectItem.id)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toggleRefresh();
                    setRejectModal(false);
                    setDetailModal(false);

                    push(ref(db, `Notification/` + rejectItem.residentId), {
                        createdDate: Date.now(),
                        data: {
                            image: rejectItem.image ? rejectItem.image : '',
                            name: rejectItem.name,
                            id: rejectItem.id,
                            reason: reason ? reason : ''
                        },
                        read: 0,
                        receiverId: rejectItem.residentId,
                        senderId: user.Residents[0].ResidentId,
                        type: '002'
                    });

                    toast.update(notification, { render: "Từ chối sản phẩm thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        handleReject();
    }

    const validCheck = () => {
        let check = false;
        setError('');

        if (reason === 'Khác' && (reasonString === null || reasonString === '')) {
            setError('Vui lòng nhập lí do');
            check = true;
        }

        if (check === true) {
            return false;
        }
        return true;
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Từ chối sản phẩm</ModalTitle>

            <ModalContentWrapper>
                Bạn có chắc muốn từ chối sản phẩm【<b>{rejectItem ? rejectItem.name : ''}</b>】?

                <RadioWrapper>
                    <RadioGroup value={reason} name='reason' onChange={(e) => setReason(e.target.value)}>
                        {
                            reasons.map(reason => {
                                return <FormControlLabel 
                                    value={reason} key={reason}
                                    control={<Radio size="small" />} 
                                    label={<RadioLabel>{reason}</RadioLabel>} 
                                />
                            })
                        }

                        {
                            reason === 'Khác' ?
                            <TextField
                                fullWidth size="small" 
                                inputProps={{ maxLength: 250 }} 
                                value={reasonString} name='reasonString'
                                onChange={(e) => setReasonString(e.target.value)}
                                error={error !== ''}
                                helperText={error}
                            /> : null
                        }
                    </RadioGroup>
                </RadioWrapper>
            </ModalContentWrapper>
            
            <ModalButtonWrapper>
                <ModalButton color="red" onClick={handleReject}>Từ chối</ModalButton>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default RejectModal;