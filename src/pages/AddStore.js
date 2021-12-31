import React from 'react';
import styled from 'styled-components';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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
    margin: 20px;
    padding: 20px 40px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    margin: 0px 20px 0px 20px;
    padding: 20px;
`;

const LeftSide = styled.div`
    width: 50%;
    float: right;
`;

const RightSide = styled.div`
    width: 50%;
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const ItemLabel = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
`;

const ItemInput = styled.input`
    border: none;
    width: 75%;
    height: 30px;
    border-bottom: 1px solid gray;
    outline: none;

    &: focus {
    outline: none;
    }
`;

const ItemInputTime = styled(ItemInput)`
    height: 32px;
`;

const AddButton = styled.button`
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

const InputFileWrapper = styled.div`
    margin: 30px 0px;
`;

const InputFileLabel = styled.label`
    cursor: pointer;
    border: 2px dashed #727272;
    height: 100px;
    width: 100px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #383838;
    font-size: 0.8em;

    &:active {
    border: 2px solid #727272;
    }
`;

const HiddenInputFile = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
`;

const AddStore = () => {

    return (
        <div>
            <Title><StyledLink to={"/stores"}>Danh sách cửa hàng</StyledLink> / Tạo cửa hàng mới </Title>

            <ContainerWrapper>
                <Form>
                    <LeftSide>
                        <Item>
                            <ItemLabel>Mã cửa hàng</ItemLabel>
                            <ItemInput type="text" placeholder="" />
                        </Item>

                        <Item>
                            <ItemLabel>Tên cửa hàng</ItemLabel>
                            <ItemInput type="text" placeholder="" />
                        </Item>

                        <Item>
                            <ItemLabel>Tên rút gọn</ItemLabel>
                            <ItemInput type="text" placeholder="" />
                        </Item>

                        <Item>
                            <ItemLabel>Địa chỉ</ItemLabel>
                            <ItemInput type="text" placeholder="" />
                        </Item>

                        <Item>
                            <ItemLabel>Quản lí</ItemLabel>
                            <ItemInput type="text" placeholder="" />
                        </Item>

                    </LeftSide>


                    <RightSide>

                        <Item>
                            <ItemLabel>Giờ mở cửa</ItemLabel>
                            <ItemInputTime type="time" id="appt" name="appt" min="00:00" max="24:00" value="00:00" />
                        </Item>

                        <Item>
                            <ItemLabel>Giờ đóng cửa</ItemLabel>
                            <ItemInputTime type="time" id="appt" name="appt" min="00:00" max="24:00" value="00:00" />
                        </Item>

                        <InputFileWrapper>
                            <InputFileLabel for="upload-photo"> <AddPhotoAlternateIcon />Thêm ảnh</InputFileLabel>
                            <HiddenInputFile type="file" id="upload-photo" />
                        </InputFileWrapper>

                        <AddButton>Tạo cửa hàng</AddButton>
                    </RightSide>
                </Form>

            </ContainerWrapper>
        </div>
    )
}

export default AddStore;