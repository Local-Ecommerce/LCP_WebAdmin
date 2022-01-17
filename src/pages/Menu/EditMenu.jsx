import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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

const MenuDetailWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const MenuUpdateWrapper = styled.div`
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

const EditMenu = () => {
    const { id } = useParams();
    const [item, setItem] = useState({ Resident: { ResidentName: '' } });
    const [updateName, setUpdateName] = useState('');
    const [updateStatus, setUpdateStatus] = useState(14001);

    const [success, setSuccess] = useState(false);
    let activeCheck = '';
    let activeLabel = '';

    useEffect(() => {
        const url = "menu/" + id;

        const fetchMenu = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setItem(json.Data);
                setUpdateName(json.Data.MenuName);
                setUpdateStatus(json.Data.Status);
            } catch (error) { }
        };
        fetchMenu();
    }, [id, success]);

    const handleEditMenu = (event) => {
        event.preventDefault();
        if (validCheck(updateName, updateStatus)) {
            const url = "menu/update/" + id;

            const updateMenu = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            menuName: updateName,
                            status: updateStatus
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Cập nhật thành công " + item.MenuName + "!", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        notify();
                        setSuccess(!success);
                    }
                } catch (error) { }
            };
            updateMenu();
        }
    }

    const validCheck = (name, status) => {
        if (name === null || name === '') {
            return false;
        }
        if (!(status === 14001 || status === 14002 || status === 14004)) {
            return false;
        }
        return true;
    };

    switch (item.Status) {
        case 14001:
            activeCheck = 'active';
            activeLabel = 'Active';
            break;
        case 14002:
            activeCheck = 'inactive';
            activeLabel = 'Inactive';
            break;
        case 14004:
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
            <Title><StyledLink to={"/menus"}>
                Danh sách bảng giá</StyledLink> / {item.MenuName}    
            </Title>

            <ContainerWrapper>
                <MenuDetailWrapper>
                    <UpdateTitle>
                        Chi tiết
                    </UpdateTitle>

                    <DetailBottom>

                        <DetailTitle>Tên bảng giá</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.MenuName}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Mã bảng giá</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.MenuId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Ngày tạo</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{DateTime.fromISO(item.CreatedDate).toLocaleString(DateTime.DATETIME_SHORT)}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Lần cuối cập nhật</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{DateTime.fromISO(item.UpdatedDate).toLocaleString(DateTime.DATETIME_SHORT)}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Chủ cửa hàng</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.ResidentId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Trạng thái</DetailTitle>
                        <DetailInfo>
                            <DetailStatus active={activeCheck}>{activeLabel}</DetailStatus>
                        </DetailInfo>

                    </DetailBottom>
                </MenuDetailWrapper>


                <MenuUpdateWrapper>
                    <UpdateTitle>Chỉnh sửa</UpdateTitle>

                    <UpdateForm onSubmit={handleEditMenu}>
                        <StyledTextField
                            value={updateName}
                            defaultValue={updateName}
                            onChange={event => setUpdateName(event.target.value)}
                            error={updateName === ''}
                            helperText={updateName === '' ? 'Vui lòng nhập tên bộ sưu tập' : ''}
                            label="Tên bộ sưu tập" 
                        />

                        <StyledFormControl>
                            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                            <Select 
                                value={updateStatus}
                                label="Trạng thái"
                                onChange={(event) => setUpdateStatus(event.target.value)}
                            >
                            <MenuItem value={14001}>Active</MenuItem>
                            <MenuItem value={14002}>Inactive</MenuItem>
                            <MenuItem value={14004}>Deleted</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </MenuUpdateWrapper>
            </ContainerWrapper>
        </div>
    )
}

export default EditMenu;