import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
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

const EditCategory = () => {
    const { id } = useParams();
    const [item, setItem] = useState({SysCategoryName: '', SystemCategoryId: '', 
                                      ApproveBy: '', BelongTo: '', InverseBelongToNavigation: [], Status: 0});
    const [input, setInput] = useState({
        name: '',
        status: 3001
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
        const url = "systemCategory/" + id;

        const fetchCategory = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setItem(json.Data);
                setInput({
                    name: json.Data.SysCategoryName,
                    status: json.Data.Status
                });
            } catch (error) { }
        };
        fetchCategory();
    }, [id, success]);

    const handleEditCategory = (event) => {
        event.preventDefault();
        if (validCheck()) {
            const url = "systemCategory/" + id;

            const updateCategory = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            sysCategoryName: input.name,
                            type: item.Type,
                            status: input.status,
                            belongTo: item.BelongTo
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Cập nhật thành công " + item.SysCategoryName + "!", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        notify();
                        setSuccess(!success);
                    }
                } catch (error) { }
            };
            updateCategory();
        }
    }

    const validCheck = () => {
        let check = false;
        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, nameError: 'Vui lòng nhập tên danh mục' }));
            check = true;
        }
        if (check === true) {
            return false;
        }
        setError(error => ({ ...error, nameError: '' }));
        return true;
    }

    switch (item.Status) {
        case 3001:
            activeCheck = 'active';
            activeLabel = 'Active';
            break;
        case 3002:
            activeCheck = 'inactive';
            activeLabel = 'Inactive';
            break;
        case 3004:
            activeCheck = 'deleted';
            activeLabel = 'Deleted';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/categories"><StyledBackIcon /></Link>
                <Title><TitleGrey>Danh mục </TitleGrey>/ {item.SysCategoryName}</Title>
            </Row>

            <ContainerWrapper>
                <DetailWrapper>
                    <UpdateTitle>
                        Chi tiết
                    </UpdateTitle>

                    <DetailBottom>

                        <DetailTitle>Tên bộ sưu tập</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.SysCategoryName}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Mã bộ sưu tập</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.SystemCategoryId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Được duyệt bởi</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.ApproveBy}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Danh mục cha</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.BelongTo !== null ? item.BelongTo : "N/A"}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Danh mục con</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.InverseBelongToNavigation === [] ? item.InverseBelongToNavigation : "N/A"}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Trạng thái</DetailTitle>
                        <DetailInfo>
                            <DetailStatus active={activeCheck}>{activeLabel}</DetailStatus>
                        </DetailInfo>

                    </DetailBottom>
                </DetailWrapper>


                <UpdateWrapper>
                    <UpdateTitle>Chỉnh sửa</UpdateTitle>

                    <UpdateForm onSubmit={handleEditCategory}>
                        <StyledTextField
                            value={input.name ? input.name : ''} name='name'
                            onChange={handleChange}
                            error={error.nameError !== ''}
                            helperText={error.nameError}
                            label="Tên danh mục" 
                        />

                        <StyledFormControl>
                            <InputLabel>Trạng thái</InputLabel>
                            <Select 
                                value={input.status} name='status'
                                label="Trạng thái"
                                onChange={handleChange}
                            >
                            <MenuItem value={3001}>Active</MenuItem>
                            <MenuItem value={3002}>Inactive</MenuItem>
                            <MenuItem value={3004}>Deleted</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </UpdateWrapper>
            </ContainerWrapper>
        </PageWrapper>
    )
}

export default EditCategory;