import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
    margin-top: 20px;
`;

const CategoryDetailWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const CategoryUpdateWrapper = styled.div`
    flex: 2;
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
    background-color: ${props => props.active === "active" ? "#28a745" : "#dc3545"};
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

    const [updateName, setUpdateName] = useState('');
    const [updateStatus, setUpdateStatus] = useState(3001);

    const [success, setSuccess] = useState(false);
    let activeCheck = '';
    let activeLabel = '';

    useEffect(() => {
        const url = "systemCategory/" + id;

        const fetchCategory = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setItem(json.Data);
                setUpdateName(json.Data.SysCategoryName);
            } catch (error) { }
        };
        fetchCategory();
    }, [id, success]);

    const handleEditCategory = (event) => {
        event.preventDefault();
        if (updateName !== null && updateName !== '') {
            const url = "systemCategory/" + id;

            const updateCategory = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            sysCategoryName: updateName,
                            type: item.Type,
                            status: updateStatus,
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
        <div>
            <Title><StyledLink to={"/categories"}>
                Danh mục</StyledLink> / {item.SysCategoryName}    
            </Title>

            <ContainerWrapper>
                <CategoryDetailWrapper>
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
                </CategoryDetailWrapper>


                <CategoryUpdateWrapper>
                    <UpdateTitle>Chỉnh sửa</UpdateTitle>

                    <UpdateForm onSubmit={handleEditCategory}>
                        <StyledTextField
                            value={updateName}
                            onChange={event => setUpdateName(event.target.value)}
                            error={updateName === ''}
                            helperText={updateName === '' ? 'Vui lòng nhập tên danh mục' : ''}
                            label="Tên danh mục" 
                        />

                        <StyledFormControl>
                            <InputLabel>Trạng thái</InputLabel>
                            <Select 
                                value={updateStatus}
                                label="Trạng thái"
                                onChange={(event) => setUpdateStatus(event.target.value)}
                            >
                            <MenuItem value={3001}>Active</MenuItem>
                            <MenuItem value={3002}>Inactive</MenuItem>
                            <MenuItem value={3004}>Deleted</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </CategoryUpdateWrapper>
            </ContainerWrapper>
        </div>
    )
}

export default EditCategory;