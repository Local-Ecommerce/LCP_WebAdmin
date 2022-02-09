import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { KeyboardBackspace } from '@mui/icons-material';
import { TextField, Autocomplete, Box } from '@mui/material';

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

const StyledAutocomplete = styled(Autocomplete)``;

const AddNews = () => {
    let navigate = useNavigate();
    const [autocomplete, setAutocomplete] = useState([]); //autocomplete

    const [input, setInput] = useState({
        title: '',
        text: '',
        apartment: ''
    })
    const [error, setError] = useState({
        titleError: '',
        apartmentError: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    useEffect (() => {
        const url = "apartment/autocomplete";

        const fetchAutocomplete = async () => {
            try {
                const res = await fetch(publicRequest(url), { method: 'GET' });
                const json = await res.json();
                setAutocomplete(json.Data);
            } catch (error) { }
        };
        fetchAutocomplete();
    }, []);

    const handleAddNews = (event) => {
        event.preventDefault();
        if (validCheck()) {
            const url = "news";

            const addNews = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            title: input.title,
                            text: input.text,
                            residentId: null,
                            apartmentId: input.apartment.ApartmentId
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        navigate('/news', { state: { name: input.title } } );
                    }
                } catch (error) { }
            };
            addNews();
        }
    }

    const validCheck = () => {
        let check = false;
        if (input.title === null || input.title === '') {
            setError(error => ({ ...error, titleError: 'Vui lòng nhập tiêu đề' }));
            check = true;
        }
        if (input.apartment === null || input.apartment === '') {
            setError(error => ({ ...error, apartmentError: 'Vui lòng chọn chung cư' }));
            check = true;
        }
        if (check === true) {
            return false;
        }
        setError(error => ({ ...error, titleError: '', apartmentError: '' }));
        return true;
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/news"><StyledBackIcon /></Link>
                <Title><TitleGrey>News </TitleGrey>/ Tạo tin mới</Title>
            </Row>
            
            <ContainerWrapper>
                <Form onSubmit={handleAddNews} id="form">
                    <FormLabel>Tiêu đề</FormLabel>
                    <StyledTextField
                        fullWidth
                        value={input.title ? input.title : ''} name='title'
                        onChange={handleChange}
                        error={error.titleError !== ''}
                        helperText={error.titleError}
                    />

                    <FormLabel>Nội dung</FormLabel>
                    <StyledTextField
                        fullWidth multiline rows={4}
                        value={input.text} name='text'
                        onChange={handleChange}
                    />

                    <FormLabel>Chung cư</FormLabel>
                    <StyledAutocomplete
                        onChange={(event, value) => setInput(input => ({ ...input, apartment: value }))}
                        selectOnFocus clearOnBlurbhandleHomeEndKeys disablePortal
                        getOptionLabel={(item) => item.Address}
                        options={autocomplete}
                        renderOption={(props, item) => {
                            return (
                                <Box {...props} key={item.ApartmentId}>
                                    {item.Address}&nbsp; <small>- {item.ApartmentId}</small>
                                </Box>
                            );
                          }}
                        renderInput={(params) => <StyledTextField  {...params}
                                            error={error.apartmentError !== ''}
                                            helperText={error.apartmentError} />}
                    />

                    <AddButton>Tạo cửa hàng</AddButton>
                </Form>

            </ContainerWrapper>
        </PageWrapper>
    )
}

export default AddNews;