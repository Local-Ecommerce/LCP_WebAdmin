/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { DateTime } from 'luxon';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 0;
    display: flex;
    justify-content: center;
`;

const LeftWrapper = styled.div`
    flex: 2;
`;

const RightWrapper = styled.div`
    flex: 3;
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
    float: right;
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

const FieldLabel = styled.div`
    font-weight: 400;
    font-size: 14px;
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: 10px;
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

const TextArea = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;
    resize: none;

    &:disabled {
        color: ${props => props.theme.black};
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '40%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const DetailModal = ({ display, toggle, detailItem, error, setDetailItem, handleEditItem }) => {
    const [item, setItem] = useState({});
    const user = JSON.parse(localStorage.getItem('USER'));

    useEffect(() => {
        if (display) {
            const url = "pois?id=" + detailItem.id + "&include=apartment&include=resident";
            const fetchData = async () => {
                api.get(url)
                .then(function (res) {
                    setItem(res.data.Data.List[0]);
                    setDetailItem(data => ({ ...data, 
                        title: res.data.Data.List[0].Title,
                        text: res.data.Data.List[0].Text,
                        status: res.data.Data.List[0].Status,
                        residentId: res.data.Data.List[0].ResidentId,
                        apartmentId: res.data.Data.List[0].ApartmentId
                    }));
                })
                .catch(function (error) {
                    console.log(error);
                });
            };
            fetchData();
        }
    }, [display]);

    let disableEdit = false;
    if (user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
        if (!item.ResidentId) {
            disableEdit = true;
        }
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>

            <ModalContentWrapper>
                <LeftWrapper>
                    <HeaderWrapper>
                        <Header>Chi tiết</Header>
                    </HeaderWrapper>

                    <ContentWrapper>
                        <FieldLabel>Quản lí</FieldLabel>
                        <TextField
                            disabled={true}
                            type="text" value={item.ResidentId ? item.Resident.ResidentName : "Admin"}
                        />

                        <FieldLabel mt>Chung cư</FieldLabel>
                        <TextField
                            disabled={true}
                            type="text" value={item.ApartmentId ? item.Apartment.ApartmentName : "Hệ thống"}
                        />

                        <FieldLabel mt>Ngày tạo</FieldLabel>
                        <TextField
                            disabled={true}
                            type="text" value={DateTime.fromISO(item.ReleaseDate).toFormat('dd/MM/yyyy t')}
                        />
                    </ContentWrapper>
                </LeftWrapper>

                <RightWrapper>
                    <HeaderWrapper>
                        <Header>Chỉnh sửa</Header>
                    </HeaderWrapper>

                    <ContentWrapper>
                        <FieldLabel>Tiêu đề</FieldLabel>
                        <TextField
                            disabled={disableEdit}
                            type="text" value={detailItem.title ? detailItem.title : ''}
                            onChange={(event) => setDetailItem(data => ({ ...data, title: event.target.value }))}
                            error={error.editError !== ''}
                        />

                        <FieldLabel mt>Nội dung</FieldLabel>
                        <TextArea
                            disabled={disableEdit} rows="12"
                            type="text" value={detailItem.text ? detailItem.text : ''}
                            onChange={(event) => setDetailItem(data => ({ ...data, text: event.target.value }))}
                        />
                    </ContentWrapper>
                </RightWrapper>
            </ModalContentWrapper>

            <ModalButtonWrapper>
                {
                    disableEdit ?
                    null :
                    <ModalButton blue onClick={handleEditItem}>Cập nhật</ModalButton>
                }
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default DetailModal;