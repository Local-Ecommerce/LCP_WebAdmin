import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";
import { publicRequest } from "../RequestMethod";
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

const CollectionDetail = () => {
    const { id } = useParams();
    const [collection, setCollection] = useState({});
    const [data, setData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const url = "collection/" + id;

        const fetchCollection = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setCollection(json.Data);
            } catch (error) { }
        };
        fetchCollection();
    }, [id, collection]);

    useEffect(() => {
        const url = "collection/" + id + "/products";

        const fetchProducts = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setData(json.Data);
            } catch (error) { }
        };
        fetchProducts();

        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [data, itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % data.length;
        setItemOffset(newOffset);
    };

    const handleDeleteItem = (id) => {
        setData(data.filter((item) => collection.id !== id));
    };

    return (
        <div>
            <Title><StyledLink to={"/collections"}>Bộ sưu tập</StyledLink> / {collection.CollectionName}</Title>

            <ProductList
                currentItems={currentItems}
                handlePageClick={handlePageClick}
                pageCount={pageCount}
                handleDeleteItem={handleDeleteItem}
            />
        </div>
    )
}

export default CollectionDetail;