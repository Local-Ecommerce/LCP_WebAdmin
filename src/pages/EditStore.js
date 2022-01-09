import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Link } from "react-router-dom";
import { publicRequest } from "../RequestMethod";

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
    margin-top: 10px;
`;

const UpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const UpdateItemLabel = styled.label`
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

const UpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 15px;
    cursor: pointer;
    background-color: #17a2b8;
    color: white;
    font-weight: 600;
    width: 65%;
    margin: 40px; 
    position: absolute;
    left: 0;
    bottom: 0;
`;

const SuccessSpan = styled.span`
    display: inline-block;
    padding: 0.25em 0.4em;
    margin-left: 20px;
    font-size: 50%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
    color: #fff;
    background-color: #dc3545;
`;

const EditStore = () => {
    const { id } = useParams();
    const [store, setStore] = useState({});
    const [status, setStatus] = useState(6006);
    const [success, setSuccess] = useState(false);
    const showSuccess = () => setSuccess(!success);
    let activeCheck = '';
    let activeLabel = '';

    useEffect(() => {
        const url = "store/" + id;

        const fetchStore = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setStore(json.Data);
            } catch (error) { }
        };
        fetchStore();
    }, [id, store]);

    const handleEditStore = (event) => {
        event.preventDefault();
        const url = "store/" + id;

        const updateCollection = async () => {
            try {
                const res = await fetch(publicRequest(url), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        storeName: event.target.elements.storeName.value,
                        merchantId: event.target.elements.merchantId.value,
                        aparmentId: event.target.elements.aparmentId.value
                    })
                });
            } catch (error) { }
        };
        updateCollection();
        showSuccess();
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    switch (store.Status) {
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
    }

    return (
        <div>
            <Title><StyledLink to={"/stores"}>Danh sách cửa hàng</StyledLink> / {store.StoreName} </Title>

            <ContainerWrapper>
                <StoreDetailWrapper>
                    <UpdateTitle>
                        Chi tiết {success ? <SuccessSpan>Cập nhật thành công</SuccessSpan> : null}
                    </UpdateTitle>

                    <DetailBottom>

                        <DetailTitle>Tên cửa hàng</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{store.StoreName}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Mã cửa hàng</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{store.MerchantStoreId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Ngày tạo</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{store.CreatedDate}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Chủ cửa hàng</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{store.MerchantId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Thuộc chung cư</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{store.AparmentId}</DetailInfoText>
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
                        <UpdateItem>
                            <UpdateItemLabel>Tên cửa hàng</UpdateItemLabel>
                            <UpdateItemInput type="text" name="storeName" defaultValue={store.StoreName} />
                        </UpdateItem>

                        <UpdateItem>
                            <UpdateItemLabel>Chủ cửa hàng</UpdateItemLabel>
                            <UpdateItemInput type="text" name="merchantId" defaultValue={store.MerchantId} />
                        </UpdateItem>

                        <UpdateItem>
                            <UpdateItemLabel>Thuộc chung cư</UpdateItemLabel>
                            <UpdateItemInput type="text" name="aparmentId" defaultValue={store.AparmentId} />
                        </UpdateItem>

                        <UpdateItem>
                            <UpdateItemLabel>Trạng thái</UpdateItemLabel>
                            <UpdateItemSelect value={status} name="storeStatus" onChange={handleStatusChange}>
                                <option value="6006">Active</option>
                                <option value="6007">Deactive</option>
                            </UpdateItemSelect>
                        </UpdateItem>

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </StoreUpdateWrapper>
            </ContainerWrapper>
        </div>
    )
}

export default EditStore;