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

const CollectionDetailWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const CollectionUpdateWrapper = styled.div`
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

const EditCollection = () => {
    const { id } = useParams();
    const [item, setItem] = useState({ Resident: { ResidentName: '' } });
    const [updateName, setUpdateName] = useState('');

    const [success, setSuccess] = useState(false);
    let activeCheck = '';
    let activeLabel = '';

    useEffect(() => {
        const url = "collection/" + id;

        const fetchCollection = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setItem(json.Data);
                setUpdateName(json.Data.CollectionName);
            } catch (error) { }
        };
        fetchCollection();
    }, [id, success]);

    const handleEditCollection = (event) => {
        event.preventDefault();
        if (validCheck(updateName)) {
            const url = "collection/" + id;

            const updateCollection = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            collectionName: updateName,
                            residentId: item.Resident.ResidentId
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Cập nhật thành công " + item.CollectionName + "!", {
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
        case 8001:
            activeCheck = 'active';
            activeLabel = 'Active';
            break;
        case 8002:
            activeCheck = 'inactive';
            activeLabel = 'Inactive';
            break;
        case 8004:
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
            <Title><StyledLink to={"/collections"}>
                Bộ sưu tập</StyledLink> / {item.CollectionName}    
            </Title>

            <ContainerWrapper>
                <CollectionDetailWrapper>
                    <UpdateTitle>
                        Chi tiết
                    </UpdateTitle>

                    <DetailBottom>

                        <DetailTitle>Tên bộ sưu tập</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.CollectionName}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Mã bộ sưu tập</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.CollectionId}</DetailInfoText>
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
                            <DetailInfoText>{item.Resident.ResidentName}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Trạng thái</DetailTitle>
                        <DetailInfo>
                            <DetailStatus active={activeCheck}>{activeLabel}</DetailStatus>
                        </DetailInfo>

                    </DetailBottom>
                </CollectionDetailWrapper>


                <CollectionUpdateWrapper>
                    <UpdateTitle>Chỉnh sửa</UpdateTitle>

                    <UpdateForm onSubmit={handleEditCollection}>
                        <StyledTextField
                            value={updateName}
                            onChange={event => setUpdateName(event.target.value)}
                            error={updateName === ''}
                            helperText={updateName === '' ? 'Vui lòng nhập tên bộ sưu tập' : ''}
                            label="Tên bộ sưu tập" 
                        />
                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </CollectionUpdateWrapper>
            </ContainerWrapper>
        </div>
    )
}

export default EditCollection;