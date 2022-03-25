import React, { useEffect } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { Close, Check, HideImage } from '@mui/icons-material';
import { DateTime } from 'luxon';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 0;
    display: flex;
    justify-content: center;
`;

const LeftWrapper = styled.div`
    flex: 1;
`;

const RightWrapper = styled.div`
    flex: 1;
`;

const HeaderWrapper = styled.div`
    padding: 20px;
    border-bottom: 1px solid #D8D8D8;
`;

const ContentWrapper = styled.div`
    padding: 20px;
`;

const Header = styled.div`
    font-weight: 600;
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
    align-items: center;

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

const Image = styled.img`
    object-fit: contain;
    width: 120px;
    height: 120px;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.2);
`;

const FieldLabel = styled.div`
    font-weight: 400;
    font-size: 14px;
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: 10px;
`;

const TextField = styled.input`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px 14px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;

    &:disabled {
        color: ${props => props.theme.black};
    }
`;

const StyledNoImageIcon = styled(HideImage)`
    && {
        color: rgba(0,0,0,0.2);
        font-size: 40px;
        padding: 40px;
        border-radius: 3px;
        border: 1px solid rgba(0,0,0,0.2);
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '45%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const DetailStoreModal = ({ display, toggle, detailItem, handleGetApproveItem, handleGetRejectItem }) => {
    console.log(detailItem.MerchantStoreId)
    const handleSetApproveItem = () => {
        handleGetApproveItem(
            detailItem.MerchantStoreId, 
            detailItem.UpdatedMerchantStore.StoreName, 
            detailItem.UpdatedMerchantStore.StoreImage || '', 
            detailItem.ResidentId
        );
    }

    const handleSetRejectItem = () => {
        handleGetRejectItem(
            detailItem.MerchantStoreId, 
            detailItem.UpdatedMerchantStore.StoreName, 
            detailItem.UpdatedMerchantStore.StoreImage || '', 
            detailItem.ResidentId
        );
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>

            {
                display ?
                <>
                    <ModalContentWrapper>
                        <LeftWrapper>
                            <HeaderWrapper>
                                <Header>Thông tin cửa hàng</Header>
                            </HeaderWrapper>

                            <ContentWrapper>
                                <FieldLabel>Ảnh cửa hàng</FieldLabel>
                                {
                                    detailItem.StoreImage ?
                                    <Image src={detailItem.StoreImage ? detailItem.StoreImage : ''} />
                                    : <StyledNoImageIcon />
                                }

                                <FieldLabel mt>Tên cửa hàng</FieldLabel>
                                <TextField
                                    disabled={true} maxLength={250}
                                    type="text" value={detailItem.StoreName}
                                />

                                <FieldLabel mt>Ngày tạo</FieldLabel>
                                <TextField
                                    disabled={true} maxLength={250}
                                    type="text" value={DateTime.fromISO(detailItem.CreatedDate).toFormat('dd/MM/yyyy t')}
                                />
                            </ContentWrapper>
                        </LeftWrapper>

                        <RightWrapper>
                            <HeaderWrapper>
                                <Header>Cập nhật</Header>
                            </HeaderWrapper>

                            <ContentWrapper>
                                <FieldLabel>Ảnh cửa hàng</FieldLabel>
                                {
                                    detailItem.UpdatedMerchantStore.StoreImage ?
                                    <Image src={detailItem.UpdatedMerchantStore.StoreImage ? detailItem.UpdatedMerchantStore.StoreImage : ''} />
                                    : <StyledNoImageIcon />
                                }

                                <FieldLabel mt>Tên cửa hàng</FieldLabel>
                                <TextField
                                    disabled={true}
                                    type="text" value={detailItem.UpdatedMerchantStore.StoreName}
                                />

                                <FieldLabel mt>Ngày cập nhật</FieldLabel>
                                <TextField
                                    disabled={true}
                                    type="text" value={DateTime.fromISO(detailItem.UpdatedMerchantStore.UpdatedDate).toFormat('dd/MM/yyyy t')}
                                />
                            </ContentWrapper>
                        </RightWrapper>
                    </ModalContentWrapper>

                    <ModalButtonWrapper>
                        <Invisible />
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
                        <ModalButton onClick={toggle}>Quay lại</ModalButton>
                    </ModalButtonWrapper>
                </>
                : null
            }
        </Modal>
    )
};

export default DetailStoreModal;