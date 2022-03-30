
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../../RequestMethod";
import { Close, Check } from '@mui/icons-material';
import * as Constant from '../../../Constant';

const ModalTitle = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 20px;
    color: #212529;
    font-weight: 600;
`;

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 0;
    display: flex;
    justify-content: center;
`;

const LeftWrapper = styled.div`
    padding: 10px 0px 20px 20px;
`;

const RightWrapper = styled.div`
    padding: 10px 20px 20px 20px;
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-between;
`;

const ModalButton = styled.button`
    padding: 8px 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
    border-radius: 6px;
    text-align: center;
    font-size: 14px;
    display: inline-flex;
    align-detailItems: center;

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

const Invisible = styled.div`
    min-width: 80px;
`;

const Image = styled.img`
    object-fit: contain;
    width: 100px;
    height: 100px;
`;

const Flex = styled.div`
    width: 100%;
    display: flex;
`;

const FlexChild = styled.div`
    width: 50%;
    margin-right: ${props => props.mr ? "20px" : null};
`;

const FieldLabel = styled.div`
    font-weight: 400;
    font-size: 14px;
    margin-top: ${props => props.mt ? "10px" : "0px"};
    margin-bottom: 5px;
    color: ${props => props.theme.dark};
`;

const TextField = styled.input`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;

    &:disabled {
        color: ${props => props.theme.black};
    }
`;

const StyledCheckIcon = styled(Check)`
    && {
        font-size: 18px;
        margin-right: 5px;
    }
`;

const StyledCancelIcon = styled(Close)`
    && {
        font-size: 18px;
        margin-right: 5px;
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const DetailResidentModal = ({ display, toggle, detailItem, handleGetApproveItem, handleGetRejectItem }) => {

    const handleSetApproveItem = () => {
        handleGetApproveItem(detailItem.ResidentId, detailItem.ResidentName, /*image*/ '');
    }

    const handleSetRejectItem = () => {
        handleGetRejectItem(detailItem.ResidentId, detailItem.ResidentName, /*image*/ '');
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Chi tiết khách hàng</ModalTitle>

            {
                display ?
                <ModalContentWrapper>
                    <LeftWrapper>
                        <FieldLabel mt>Ảnh</FieldLabel>
                        <Image src={''} />         
                    </LeftWrapper>

                    <RightWrapper>
                        <Flex>
                            <FlexChild mr>
                                <FieldLabel mt>Tên</FieldLabel>
                                <TextField
                                    disabled={true}
                                    type="text" value={detailItem.ResidentName}
                                />
                            </FlexChild>

                            <FlexChild>
                                <FieldLabel mt>Số điện thoại</FieldLabel>
                                <TextField
                                    disabled={true}
                                    type="text" value={detailItem && detailItem.PhoneNumber.slice(0, 4) + " " + detailItem.PhoneNumber.slice(4, 7) + " " + detailItem.PhoneNumber.slice(7)}
                                />
                            </FlexChild>
                        </Flex>
                        
                        <Flex>
                            <FlexChild mr>
                                <FieldLabel mt>Giới tính</FieldLabel>
                                <TextField
                                    disabled={true}
                                    type="text" value={detailItem.Gender}
                                />
                            </FlexChild>

                            <FlexChild>
                                <FieldLabel mt>Ngày sinh</FieldLabel>
                                <TextField
                                    disabled={true}
                                    type="text" value={detailItem.DateOfBirth}
                                />
                            </FlexChild>
                        </Flex>

                        <FieldLabel mt>Địa chỉ</FieldLabel>
                        <TextField
                            disabled={true}
                            type="text" value={detailItem.DeliveryAddress}
                        />
                    </RightWrapper>
                </ModalContentWrapper>
                : null
            }

            <ModalButtonWrapper>
            <Invisible />
                {
                    detailItem.Status === Constant.UNVERIFIED_RESIDENT ?
                    <div>
                        <ModalButton blue onClick={handleSetApproveItem}>
                            <StyledCheckIcon />
                            Duyệt
                        </ModalButton>

                        <ModalButton onClick={handleSetRejectItem}>
                            <StyledCancelIcon />
                            Từ chối
                        </ModalButton>
                    </div>
                    : null
                }
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default DetailResidentModal;