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
    && {
    margin-top: 30px;
    }
`;

const AddStore = () => {
    let history = useHistory();
    const [residentList, setResidentList] = useState([]);   //autocomplete
    const [apartmentList, setApartmentList] = useState([]); //autocomplete

    const [createName, setCreateName] = useState(null);
    const [createResident, setCreateResident] = useState({ResidentId: null});
    const [createApartment, setCreateApartment] = useState({ApartmentId: null});

    useEffect (() => {
        const url = "systemCategory/autocomplete";

        const fetchResidentAutocomplete = async () => {
            try {
                const res = await fetch(publicRequest(url), { method: 'GET' });
                const json = await res.json();
                setResidentList(json.Data);
            } catch (error) { }
        };
        fetchResidentAutocomplete();
    }, []);

    useEffect (() => {
        const url = "systemCategory/autocomplete";

        const fetchApartmentAutocomplete = async () => {
            try {
                const res = await fetch(publicRequest(url), { method: 'GET' });
                const json = await res.json();
                setApartmentList(json.Data);
            } catch (error) { }
        };
        fetchApartmentAutocomplete();
    }, []);

    const handleAddStore = (event) => {
        event.preventDefault();
        if (checkValid(createName, createResident.ResidentId, createApartment.ApartmentId)) {
            const url = "store/create";

            const addStore = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            storeName: createName,
                            residentId: 'M001',
                            apartmentId: 'AP001'
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        history.push('/stores', {name: createName} );
                    }
                } catch (error) { }
            };
            addStore();
        }
    }

    const checkValid = (name, residentId, apartmentId) => {
        if (name === null || name === '') {
            setCreateName('');
            return false;
        }
        if (residentId === null || residentId === '') {
            return false;
        }
        if (apartmentId === null || apartmentId === '') {
            return false;
        }
        return true;
    }

    return (
        <div>
            <Title>
                <StyledLink to={"/stores"}>Danh sách cửa hàng</StyledLink> / Tạo cửa hàng mới
            </Title>

            <ContainerWrapper>
                <Form onSubmit={handleAddStore} id="form">
                    <StyledTextField
                        fullWidth 
                        value={createName}
                        onChange={event => setCreateName(event.target.value)}
                        error={createName === ''}
                        helperText={createName === '' ? 'Vui lòng nhập tên cửa hàng' : ''}
                        label="Tên cửa hàng" 
                    />

                    <StyledAutocomplete
                        onChange={(event, value) => setCreateResident(value)}
                        selectOnFocus clearOnBlurbhandleHomeEndKeys disablePortal
                        getOptionLabel={(item) => item.SysCategoryName}
                        options={residentList}
                        renderOption={(props, item) => {
                            return (
                                <Box {...props} key={item.SystemCategoryId}>
                                    {item.SysCategoryName}&nbsp; <small>- {item.SystemCategoryId}</small>
                                </Box>
                            );
                          }}
                        renderInput={(params) => <StyledTextField  {...params} label="Chủ cửa hàng"  />}
                    />

                    <StyledAutocomplete
                        onChange={(event, value) => setCreateApartment(value)}
                        selectOnFocus clearOnBlurbhandleHomeEndKeys disablePortal
                        getOptionLabel={(item) => item.SysCategoryName}
                        options={apartmentList}
                        renderOption={(props, item) => {
                            return (
                                <Box {...props} key={item.SystemCategoryId}>
                                    {item.SysCategoryName}&nbsp; <small>- {item.SystemCategoryId}</small>
                                </Box>
                            );
                          }}
                        renderInput={(params) => <StyledTextField  {...params} label="Chung cư" />}
                    />

                    <AddButton>Tạo cửa hàng</AddButton>
                </Form>

            </ContainerWrapper>
        </div>
    )
}

export default AddStore;