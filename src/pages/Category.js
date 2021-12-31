import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryList from '../components/Category/CategoryList';
import Categories from '../mockdata/Categories';

const Title = styled.h1`
    font-size: 30px;
    color: #383838;
    margin: 15px;
`;

const CategoryListWrapper = styled.div`
    margin-bottom: 50px;
`

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

const Category = () =>  {
    const [data, setData] = useState(Categories);

    const handleDeleteItem = (id) => {
        setData(data.filter((item) => item.id !== id));
        console.log(data);
    };

    return (
        <div>
            <Title>Danh mục</Title>

            <ButtonWrapper>
                <Input placeholder="Search tên danh mục" />
                <Button>Clear</Button>
            </ButtonWrapper>

            <CategoryListWrapper>
                <CategoryList currentItems={data} handleDeleteItem={handleDeleteItem} />
            </CategoryListWrapper>
        </div>
    )
}

export default Category;