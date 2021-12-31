import React from 'react';
import styled from "styled-components";

const NotificationWrapper = styled.a`
    max-width: 100%;
    position: relative;
    width: 95%;
    min-height: 1px;
    padding: 0px 15px 10px 15px;
    margin: 5px;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    align-items: flex-start;
    text-decoration: none;
`;

const NotificationBody = styled.div`
    flex: 1;
`;

const TitleText = styled.h3`
    margin-top: 8px;
    margin-bottom: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #007bff;
    font-weight: 600;
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Text = styled.p`
    color: #000;
    margin: 5px 0px 0px 0px;
`;

const NameText = styled(Text)`
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    font-size: 0.9em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const AddressText = styled(Text)`
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
    font-size: 0.9em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Image = styled.img`
    vertical-align: middle;
    width: 45px;
    height: 45pxpx;
    margin: 10px 15px 10px 0px;
    border-radius: 50%;
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
`;

const NotificationItem = ({ item }) => {
    let newLabel = '';
    if (item.status === 1) {
        newLabel = <NewLabel>Mới</NewLabel>;
    }

    return (
            <NotificationWrapper href="">
                <Image src="./images/user.png" />

                <NotificationBody>
                    <TitleText>{newLabel} {item.name}</TitleText>

                    <Row>
                        <NameText class="col-md-4 text-secondary small">{item.shopName} - {item.manager}</NameText>
                        <AddressText class="col-md-8 text-secondary small">{item.address}</AddressText>
                    </Row>
                </NotificationBody>
            </NotificationWrapper>
    );
};

export default NotificationItem;