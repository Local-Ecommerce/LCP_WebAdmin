import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { KeyboardBackspace } from '@mui/icons-material';

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

const AddApartment = () => {

    return (
        <PageWrapper>
            <Row>
                <Link to="/apartments"><StyledBackIcon /></Link>
                <Title><TitleGrey>Chung cư </TitleGrey>/ Tạo chung cư mới</Title>
            </Row>

            Not implement yet
        </PageWrapper>
    )
}

export default AddApartment;