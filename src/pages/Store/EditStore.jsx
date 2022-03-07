import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { KeyboardBackspace } from '@mui/icons-material';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';
import * as Constant from '../../Constant';

const PageWrapper = styled.div`
    width: 1080px;
    margin: 40px auto;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
`;

const StyledBackIcon = styled(KeyboardBackspace)`
    && {
        color: #727272;
        padding: 5px;
        border: 1px solid #727272;
        border-radius: 4px;
    }
`;

const TitleGrey = styled.span`
    color: #727272;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 20px;
`;

const ContainerWrapper = styled.div`
    display: flex;
`;

const DetailWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const UpdateWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
    position:relative;
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
    margin: 10px;
    color: #444;
`;

const DetailInfoText = styled.span`
    display: block;
    margin: 10px;
`;

const DetailStatus = styled.span`
    display: inline-block;
    padding: 8px 10px;
    margin: 0px 10px;
    font-size: 0.9;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    color: #fff;
    background-color: ${
    props => props.active === "verified" ? "#28a745"
        :
        props.active === "unverified" ? "#FF8800"
            :
            props.active === "deleted" ? "#dc3545"
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

const EditStore = () => {
    const { id } = useParams();
    const [item, setItem] = useState({ Resident: {ResidentName: ''}, Apartment: {Address: ''} });

    const [input, setInput] = useState({
        name: '',
        status: Constant.VERIFIED_MERCHANT_STORE
    })
    const [error, setError] = useState({
        nameError: ''
    });
    const [success, setSuccess] = useState(false);
    let activeCheck = '';
    let activeLabel = '';

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    useEffect(() => {
        const url = "store/" + id;

        const fetchStore = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setItem(json.Data);
                setInput({
                    name: json.Data.StoreName,
                    status: json.Data.Status
                });
            } catch (error) { }
        };
        fetchStore();
    }, [id, success]);

    const handleEditStore = (event) => {
        event.preventDefault();
        if (validCheck()) {
            const url = "store/" + id;

            const updateCollection = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            storeName: input.name,
                            status: input.status,
                            apartmentId: item.ApartmentId
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Cập nhật thành công " + input.name + "!", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        notify();
                        setSuccess(!success);
                    }
                } catch (error) { }
            };
            updateCollection();
        }
    }

    const validCheck = () => {
        let check = false;
        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, nameError: 'Vui lòng nhập tên cửa hàng' }));
            check = true;
        }
        if (!(input.status === Constant.VERIFIED_MERCHANT_STORE || input.status === Constant.DELETED_MERCHANT_STORE || input.status === Constant.REJECTED_MERCHANT_STORE || input.status === Constant. UNVERIFIED_MERCHANT_STORE)) {
            check = true;
        }
        if (check === true) {
            return false;
        }
        setError(error => ({ ...error, nameError: '' }));
        return true;
    }

    switch (item.Status) {
        case Constant.DELETED_MERCHANT_STORE:
            activeCheck = 'deleted';
            activeLabel = 'Deleted';
            break;
        case Constant.VERIFIED_MERCHANT_STORE:
            activeCheck = 'verified';
            activeLabel = 'Verified';
            break;
        case Constant.UNVERIFIED_MERCHANT_STORE:
            activeCheck = 'unverified';
            activeLabel = 'Unverified';
            break;
        case Constnat.UNVERIFIED_MERCHANT_STORE:
            activeCheck = 'unverified';
            activeLabel = 'Unverified';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/stores"><StyledBackIcon /></Link>
                <Title><TitleGrey>Cửa hàng </TitleGrey>/ {item.StoreName}</Title>
            </Row>

            <ContainerWrapper>
                <DetailWrapper>
                    <UpdateTitle>
                        Chi tiết
                    </UpdateTitle>

                    <DetailBottom>

                        <DetailTitle>Tên cửa hàng</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.StoreName}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Mã cửa hàng</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.MerchantStoreId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Ngày tạo</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{DateTime.fromISO(item.CreatedDate).toLocaleString(DateTime.DATETIME_SHORT)}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Chủ cửa hàng</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.Resident.ResidentName}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Thuộc chung cư</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.Apartment.Address}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Trạng thái</DetailTitle>
                        <DetailInfo>
                            <DetailStatus active={activeCheck}>{activeLabel}</DetailStatus>
                        </DetailInfo>

                    </DetailBottom>
                </DetailWrapper>


                <UpdateWrapper>
                    <UpdateTitle>Chỉnh sửa</UpdateTitle>

                    <UpdateForm onSubmit={handleEditStore}>
                        <StyledTextField
                            fullWidth 
                            value={input.name ? input.name : ''} name='name'
                            onChange={handleChange}
                            error={error.nameError !== ''}
                            helperText={error.nameError}
                            label="Tên cửa hàng" 
                        />

                        <StyledFormControl>
                            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                            <Select 
                                value={input.status} name='status'
                                label="Trạng thái"
                                onChange={handleChange}
                            >
                            <MenuItem value={Constant.VERIFIED_MERCHANT_STORE}>Active</MenuItem>
                            <MenuItem value={Constant.DELETED_MERCHANT_STORE}>Deleted</MenuItem>
                            <MenuItem value={Constant.UNVERIFIED_MERCHANT_STORE} disabled>Unverified Create</MenuItem>
                            <MenuItem value={Constant.UNVERIFIED_MERCHANT_STORE} disabled>Unverified Update</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </UpdateWrapper>
            </ContainerWrapper>
        </PageWrapper>
    )
}

export default EditStore;