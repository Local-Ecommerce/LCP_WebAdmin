import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";

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
    margin-top: 20px;
`;

const UpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const UpdateItemLabel = styled.label`
    margin-top: 20px;
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

    &:active {
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }

    &:hover {
        opacity: 0.8;
    }
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

const EditMenu = () => {
    const { id } = useParams();
    const [menu, setMenu] = useState({ Merchant: { MerchantName: '' } });
    const [status, setStatus] = useState(8001);
    const [success, setSuccess] = useState(false);
    const showSuccess = () => setSuccess(true);
    let activeCheck = '';
    let activeLabel = '';

    useEffect(() => {
        const url = "menu/" + id;

        const fetchMenu = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setMenu(json.Data);
            } catch (error) { }
        };
        fetchMenu();
    }, [id, success]);

    const handleEditMenu = (event) => {
        event.preventDefault();
        const url = "menu/update/" + id;

        const updateMenu = async () => {
            try {
                const res = await fetch(publicRequest(url), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        menuName: event.target.elements.menuName.value,
                        status: event.target.elements.menuStatus.value
                    })
                });
                const json = await res.json();
                if (json.ResultMessage === "SUCCESS") {
                    showSuccess();
                }
            } catch (error) { }
        };
        updateMenu();
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    switch (menu.Status) {
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
                Danh sách bảng giá</StyledLink> / {menu.MenuName}    
            </Title>

            <ContainerWrapper>
                <MenuDetailWrapper>
                    <UpdateTitle>
                        Chi tiết { success ? <SuccessSpan>Cập nhật thành công</SuccessSpan> : null }
                    </UpdateTitle>

                    <DetailBottom>

                        <DetailTitle>Tên bảng giá</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{menu.MenuName}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Mã bảng giá</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{menu.MenuId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Ngày tạo</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{menu.CreatedDate}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Lần cuối cập nhật</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{menu.UpdatedDate}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Chủ cửa hàng</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{menu.MerchantId}</DetailInfoText>
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
                        <UpdateItem>
                            <UpdateItemLabel>Tên bảng giá</UpdateItemLabel>
                            <UpdateItemInput type="text" name="menuName" defaultValue={menu.MenuName} />
                        </UpdateItem>

                        <UpdateItem>
                            <UpdateItemLabel>Trạng thái</UpdateItemLabel>
                            <UpdateItemSelect value={status} name="menuStatus" onChange={handleStatusChange}>
                                <option value="14001">Active</option>
                                <option value="14002">Inactive</option>
                                <option value="14004">Deleted</option>
                            </UpdateItemSelect>
                        </UpdateItem>

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </MenuUpdateWrapper>
            </ContainerWrapper>
        </div>
    )
}

export default EditMenu;