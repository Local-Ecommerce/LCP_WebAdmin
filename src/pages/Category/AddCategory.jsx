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

const StyledAutocomplete = styled(Autocomplete)`
`;

const AddCategory = () => {
    let navigate = useNavigate();
    const [itemList, setItemList] = useState([]);

    const [input, setInput] = useState({
        name: '',
        belongTo: '',
    })
    const [error, setError] = useState({
        nameError: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    useEffect (() => {
        const url = "systemCategory/autocomplete";

        const fetchAutocomplete = async () => {
            try {
                const res = await fetch(publicRequest(url), { method: 'GET' });
                const json = await res.json();
                setItemList(json.Data);
            } catch (error) { }
        };
        fetchAutocomplete();
    }, []);

    const handleAddCategory = (event) => {
        event.preventDefault();
        if (validCheck()) {
            const url = "systemCategory";

            const addCategory = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            sysCategoryName: input.name,
                            belongTo: input.belongTo.SystemCategoryId || null
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        navigate('/categories', { state: { name: input.name } } );
                    }
                } catch (error) { }
            };
            addCategory();
        }
    }

    const validCheck = () => {
        let check = false;
        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, nameError: 'Vui lòng nhập tên danh mục' }));
            check = true;
        }
        if (check === true) {
            return false;
        }
        setError(error => ({ ...error, nameError: '' }));
        return true;
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/categories"><StyledBackIcon /></Link>
                <Title><TitleGrey>Danh mục </TitleGrey>/ Tạo danh mục mới</Title>
            </Row>
            
            <ContainerWrapper>
                <Form onSubmit={handleAddCategory} id="form">
                    <FormLabel>Tên danh mục</FormLabel>
                    <StyledTextField
                        fullWidth 
                        value={input.name ? input.name : ''} name='name'
                        onChange={handleChange}
                        error={error.nameError !== ''}
                        helperText={error.nameError}
                    />

                    <FormLabel>Danh mục cha</FormLabel>
                    <StyledAutocomplete
                        onChange={(event, value) => setInput(input => ({ ...input, belongTo: value }))}
                        selectOnFocus clearOnBlurbhandleHomeEndKeys disablePortal
                        getOptionLabel={(item) => item.SysCategoryName}
                        options={itemList}
                        renderOption={(props, item) => {
                            return (
                                <Box {...props} key={item.SystemCategoryId}>
                                    <small>[Level {item.CategoryLevel}]</small>&nbsp;{item.SysCategoryName}
                                </Box>
                            );
                          }}
                        renderInput={(params) => <StyledTextField  {...params}
                                                    helperText="Để trống để tạo danh mục nền" />}
                    />

                    <AddButton>Tạo danh mục</AddButton>
                </Form>

            </ContainerWrapper>
        </PageWrapper>
    )
}

export default AddCategory;