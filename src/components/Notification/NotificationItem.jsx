import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ContentPasteSearch } from '@mui/icons-material';

const NotificationWrapper = styled(Link)`
    padding: 15px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dee2e6;
    text-decoration: none;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const TopText = styled.h3`
    display: flex;
    align-items: center;
    font-weight: 600;
    margin: 5px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #007bff;
`;

const BottomTextLeft = styled.p`
    flex: 4;
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #000;
`;

const BottomTextRight = styled(BottomTextLeft)`
    flex: 6;
`;

const ButtonWrapper = styled.div``;

const Button = styled.button`
    padding: 3px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: grey;

    &:focus {
    outline: none;
    }
`;

const StyledSearchIcon = styled(ContentPasteSearch)`
    && {
        font-size: 30px;
    }

    &:hover {
    color: #dc3545;
    }
`;

const NewLabel = styled.span`
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    color: #fff;
    background-color: #dc3545;
    margin-right: 6px;
`;

const NotificationItem = ({ item }) => {
    return (
            <NotificationWrapper to={"/"}>
                <TextWrapper>
                    <TopText>
                        {item.status === 1 ? <NewLabel>Mới</NewLabel> : null}
                        {item.name}
                    </TopText>
                    <Row>
                        <BottomTextLeft>{item.shopName} - {item.manager}</BottomTextLeft>
                        <BottomTextRight>{item.address}</BottomTextRight>
                    </Row>
                </TextWrapper>

                <ButtonWrapper>
                    <Link to={"/"}>
                        <Button>
                            <StyledSearchIcon />
                        </Button>
                    </Link>
                </ButtonWrapper>
            </NotificationWrapper>
    );
};

export default NotificationItem;