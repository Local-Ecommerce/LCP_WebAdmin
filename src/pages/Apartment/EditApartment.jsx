import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

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
    flex-flow: wrap;
    align-items: flex-start;
    align-content: flex-start;
    margin-top: 20px;
`;

const DetailWrapper = styled.div`
    flex: 2;
`;

const ApartmentDetailWrapper = styled.div`
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const ManagerDetailWrapper = styled(ApartmentDetailWrapper)`
    margin-top: 20px;
`;

const LeftSide = styled.div`
    flex: 1;
`;

const RightSide = styled.div`
    flex: 1;
`;

const ApartmentUpdateWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`;

const ApartmentDetailBottom = styled.div`
    margin-top: 20px;
`;

const ManagerDetailBottom = styled(ApartmentDetailBottom)`
    display: flex;
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

const DetailStatus = styled.span`
    display: inline-block;
    padding: 4px 6px;
    font-size: 0.8em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
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

const EditApartment = () => {
    const { id } = useParams();
    const [item, setItem] = useState({Resident: {ResidentName: ''}, Apartment: {Address: ''}});
    const [manager, setManager] = useState({});

    const [updateName, setUpdateName] = useState('');
    const [updateStatus, setUpdateStatus] = useState(4001);

    const [success, setSuccess] = useState(false);
    let apartmentActiveCheck = '';
    let apartmentActiveLabel = '';
    let managerActiveCheck = '';
    let managerActiveLabel = '';

    useEffect(() => {
        const url = "apartment/" + id;

        const fetchApartment = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setItem(json.Data);
                setUpdateName(json.Data.Address);
                setUpdateStatus(json.Data.Status);
            } catch (error) { }
        };
        fetchApartment();
    }, [id, success]);

    useEffect(() => {
        const url = "resident/MM001";

        const fetchManager = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setManager(json.Data);
            } catch (error) { }
        };
        fetchManager();
    }, [id, success]);

    const handleEditApartment = (event) => {
        event.preventDefault();
        if (validCheck(updateName, updateStatus)) {
            const url = "apartment/" + id;

            const updateApartment = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            address: updateName,
                            lat: item.Lat,
                            long: item.Long
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Cập nhật thành công " + item.Address + "!", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        notify();
                        setSuccess(!success);
                    }
                } catch (error) { }
            };
            updateApartment();
        }
    }

    const validCheck = (name, status) => {
        if (name === null || name === '') {
            return false;
        }
        if (!(status === 4001 || status === 4002 || status === 4004)) {
            return false;
        }
        return true;
    }

    switch (item.Status) {
        case 4001:
            apartmentActiveCheck = 'active';
            apartmentActiveLabel = 'Active';
            break;
        case 4002:
            apartmentActiveCheck = 'inactive';
            apartmentActiveLabel = 'Inactive';
            break;
        case 4004:
            apartmentActiveCheck = 'deleted';
            apartmentActiveLabel = 'Deleted';
            break;
        default:
            apartmentActiveCheck = 'inactive';
            apartmentActiveLabel = 'INVALID STATUS NUMBER';
            break;
    }

    switch (manager.Status) {
        case 11001:
            managerActiveCheck = 'active';
            managerActiveLabel = 'Active';
            break;
        case 11002:
            managerActiveCheck = 'inactive';
            managerActiveLabel = 'Inactive';
            break;
        case 11004:
            managerActiveCheck = 'deleted';
            managerActiveLabel = 'Deleted';
            break;
        default:
            managerActiveCheck = 'inactive';
            managerActiveLabel = 'INVALID STATUS NUMBER';
            break;
    }

    return (
        <div>
            <Title><StyledLink to={"/apartments"}>Chung cư</StyledLink> / {item.Address}
            </Title>

            <ContainerWrapper>
                <DetailWrapper>
                    <ApartmentDetailWrapper>
                        <UpdateTitle>
                            Chi tiết chung cư
                        </UpdateTitle>

                        <ApartmentDetailBottom>
                            <DetailTitle>Địa chỉ</DetailTitle>
                            <DetailInfo>
                                <DetailInfoText>{item.Address}</DetailInfoText>
                            </DetailInfo>

                            <DetailTitle>Tọa độ</DetailTitle>
                            <DetailInfo>
                                <DetailInfoText>({item.Lat}, {item.Long})</DetailInfoText>
                            </DetailInfo>

                            <DetailTitle>Trạng thái</DetailTitle>
                            <DetailInfo>
                                <DetailStatus active={apartmentActiveCheck}>{apartmentActiveLabel}</DetailStatus>
                            </DetailInfo>
                        </ApartmentDetailBottom>
                    </ApartmentDetailWrapper>

                    <ManagerDetailWrapper>
                        <UpdateTitle>
                            Quản lí
                        </UpdateTitle>

                        <ManagerDetailBottom>
                            <LeftSide>
                                <DetailTitle>Tên</DetailTitle>
                                <DetailInfo>
                                    <DetailInfoText>{manager.ResidentName}</DetailInfoText>
                                </DetailInfo>

                                <DetailTitle>Điện thoại</DetailTitle>
                                <DetailInfo>
                                    <DetailInfoText>(+84) {manager.PhoneNumber}</DetailInfoText>
                                </DetailInfo>
                            </LeftSide>

                            <RightSide>
                                <DetailTitle>Giới tính</DetailTitle>
                                <DetailInfo>
                                    <DetailInfoText>{manager.Gender}</DetailInfoText>
                                </DetailInfo>

                                <DetailTitle>Trạng thái</DetailTitle>
                                <DetailInfo>
                                    <DetailStatus active={managerActiveCheck}>{managerActiveLabel}</DetailStatus>
                                </DetailInfo>
                            </RightSide>
                        </ManagerDetailBottom>
                    </ManagerDetailWrapper>
                </DetailWrapper>


                <ApartmentUpdateWrapper>
                    <UpdateTitle>Cập nhật chung cư</UpdateTitle>

                    <UpdateForm onSubmit={handleEditApartment}>
                        <StyledTextField
                            fullWidth 
                            value={updateName}
                            onChange={event => setUpdateName(event.target.value)}
                            error={updateName === ''}
                            helperText={updateName === '' ? 'Vui lòng nhập địa chỉ' : ''}
                            label="Địa chỉ" 
                        />

                        <StyledFormControl>
                            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                            <Select 
                                value={updateStatus}
                                label="Trạng thái"
                                onChange={(event) => setUpdateStatus(event.target.value)}
                            >
                            <MenuItem value={4001}>Active</MenuItem>
                            <MenuItem value={4002}>Inactive</MenuItem>
                            <MenuItem value={4004}>Deleted</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </ApartmentUpdateWrapper>
            </ContainerWrapper>
        </div>
    )
}

export default EditApartment;