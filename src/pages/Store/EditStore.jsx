import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #727272;
`;

const Title = styled.h1`
    font-size: 30px;
    color: #383838;
    margin: 15px;
`;

const ContainerWrapper = styled.div`
    display: flex;
    margin-top: 20px;
`;

const StoreDetailWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const StoreUpdateWrapper = styled.div`
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
    const [updateName, setUpdateName] = useState('');

    const [success, setSuccess] = useState(false);
    let activeCheck = '';
    let activeLabel = '';

    useEffect(() => {
        const url = "store/" + id;

        const fetchStore = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setItem(json.Data);
                setUpdateName(json.Data.StoreName);
            } catch (error) { }
        };
        fetchStore();
    }, [id, success]);

    const handleEditStore = (event) => {
        event.preventDefault();
        if (validCheck(updateName)) {
            const url = "store/" + id;

            const updateCollection = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            storeName: updateName,
                            residentId: item.ResidentId,
                            apartmentId: item.ApartmentId
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Cập nhật thành công " + item.StoreName + "!", {
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

    const validCheck = (name) => {
        if (name === null || name === '') {
            return false;
        }
        return true;
    }

    switch (item.Status) {
        case 6004:
            activeCheck = 'deleted';
            activeLabel = 'Deleted';
            break;
        case 6005:
            activeCheck = 'verified';
            activeLabel = 'Verified';
            break;
        case 6006:
            activeCheck = 'unverified';
            activeLabel = 'Unverified';
            break;
        case 6007:
            activeCheck = 'unverified';
            activeLabel = 'Unverified';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
    }

    return (
        <div>
            <Title><StyledLink to={"/stores"}>Danh sách cửa hàng</StyledLink> / {item.StoreName} </Title>

            <ContainerWrapper>
                <StoreDetailWrapper>
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
                </StoreDetailWrapper>


                <StoreUpdateWrapper>
                    <UpdateTitle>Chỉnh sửa</UpdateTitle>

                    <UpdateForm onSubmit={handleEditStore}>
                        <StyledTextField
                            value={updateName}
                            onChange={event => setUpdateName(event.target.value)}
                            error={updateName === ''}
                            helperText={updateName === '' ? 'Vui lòng nhập tên cửa hàng' : ''}
                            label="Tên cửa hàng" 
                        />

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </StoreUpdateWrapper>
            </ContainerWrapper>
        </div>
    )
}

export default EditStore;