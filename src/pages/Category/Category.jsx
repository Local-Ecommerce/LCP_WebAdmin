import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryList from '../../components/Category/CategoryList';
import AddCircle from '@mui/icons-material/AddCircle';
import { publicRequest } from "../../RequestMethod";
import { Link } from "react-router-dom";

const Title = styled.h1`
    font-size: 30px;
    color: #383838;
    margin: 15px;
`;

const CategoryListWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 50px;
`

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 31%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #E0E0E0;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
`;

const Input = styled.input`
    padding: 4px;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;
    margin-right: 8px;

    &:focus {
    outline: 0;
    }
`;

const Button = styled.button`
    height: 36px;
    width: 70px;
    background-color: #17a2b8;
    border-style: none;
    border-radius: 5px;
    color: #fff;
    &:focus {
    opacity: 0.5;
    }
`;

const SelectWrapper = styled.div`
    display: flex;
    width: ${props => props.width};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #E0E0E0;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
`;

const Select = styled.select`
    padding: 4px;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;

    &:focus {
    outline: 0;
    }
`;

const AddCategoryButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #28a745;
    height: 44px;
    width: 15%;
    border-style: none;
    border-radius: 5px;
    color: #fff;
    text-decoration: none;
    font-size: 0.9em;
    margin-left: 31%;

    &:focus {
    opacity: 0.5;
    }
`;

const AddCategoryIcon = styled(AddCircle)`
    padding-right: 5px;
`;

const Category = () => {
    const [APIdata, setAPIdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [change, setChange] = useState(false);
    const [search, setSearch] = useState(''); //search filter
    const [status, setStatus] = useState('3001'); //status filter

    useEffect(() => {
        const url = "systemCategory/all";

        const fetchData = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setAPIdata(json.Data);
            } catch (error) { }
        };
        fetchData();
    }, [change]);

    useEffect(() => {   //filter based on 'search' & 'status'
        const result = APIdata.filter((item) => {
            if (status !== '0') {
                return [item.SystemCategoryId, item.SysCategoryName].join('').toLowerCase().includes(search.toLowerCase())
                        && item.Status === parseInt(status)
            } else {
                return [item.SystemCategoryId, item.SysCategoryName].join('').toLowerCase().includes(search.toLowerCase())
            }
        })
        setFilteredData(result);
    }, [search, status, APIdata]);

    const handleSearch = (searchValue, statusValue) => {
        setSearch(searchValue);
        setStatus(statusValue);
    }

    const handleDeleteItem = (id) => {
        const url = "systemCategory/delete/" + id;
        const deleteData = async () => {
            try {
                await fetch(publicRequest(url), { method: 'PUT' });
                setChange(!change);
            } catch (error) { }
        };
        deleteData();
    };

    return (
        <div>
            <Title>Danh mục</Title>
            
            <Row>
                <ButtonWrapper>
                    <Input placeholder="Search tên danh mục" onChange={(event) => handleSearch(event.target.value, status)} />
                    <Button>Clear</Button>
                </ButtonWrapper>

                <SelectWrapper width="16%">
                    <Select value={status} onChange={(event) => handleSearch(search, event.target.value)}>
                        <option value="3001">Active</option>
                        <option value="3002">Inactive</option>
                        <option value="3004">Deleted</option>
                        <option value="0">-- Hiển thị tất cả --</option>
                    </Select>
                </SelectWrapper>

                <AddCategoryButton to={"/addCategory"}>
                    <AddCategoryIcon />
                    Tạo danh mục mới
                </AddCategoryButton>
            </Row>
            
            

            <CategoryListWrapper>
                <CategoryList currentItems={filteredData} handleDeleteItem={handleDeleteItem} />
            </CategoryListWrapper>
        </div>
    )
}

export default Category;