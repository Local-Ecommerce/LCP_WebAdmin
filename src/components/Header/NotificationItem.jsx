import React from 'react';
import styled from "styled-components";
import { DateTime } from 'luxon';

const NotificationWrapper = styled.a`
    height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dee2e6;
    text-decoration: none;
    cursor: pointer;
    background-color: #fff;
    border-radius: 5px;

    &:hover {
    opacity: 0.9;
    background-color: #F5F5F5;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const Image = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const TextWrapper = styled.div`
    flex: 8;
`;

const TopText = styled.span`
    margin: 5px 0px;
    font-size: 14px;
    line-height: 1.5;
`;

const BottomText = styled.p`
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #484848;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.2;
`;

const NotificationItem = ({ item, handleGetDetailItem }) => {
    const date = DateTime.fromISO(item.UpdatedDate)
    const diff = date.diffNow(["years", "months", "days", "hours", "minutes"])
    let timeLabel = '';

    if (Math.abs(diff.toObject().years) > 0) {
        timeLabel = (Math.abs(diff.toObject().years) + ' năm trước');
    } 
    else if (Math.abs(diff.toObject().months) > 0) {
        timeLabel = (Math.abs(diff.toObject().months) + ' tháng trước');
    } 
    else if (Math.abs(diff.toObject().days) > 0) {
        timeLabel = (Math.abs(diff.toObject().days) + ' ngày trước');
    } 
    else if (Math.abs(diff.toObject().hours) > 0) {
        timeLabel = (Math.abs(diff.toObject().hours) + ' tiếng trước');
    } 
    else {
        timeLabel = Math.trunc(Math.abs(diff.toObject().minutes)) + ' phút trước';
    }

    const handleSetDetailItem = () => {
        handleGetDetailItem(item.ProductId);
    }

    return (
            <NotificationWrapper onClick={handleSetDetailItem}>
                <Image src={"./images/product1.png"} />

                <TextWrapper>
                    <TopText><b>{item.ProductName}</b> đang chờ duyệt</TopText>

                    <BottomText>{timeLabel}</BottomText>
                </TextWrapper>
            </NotificationWrapper>
    );
};

export default NotificationItem;