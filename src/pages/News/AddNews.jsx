import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { TextField, Autocomplete, Box } from '@mui/material';

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
    padding: 20px;
    margin: 0 auto;
    width: 50%;
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
    let history = useHistory();
    const [autocomplete, setAutocomplete] = useState([]); //autocomplete

    const [createTitle, setCreateTitle] = useState(null);
    const [createText, setCreateText] = useState(null);
    const [createApartment, setCreateApartment] = useState({ApartmentId: null});

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
        if (checkValid(createTitle, createApartment.ApartmentId)) {
            const url = "news/create";

            const addNews = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            title: createTitle,
                            text: createText,
                            residentId: null,
                            apartmentId: createApartment.ApartmentId
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        history.push('/news', {name: createTitle} );
                    }
                } catch (error) { }
            };
            addNews();
        }
    }

    const checkValid = (title, apartmentId) => {
        if (title === null || title === '') {
            setCreateTitle('');
            return false;
        }
        if (apartmentId === null || apartmentId === '') {
            setCreateApartment({ApartmentId: ''});
            return false;
        }
        return true;
    }

    return (
        <div>
            <Title>
                <StyledLink to={"/news"}>News </StyledLink>/ Tạo tin mới   
            </Title>
            
            <ContainerWrapper>
                <Form onSubmit={handleAddNews} id="form">
                    <StyledTextField
                        fullWidth 
                        value={createTitle}
                        onChange={event => setCreateTitle(event.target.value)}
                        error={createTitle === ''}
                        helperText={createTitle === '' ? 'Vui lòng nhập tựa đề' : ''}
                        label="Tựa đề" 
                    />

                    <StyledTextField
                        fullWidth multiline rows={4}
                        value={createText}
                        onChange={event => setCreateText(event.target.value)}
                        label="Nội dung" 
                    />

                    <StyledAutocomplete
                        onChange={(event, value) => setCreateApartment(value)}
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
                        renderInput={(params) => <StyledTextField  {...params} label="Chung cư"
                                                                    error={createApartment.ApartmentId === ''}
                                                                    helperText={createApartment.ApartmentId === '' ? 'Vui lòng chọn chung cư' : ''} />}
                    />

                    <AddButton>Tạo cửa hàng</AddButton>
                </Form>

            </ContainerWrapper>
        </div>
    )
}

export default AddNews;