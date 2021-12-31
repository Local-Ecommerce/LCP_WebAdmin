import React from 'react';
import styled from "styled-components";
import NotificationButton from '../components/Header/NotificationButton';
import DirectionButton from '../components/Header/DirectionButton';
import Avatar from '../components/Header/Avatar';

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
`;

const Wrapper = styled.div`
    max-width: 100%;
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    margin: 5px;
    border-bottom: 1px solid #dee2e6;
    align-items: flex-start;
`;

const FloatRight = styled.div`
    float: right;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
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