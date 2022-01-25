import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useHistory } from "react-router-dom";

const LoginFormContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: #fff;
    padding: 50px;
    width: 350px;
    height: 380px;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Form = styled.form``;

const Title = styled.h1`
    font-size: 32px;
    color: #383838;
    margin: 0px 0px 10px 0px;
`;

const BlueSpan = styled.span`
    color: #3075BA;
`;

const SmallText = styled.span`
    color: rgba(23,31,35,.64);
`;

const BottomText = styled.a`
    margin: 15px;
    display: flex;
    justify-content: center;
    text-decoration: none;
    color: #007bff;
    font-size: 0.9em;
    cursor: pointer;
`;

const TextFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
`;

const StyledButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 15px;
    cursor: pointer;
    background-color: #17a2b8;
    color: white;
    font-weight: 600;
    width: 100%;
    margin-top: 30px;

    &:active {
    box-shadow: 0 2px #666;
    transform: translateY(2px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const Login = () => {
    let history = useHistory();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if(accessToken){
            history.push("/");
        }
    });

    return (
        <LoginFormContainer>
            <Title>Welcome to <BlueSpan>LCP+</BlueSpan> </Title>
            <SmallText>Trang quản lí dành cho quản trị viên và quản lý chung cư của LCP</SmallText>
            
            <Form onSubmit={() => localStorage.setItem("accessToken", true)}>
                <TextFieldWrapper>
                    <TextField
                        fullWidth
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        error={username === ''}
                        helperText={username === '' ? 'Vui lòng nhập tài khoản' : ''}
                        label="Tài khoản"
                    />
                </TextFieldWrapper>

                <TextFieldWrapper>
                    <TextField
                        fullWidth
                        value={password}
                        type="password"
                        onChange={event => setPassword(event.target.value)}
                        error={password === ''}
                        helperText={password === '' ? 'Vui lòng nhập mật khẩu' : ''}
                        label="Mật khẩu" 
                    />
                </TextFieldWrapper>

                <StyledButton>Đăng nhập</StyledButton>
                <BottomText>Quên mật khẩu?</BottomText>
            </Form>
        </LoginFormContainer>
    )
}

export default Login;