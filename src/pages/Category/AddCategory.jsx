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
    width: 40%;
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

const StyledTextField = styled(TextField)``;

const StyledAutocomplete = styled(Autocomplete)`
    margin-top: 30px;
`;

const AddCategory = () => {
    let history = useHistory();
    const [itemList, setItemList] = useState([]);

    const [createName, setCreateName] = useState(null);
    const [createBelong, setCreateBelong] = useState({SystemCategoryId: null});

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
        if (checkValid(createName)) {
            const url = "systemCategory/create";

            const addCategory = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            sysCategoryName: createName,
                            belongTo: createBelong.SystemCategoryId || null
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        history.push('/categories', {name: createName} );
                    }
                } catch (error) { }
            };
            addCategory();
        }
    }

    const checkValid = (name) => {
        if (name === null || name === '') {
            setCreateName('');
            return false;
        }
        return true;
    }

    return (
        <div>
            <Title>
                <StyledLink to={"/categories"}>Danh mục </StyledLink> / Tạo danh mục mới
            </Title>
            
            <ContainerWrapper>
                <Form onSubmit={handleAddCategory} id="form">
                    <StyledTextField
                        fullWidth 
                        value={createName}
                        onChange={event => setCreateName(event.target.value)}
                        error={createName === ''}
                        helperText={createName === '' ? 'Vui lòng nhập tên danh mục' : ''}
                        label="Tên danh mục" 
                    />

                    <StyledAutocomplete
                        onChange={(event, value) => setCreateBelong(value)}
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
                        renderInput={(params) => <StyledTextField  {...params} label="Danh mục cha" 
                                                    helperText="Để trống để tạo danh mục nền" />}
                    />

                    <AddButton>Tạo danh mục</AddButton>
                </Form>

            </ContainerWrapper>
        </div>
    )
}

export default AddCategory;