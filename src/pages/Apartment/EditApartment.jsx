import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";
import { api } from "../../RequestMethod";
import { KeyboardBackspace } from '@mui/icons-material';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

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
    flex-flow: wrap;
    align-items: flex-start;
    align-content: flex-start;
`;

const DetailWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const LeftSide = styled.div`
    flex: 1;
`;

const RightSide = styled.div`
    flex: 1;
`;

const UpdateWrapper = styled.div`
    flex: 3;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`;

const FlexWrapper = styled.div`
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
    margin-top: ${props => props.mt ? "30px" : "0px"};
    margin-bottom: ${props => props.mb ? "20px" : "0px"};
`;

const Line = styled.div`
    margin: 30px 0px;
    border-bottom: 1px solid #C8C8C8;
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

    const [input, setInput] = useState({
        name: '',
        address: '',
        status: 4001
    })
    const [error, setError] = useState({
        nameError: '',
        addressError: ''
    });
    const [success, setSuccess] = useState(false);
    let apartmentActiveCheck = '';
    let apartmentActiveLabel = '';
    let managerActiveCheck = '';
    let managerActiveLabel = '';

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    useEffect(() => {
        const url = "apartment/" + id;

        api.get(url)
        .then(function (res) {
            setItem(res.data.Data);
            setInput({
                name: res.data.Data.ApartmentName,
                address: res.data.Data.Address,
                status: res.data.Data.Status
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [id, success]);

    useEffect(() => {
        const url = "resident/MM001";

        api.get(url)
        .then(function (res) {
            setManager(res.data.Data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [id, success]);

    const handleEditApartment = (event) => {
        event.preventDefault();
        if (validCheck()) {
            const url = "apartment/" + id;

            api.put(url, {
                apartmentName: input.name,
                address: input.address
            })
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    const notify = () => toast.success("Cập nhật thành công " + input.name + "!", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    notify();
                    setSuccess(!success);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, nameError: '', addressError: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, nameError: 'Vui lòng nhập tên chung cư' }));
            check = true;
        }
        if (input.address === null || input.address === '') {
            setError(error => ({ ...error, addressError: 'Vui lòng nhập địa chỉ chung cư' }));
            check = true;
        }
        if (!(input.status === 4001 || input.status === 4002 || input.status === 4004)) {
            check = true;
        }
        if (check === true) {
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
        case 19001:
            managerActiveCheck = 'active';
            managerActiveLabel = 'Active';
            break;
        case 19002:
            managerActiveCheck = 'inactive';
            managerActiveLabel = 'Inactive';
            break;
        case 19004:
            managerActiveCheck = 'deleted';
            managerActiveLabel = 'Deleted';
            break;
        default:
            managerActiveCheck = 'inactive';
            managerActiveLabel = 'INVALID STATUS NUMBER';
            break;
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/apartments"><StyledBackIcon /></Link>
                <Title><TitleGrey>Chung cư </TitleGrey>/ {item.ApartmentName}</Title>
            </Row>
            
            <ContainerWrapper>
                <DetailWrapper>
                    <UpdateTitle mb>Chi tiết chung cư</UpdateTitle>

                    <DetailTitle>Tên chung cư</DetailTitle>
                    <DetailInfo>
                        <DetailInfoText>{item.ApartmentName}</DetailInfoText>
                    </DetailInfo>

                    <DetailTitle>Địa chỉ</DetailTitle>
                    <DetailInfo>
                        <DetailInfoText>{item.Address}</DetailInfoText>
                    </DetailInfo>

                    <DetailTitle>Trạng thái</DetailTitle>
                    <DetailInfo>
                        <DetailStatus active={apartmentActiveCheck}>{apartmentActiveLabel}</DetailStatus>
                    </DetailInfo>

                    <Line />
                    <UpdateTitle mt mb>Quản lí</UpdateTitle>

                    <FlexWrapper>
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
                    </FlexWrapper>
                </DetailWrapper>


                <UpdateWrapper>
                    <UpdateTitle>Cập nhật chung cư</UpdateTitle>

                    <UpdateForm onSubmit={handleEditApartment}>
                        <StyledTextField
                            fullWidth
                            value={input.name ? input.name : ''} name='name'
                            onChange={handleChange}
                            error={error.nameError !== ''}
                            helperText={error.nameError}
                            label="Tên chung cư" 
                        />

                        <StyledTextField
                            fullWidth
                            value={input.address ? input.address : ''} name='address'
                            onChange={handleChange}
                            error={error.addressError !== ''}
                            helperText={error.addressError}
                            label="Địa chỉ" 
                        />

                        <StyledFormControl>
                            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                            <Select 
                                value={input.status} name='status'
                                label="Trạng thái"
                                onChange={handleChange}
                            >
                            <MenuItem value={4001}>Active</MenuItem>
                            <MenuItem value={4002}>Inactive</MenuItem>
                            <MenuItem value={4004}>Deleted</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </UpdateWrapper>
            </ContainerWrapper>
        </PageWrapper>
    )
}

export default EditApartment;