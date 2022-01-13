import React from 'react';
import styled from "styled-components";
import NotificationButton from '../components/Header/NotificationButton';
import DirectionButton from '../components/Header/DirectionButton';
import Avatar from '../components/Header/Avatar';

const Row = styled.div`
    display: flex;
`;

const Wrapper = styled.div`
    width: 100%;
    padding: 12x 0px;
    border-bottom: 1px solid #dee2e6;
`;

const FloatRight = styled.div`
    float: right;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const Header = () => {
    return (
        <Row>
            <Wrapper>
                <FloatRight>
                    <NotificationButton />
                    <DirectionButton />
                    <Avatar />
                </FloatRight>
            </Wrapper>
        </Row>
    );
}

export default Header;