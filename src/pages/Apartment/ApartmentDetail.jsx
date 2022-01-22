import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";

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
    display: flex;
    flex-flow: wrap;
    align-items: flex-start;
    align-content: flex-start;
    margin-top: 20px;
`;

const EditApartment = () => {
    const { id } = useParams();
    const [item, setItem] = useState({Resident: {ResidentName: ''}, Apartment: {Address: ''}});

    useEffect(() => {
        const url = "apartment/" + id;

        const fetchApartment = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setItem(json.Data);
            } catch (error) { }
        };
        fetchApartment();
    }, [id]);

    return (
        <div>
            <Title><StyledLink to={"/apartments"}>Chung cư</StyledLink> / {item.Address} </Title>

            <ContainerWrapper>
                Cửa hàng chờ duyệt
            </ContainerWrapper>

            <ContainerWrapper>
                Sản phẩm chờ duyệt
            </ContainerWrapper>
        </div>
    )
}

export default EditApartment;