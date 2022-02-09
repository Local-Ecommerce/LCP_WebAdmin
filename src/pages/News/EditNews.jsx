import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { KeyboardBackspace } from '@mui/icons-material';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';

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
    flex: 3;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
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

const DetailStatus = styled.span`
    display: inline-block;
    padding: 8px 10px;
    margin: 0px 10px;
    font-size: 0.9;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
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

const EditNews = () => {
    const { id } = useParams();
    const [item, setItem] = useState({Resident: {ResidentName: ''}, Apartment: {Address: ''}});

    const [input, setInput] = useState({
        title: '',
        text: '',
        status: 12001
    })
    const [error, setError] = useState({
        titleError: ''
    });
    const [success, setSuccess] = useState(false);
    let activeCheck = '';
    let activeLabel = '';

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    useEffect(() => {
        const url = "news/" + id;

        const fetchNews = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setItem(json.Data);
                setInput({
                    title: json.Data.Title,
                    text: json.Data.Text,
                    status: json.Data.Status
                });
            } catch (error) { }
        };
        fetchNews();
    }, [id, success]);

    const handleEditNews = (event) => {
        event.preventDefault();
        if (validCheck()) {
            const url = "news/" + id;

            const updateNews = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            title: input.title,
                            text: input.text,
                            status: input.status,
                            residentId: item.ResidentId,
                            apartmentId: item.ApartmentId
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Cập nhật thành công " + input.title + "!", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        notify();
                        setSuccess(!success);
                    }
                } catch (error) { }
            };
            updateNews();
        }
    }

    const validCheck = () => {
        let check = false;
        if (input.title === null || input.title === '') {
            setError(error => ({ ...error, titleError: 'Vui lòng nhập tiêu đề' }));
            check = true;
        }
        if (!(input.status === 12001 || input.status === 12002)) {
            check = true;
        }
        if (check === true) {
            return false;
        }
        setError(error => ({ ...error, titleError: '' }));
        return true;
    }

    switch (item.Status) {
        case 12001:
            activeCheck = 'active';
            activeLabel = 'Active';
            break;
        case 12002:
            activeCheck = 'inactive';
            activeLabel = 'Inactive';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/news"><StyledBackIcon /></Link>
                <Title><TitleGrey>News </TitleGrey>/ {item.Title}</Title>
            </Row>

            <ContainerWrapper>
                <DetailWrapper>
                    <UpdateTitle>
                        Chi tiết
                    </UpdateTitle>

                    <DetailBottom>

                        <DetailTitle>News ID</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.NewsId}</DetailInfoText>
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
                            <DetailInfoText>{item.ResidentId !== null ? item.Resident.ResidentName : "Admin"}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Chung cư</DetailTitle>
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

                    <UpdateForm onSubmit={handleEditNews}>
                        <StyledTextField
                            fullWidth 
                            value={input.title ? input.title : ''} name='title'
                            onChange={handleChange}
                            error={error.titleError !== ''}
                            helperText={error.titleError}
                            label="Nội dung" 
                        />

                        <StyledTextField
                            fullWidth multiline rows={4}
                            value={input.text ? input.text : ''} name='text'
                            onChange={handleChange}
                            label="Tựa đề" 
                        />

                        <StyledFormControl>
                            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                            <Select 
                                value={input.status} name='status'
                                label="Trạng thái"
                                onChange={handleChange}
                            >
                            <MenuItem value={12001}>Active</MenuItem>
                            <MenuItem value={12002}>Inactive</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </UpdateWrapper>
            </ContainerWrapper>
        </PageWrapper>
    )
}

export default EditNews;