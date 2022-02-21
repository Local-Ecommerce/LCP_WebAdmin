import React, { useState } from 'react';
import styled from 'styled-components';
import { api } from "../../RequestMethod";
import { Link, useNavigate } from "react-router-dom";
import { KeyboardBackspace } from '@mui/icons-material';
import { TextField } from '@mui/material';

const PageWrapper = styled.div`
    width: 720px;
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
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const FormLabel = styled.div`
    font-weight: 700;
    margin-bottom: 10px;
`;

const Form = styled.form`
    padding: 20px;
    margin: 0 auto;
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
    margin-top: 20px;

    &:active {
    box-shadow: 0 2px #666;
    transform: translateY(2px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const StyledTextField = styled(TextField)`
    && {
    margin-bottom: 30px;
    }
`;

const AddApartment = () => {
    let navigate = useNavigate();

    const [input, setInput] = useState({
        name: '',
        address: ''
    })
    const [error, setError] = useState({
        nameError: '',
        addressError: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    const handleAddApartment = (event) => {
        event.preventDefault();
        if (validCheck()) {
            const url = "apartments";

            api.post(url, {
                apartmentName: input.name,
                address: input.address
            })
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    navigate('/apartments', { state: { name: input.name } } );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, nameError: '', addressError: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, nameError: 'Vui lòng nhập tên chung cư' }));
            check = true;
        }
        if (input.address === null || input.address === '') {
            setError(error => ({ ...error, addressError: 'Vui lòng nhập địa chỉ chung cư' }));
            check = true;
        }
        if (check === true) {
            return false;
        }
        return true;
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/apartments"><StyledBackIcon /></Link>
                <Title><TitleGrey>Chung cư </TitleGrey>/ Tạo chung cư mới</Title>
            </Row>

            <ContainerWrapper>
                <Form onSubmit={handleAddApartment} id="form">
                    <FormLabel>Tên chung cư</FormLabel>
                    <StyledTextField
                        fullWidth
                        value={input.name ? input.name : ''} name='name'
                        onChange={handleChange}
                        error={error.nameError !== ''}
                        helperText={error.nameError}
                    />

                    <FormLabel>Địa chỉ</FormLabel>
                    <StyledTextField
                        fullWidth
                        value={input.address ? input.address : ''} name='address'
                        onChange={handleChange}
                        error={error.addressError !== ''}
                        helperText={error.addressError}
                    />

                    <AddButton>Tạo chung cư mới</AddButton>
                </Form>

            </ContainerWrapper>
        </PageWrapper>
    )
}

export default AddApartment;