import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { TextField, InputLabel, MenuItem, Select, FormControl, CircularProgress } from '@mui/material';
import { DateTime } from 'luxon';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 25px;
    display: flex;
    justify-content: center;
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

const DetailWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    border-right: 1px solid rgba(0,0,0,0.1);
`;

const UpdateWrapper = styled.div`
    flex: 3;
    padding: 20px 40px;
    margin-left: 20px;
`;

const DetailBottom = styled.div`
    margin-top: 20px;
`;

const DetailTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`;

const DetailInfo = styled.div`
    align-items: center;
    margin: 12px 10px;
    color: #444;
`;

const DetailInfoText = styled.span`
    display: block;
    margin: 10px;
`;

const Status = styled.span`
    display: inline-block;
    padding: 4px 6px;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    margin-left: 15px;
    color: ${props => props.active === "inactive" ? "grey" : "#fff"};
    background-color: ${props => props.active === "active" ? "#28a745"
    :
    props.active === "inactive" ? "#E0E0E0"
        :
        "#dc3545"};
`;

const UpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
    display: flex;
    align-items: center;
`;

const UpdateForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const StyledTextField = styled(TextField)`
    && {    
    margin-top: 30px;
    }
`;

const StyledFormControl = styled(FormControl)`
    && {    
    margin-top: 30px;
    }
`;

const UpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 15px;
    cursor: pointer;
    background-color: #17a2b8;
    color: white;
    font-weight: 600;
    width: 100%;
    margin-top: 50px;

    &:active {
    box-shadow: 0 2px #666;
    transform: translateY(2px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '30%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const EditModal = ({ display, toggle, editItem, error, setEditItem, handleEditItem }) => {
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (display) {
            setLoading(true);
            const url = "pois?id=" + editItem.id + "&include=apartment&include=resident";
            const fetchData = async () => {
                api.get(url)
                .then(function (res) {
                    setItem(res.data.Data.List[0]);
                    setEditItem({
                        title: res.data.Data.List[0].Title,
                        text: res.data.Data.List[0].Text,
                        status: res.data.Data.List[0].Status,
                        residentId: res.data.Data.List[0].ResidentId,
                        apartmentId: res.data.Data.List[0].ApartmentId
                    });
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false);
                });
            };
            fetchData();
        }
    }, [display]);

    let activeCheck = '';
    let activeLabel = '';
    switch (item.Status) {
        case 13001:
            activeCheck = 'active';
            activeLabel = 'Hoạt động';
            break;
        case 13002:
            activeCheck = 'inactive';
            activeLabel = 'Ngừng';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS';
            break;
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>

            <ModalContentWrapper>
                {
                loading ? 
                <CircularProgress />
                :
                <>
                    <DetailWrapper>
                        <UpdateTitle>
                            Chi tiết <Status active={activeCheck}>{activeLabel}</Status>
                        </UpdateTitle>

                        <DetailBottom>
                            <DetailTitle>POI ID</DetailTitle>
                            <DetailInfo>
                                <DetailInfoText>{item.PoiId}</DetailInfoText>
                            </DetailInfo>

                            <DetailTitle>Tiêu đề</DetailTitle>
                            <DetailInfo>
                                <DetailInfoText>{item.Title}</DetailInfoText>
                            </DetailInfo>

                            <DetailTitle>Nội dung</DetailTitle>
                            <DetailInfo>
                                <DetailInfoText>{item.Text}</DetailInfoText>
                            </DetailInfo>

                            <DetailTitle>Ngày tạo</DetailTitle>
                            <DetailInfo>
                                <DetailInfoText>{DateTime.fromISO(item.ReleaseDate).toLocaleString(DateTime.DATETIME_SHORT)}</DetailInfoText>
                            </DetailInfo>

                            <DetailTitle>Quản lý</DetailTitle>
                            <DetailInfo>
                                <DetailInfoText>{item.ResidentId ? item.Resident.ResidentName : "Admin"}</DetailInfoText>
                            </DetailInfo>

                            <DetailTitle>Chung cư</DetailTitle>
                            <DetailInfo>
                                <DetailInfoText>{item.ApartmentId ? item.Apartment.ApartmentName : "Admin"}</DetailInfoText>
                            </DetailInfo>
                        </DetailBottom>
                    </DetailWrapper>


                    <UpdateWrapper>
                        <UpdateTitle>Chỉnh sửa</UpdateTitle>

                        <UpdateForm>
                            <StyledTextField
                                fullWidth 
                                value={editItem.title} name='title'
                                onChange={(event) => setEditItem(data => ({ ...data, title: event.target.value }))}
                                error={error.editError !== ''}
                                helperText={error.editError}
                                label="Tiêu đề" 
                            />

                            <StyledTextField
                                fullWidth multiline rows={4}
                                value={editItem.text} name='text'
                                onChange={(event) => setEditItem(data => ({ ...data, text: event.target.value }))}
                                label="Nội dung" 
                            />

                            <StyledFormControl>
                                <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                                <Select 
                                    value={editItem.status} name='status'
                                    label="Trạng thái"
                                    onChange={(event) => setEditItem(data => ({ ...data, status: event.target.value }))}
                                >
                                <MenuItem value={13001}>Active</MenuItem>
                                <MenuItem value={13002}>Inactive</MenuItem>
                                </Select>
                            </StyledFormControl>
                        </UpdateForm>
                    </UpdateWrapper>
                </>
                }
            </ModalContentWrapper>

            <ModalButtonWrapper>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
                <ModalButton blue onClick={handleEditItem}>Cập nhật</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default EditModal;