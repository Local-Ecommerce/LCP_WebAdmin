import React, { useState } from 'react';
import styled from 'styled-components';
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
    display: flex;
    align-items: center;
`;

const ContainerWrapper = styled.div`
    margin: 20px;
    padding: 20px 40px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Form = styled.form`
    padding: 20px;
    margin: 0 auto;
    width: 50%;
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 20px;
`;

const ItemLabel = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
`;

const ItemInput = styled.input`
    border: none;
    height: 30px;
    border-bottom: 1px solid gray;
    outline: none;

    &: focus {
    outline: none;
    }
`;

const ItemTextArea = styled.textarea`
    border: none;
    height: 60px;
    border-bottom: 1px solid gray;
    outline: none;

    &: focus {
    outline: none;
    }
`;

const AddButton = styled.button`
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

const SuccessSpan = styled.span`
    font-size: 18px;
    font-weight: 600;
    display: inline-block;
    padding: 0.25em 0.4em;
    margin-left: 20px;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
    color: #fff;
    background-color: #dc3545;
`;

const AddPoi = () => {
    const [success, setSuccess] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const showSuccess = async () => {
        await setSuccess(true);
        document.getElementById("form").reset();
        await delay(3000);
        setSuccess(false);
    };

    const handleAddPoi = (event) => {
        event.preventDefault();
        const url = "poi/create";

        const addPoi = async () => {
            try {
                const res = await fetch(publicRequest(url), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: event.target.elements.title.value,
                        text: event.target.elements.text.value,
                        marketManagerId: event.target.elements.marketManagerId.value,
                        apartmentId: event.target.elements.apartmentId.value
                    })
                });
                const json = await res.json();
                if (json.ResultMessage === "SUCCESS") {
                    showSuccess();
                }
            } catch (error) { }
        };
        addPoi();
    }

    return (
        <div>
            <Title>
                <StyledLink to={"/pois"}>POIs </StyledLink>
                &nbsp;/ Tạo POI mới
                { success ? <SuccessSpan>Tạo mới thành công</SuccessSpan> : null }
            </Title>
            
            <ContainerWrapper>
                <Form onSubmit={handleAddPoi} id="form">
                    <Item>
                        <ItemLabel>Tựa đề</ItemLabel>
                        <ItemInput type="text" name="title" />
                    </Item>

                    <Item>
                        <ItemLabel>Nội dung</ItemLabel>
                        <ItemTextArea type="text" name="text" />
                    </Item>

                    <Item>
                        <ItemLabel>ID Quản lý</ItemLabel>
                        <ItemInput type="text" name="marketManagerId" />
                    </Item>

                    <Item>
                        <ItemLabel>ID Chung cư</ItemLabel>
                        <ItemInput type="text" name="apartmentId" />
                    </Item>

                    <AddButton>Tạo cửa hàng</AddButton>
                </Form>

            </ContainerWrapper>
        </div>
    )
}

export default AddPoi;