import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StoreProducts from '../mockdata/Products';
import { useParams, Link } from "react-router-dom";
import ProductList from '../components/Product/ProductList';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #727272;
`;

const Title = styled.h1`
    font-size: 30px;
    color: #383838;
    margin: 15px;
`;

const StoreDetail = () => {
    const { id } = useParams();
    const [store, setStore] = useState({});
    const [data, setData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const url = "store/" + id;

        const fetchStore = async () => {
            try {
                /* const res = await fetch(publicRequest(url));
                const json = await res.json();
                setStore(json.Data); */
                setStore({ "StoreName": "Shop Bánh mì 2 trứng BBC"});
            } catch (error) { }
        };
        fetchStore();

        //fetch products data from Store
        setData(StoreProducts);
    }, [id, store]);

    useEffect(() => {
        console.log(store);
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [data, itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % data.length;
        setItemOffset(newOffset);
    };

    const handleDeleteItem = (id) => {
        setData(data.filter((item) => store.id !== id));
    };

    return (
        <div>
            <Title><StyledLink to={"/stores"}>Danh sách cửa hàng</StyledLink> / {store.StoreName}</Title>

            <ProductList
                currentItems={currentItems}
                handlePageClick={handlePageClick}
                pageCount={pageCount}
                handleDeleteItem={handleDeleteItem}
            />
        </div>
    )
}

export default StoreDetail;