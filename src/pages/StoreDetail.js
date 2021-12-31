import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Stores from '../mockdata/Stores';
import { useParams } from "react-router-dom";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Link } from "react-router-dom";

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
    flex: 1;
    padding: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const StoreUpdateWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`;

const DetailTop = styled.div`
    display: flex;
    align-items: center;
`;

const DetailImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;

const DetailNameRow = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;

const DetailName = styled.span`
    font-weight: 600;
`;

const DetailShopName = styled.span`
    font-weight: 300;
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
`;

const UpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const UpdateLeftSide = styled.div`
    width: 50%;
    float: right;
`;

const UpdateRightSide = styled.div`
    width: 50%;
`;

const UpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const UpdateItemLabel = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
`;

const UpdateItemInput = styled.input`
    border: none;
    width: 75%;
    height: 30px;
    border-bottom: 1px solid gray;
    outline: none;

    &: focus {
    outline: none;
    }
`;

const UpdateItemInputTime = styled(UpdateItemInput)`
    height: 32px;
`;

const UpdateItemSelect = styled.select`
    border: none;
    width: 75%;
    height: 33px;
    border-bottom: 1px solid gray;
    outline: none;

    &: focus {
    outline: none;
    }
`;

const UpdateImageWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 15px;
`;

const UpdateImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`;

const UpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 5px;
    cursor: pointer;
    background-color: #17a2b8;
    color: white;
    font-weight: 600;
    width: 75%;
    margin-top: 10px;
`;

const StoreDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState({ collection: [], category: [] });
    const [status, setStatus] = useState(0);
    let activeCheck = '';
    let activeLabel = '';

    useEffect(() => {
        for (let i = 0; i < Stores.length; i++) {
            if (Stores[i].id === id) {
                setItem(Stores[i]);
                setStatus(Stores[i].status);
                break;
            }
        }
    }, [id, item]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    switch (item.status) {
        case 1:
            activeCheck = 'active';
            activeLabel = 'Active';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'Inactive';
            break;
    }

    return (
        <div>
            <Title><StyledLink to={"/stores"}>Danh sách cửa hàng</StyledLink> / {item.name} </Title>

            <ContainerWrapper>
                <StoreDetailWrapper>

                    <DetailTop>
                        <DetailImage src={item.image} alt="" />
                        <DetailNameRow>
                            <DetailName>{item.name}</DetailName>
                            <DetailShopName>{item.shortName}</DetailShopName>
                        </DetailNameRow>
                    </DetailTop>

                    <DetailBottom>

                        <DetailTitle>Mã cửa hàng</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.id}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Địa chỉ</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.address}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Quản lí</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.manager}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Giờ hoạt động</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.openTime} - {item.closeTime}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Trạng thái</DetailTitle>
                        <DetailInfo>
                            <DetailStatus active={activeCheck}>{activeLabel}</DetailStatus>
                        </DetailInfo>

                    </DetailBottom>
                </StoreDetailWrapper>


                <StoreUpdateWrapper>
                    <UpdateTitle>Chỉnh sửa</UpdateTitle>

                    <UpdateForm>
                        <UpdateLeftSide>
                            <UpdateItem>
                                <UpdateItemLabel>Mã cửa hàng</UpdateItemLabel>
                                <UpdateItemInput type="text" placeholder={item.id} />
                            </UpdateItem>

                            <UpdateItem>
                                <UpdateItemLabel>Tên cửa hàng</UpdateItemLabel>
                                <UpdateItemInput type="text" placeholder={item.name} />
                            </UpdateItem>

                            <UpdateItem>
                                <UpdateItemLabel>Tên rút gọn</UpdateItemLabel>
                                <UpdateItemInput type="text" placeholder={item.shortName} />
                            </UpdateItem>

                            <UpdateItem>
                                <UpdateItemLabel>Địa chỉ</UpdateItemLabel>
                                <UpdateItemInput type="text" placeholder={item.address} />
                            </UpdateItem>

                            <UpdateItem>
                                <UpdateItemLabel>Quản lí</UpdateItemLabel>
                                <UpdateItemInput type="text" placeholder={item.manager} />
                            </UpdateItem>

                        </UpdateLeftSide>


                        <UpdateRightSide>

                            <UpdateItem>
                                <UpdateItemLabel>Giờ mở cửa</UpdateItemLabel>
                                <UpdateItemInputTime type="time" id="appt" name="appt" min="00:00" max="24:00" value={item.openTime} />
                            </UpdateItem>

                            <UpdateItem>
                                <UpdateItemLabel>Giờ đóng cửa</UpdateItemLabel>
                                <UpdateItemInputTime type="time" id="appt" name="appt" min="00:00" max="24:00" value={item.closeTime} />
                            </UpdateItem>

                            <UpdateItem>
                                <UpdateItemLabel>Trạng thái</UpdateItemLabel>
                                <UpdateItemSelect value={status} onChange={handleStatusChange}>
                                    <option value="1">Active</option>
                                    <option value="0">Deactive</option>
                                </UpdateItemSelect>
                            </UpdateItem>

                            <UpdateImageWrapper>
                                <UpdateImage src={item.image} alt=""/>
                                <FileUploadIcon />
                                <input type="file" id="file" style={{ display: "none" }} />
                            </UpdateImageWrapper>

                            <UpdateButton>Cập nhật</UpdateButton>
                        </UpdateRightSide>
                    </UpdateForm>

                </StoreUpdateWrapper>
            </ContainerWrapper>
        </div>
    )
}

export default StoreDetail;