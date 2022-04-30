import React from 'react';
import styled from "styled-components";
import { DateTime } from 'luxon';
import { Circle, HideImage } from '@mui/icons-material';

const NotificationWrapper = styled.div`
    height: 50px;
    padding: 8px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    color: ${props => props.theme.black};
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

const TextWrapper = styled.div`
`;

const TopText = styled.span`
    margin: 3px 0px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: ${props => props.disabled ? props.theme.grey : props.theme.black};
`;

const BottomText = styled.p`
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #484848;
    font-size: 12px;
    font-weight: 400;
`;

const SeenWrapper = styled.div`
    margin-left: auto;
`;

const StyledSeenCircle = styled(Circle)`
    && {
        margin: 6px;
        font-size: 12px;
        color: #1976d2;
        opacity: ${props => props.checked ? 1 : 0};
    }
`;

const Image = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 3px;
    margin-right: 10px;
`;

const StyledNoImageIcon = styled(HideImage)`
    && {
        color: rgba(0,0,0,0.2);
        font-size: 20px;
        padding: 10px;
        border-radius: 3px;
        border: 1px solid rgba(0,0,0,0.2);
        margin-right: 10px;
    }
`;

const NotificationItem = ({ item, handleGetItem }) => {
    const date = DateTime.fromISO(item.FeedbackDate)
    const diff = date.diffNow(["years", "months", "days", "hours", "minutes"])
    let timeLabel = '';

    if (Math.abs(diff.toObject().years) >= 1) {
        timeLabel = (Math.abs(diff.toObject().years) + ' năm trước');
    } 
    else if (Math.abs(diff.toObject().months) >= 1) {
        timeLabel = (Math.abs(diff.toObject().months) + ' tháng trước');
    } 
    else if (Math.abs(diff.toObject().days) >= 1) {
        timeLabel = (Math.abs(diff.toObject().days) + ' ngày trước');
    } 
    else if (Math.abs(diff.toObject().hours) >= 1) {
        timeLabel = (Math.abs(diff.toObject().hours) + ' tiếng trước');
    } 
    else if (Math.abs(diff.toObject().minutes) > 1) {
        timeLabel = Math.trunc(Math.abs(diff.toObject().minutes)) + ' phút trước';
    } else {
        timeLabel = '1 phút trước';
    }

    const handleSetItem = (e) => {
        e.stopPropagation();
        handleGetItem(item);
    }

    return (
            <NotificationWrapper onClick={handleSetItem}>
                {
                    item.Image ?
                    <Image src={item.Image} />
                    : <StyledNoImageIcon />
                }

                <TextWrapper>
                    <TopText disabled={item.IsRead}><b>Lý Liên Kiệt đã phản hồi 1 sản phẩm.</b></TopText>

                    <BottomText>{timeLabel}</BottomText>
                </TextWrapper>

                <SeenWrapper>
                    <StyledSeenCircle checked={!item.IsRead} />
                </SeenWrapper>
            </NotificationWrapper>
    );
};

export default NotificationItem;