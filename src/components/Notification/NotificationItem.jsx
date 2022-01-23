import React from 'react';
import styled from "styled-components";
import { CancelOutlined, CheckCircleOutlined } from '@mui/icons-material';
import { DateTime } from 'luxon';

const NotificationWrapper = styled.a`
    padding: 6px 20px 10px 20px;
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
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
`;

const TextWrapper = styled.div`
    flex: 8;
`;

const TopRow = styled.span`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-weight: 600;
    margin: 5px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #007bff;
`;

const TimeWrapper = styled.div`
    flex: 1;
    margin: 0px;
    color: #484848;
    font-size: 0.8em;
    font-weight: 400;
`;

const TimeLabel = styled.span`
    float: right;
`;

const BottomText = styled.p`
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #484848;
    font-size: 0.9em;
`;

const ButtonWrapper = styled.div`
    display: flex;
    margin-left: 10px;
`;

const Button = styled.button`
    padding: 3px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: grey;

    &:focus {
    outline: none;
    }
`;

const StyledCheckIcon = styled(CheckCircleOutlined)`
    && {
        font-size: 35px;
        margin-top: 6px;
        color: #28a745;
        opacity: 0.5;
    }

    &:hover {
    opacity: 1;
    }
`;

const StyledCancelIcon = styled(CancelOutlined)`
    && {
        font-size: 35px;
        margin-top: 6px;
        color: #dc3545;
        opacity: 0.5;
    }

    &:hover {
    opacity: 1;
    }
`;

const StatusLabel = styled.span`
    margin-right: 6px;
    display: inline-block;
    padding: 3px 5px;
    font-size: 0.8em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 5px;
    color: #fff;
    background-color: ${props => props.red ? "#dc3545" : "#FF8800"};
`;

const NotificationItem = ({ item, handleRejectItem }) => {
    const date = DateTime.fromISO(item.CreatedDate)
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
        timeLabel = (Math.abs(diff.toObject().minutes) + ' phút trước');
    }

    let statusLabel = '';
    switch(item.Status) {
        case 1006:
            statusLabel = <StatusLabel red>Tạo mới</StatusLabel>
            break;
        case 1007:
            statusLabel = <StatusLabel>Cập nhật</StatusLabel>
            break;
        case 6006:
            statusLabel = <StatusLabel red>Tạo mới</StatusLabel>
            break;
        case 6007:
            statusLabel = <StatusLabel>Cập nhật</StatusLabel>
            break;
        default:
            break;
    }

    return (
            <NotificationWrapper>
                {
                (item.Status === 1006 || item.Status === 1007) ? <Image src={item.Image} /> : null
                }

                <TextWrapper>
                    <TopRow>
                        {statusLabel}
                        {
                        (item.Status === 6006) ? ('Cửa hàng【' + item.StoreName + '】chờ duyệt') :
                        (item.Status === 6007) ? ('Cửa hàng【' + item.StoreName + '】đổi tên thành【' + item.NewStoreName + '】') :
                        (item.Status === 1006) ? ('Sản phẩm【' + item.ProductName + '】chờ duyệt') :
                        (item.Status === 1007) ? ('Sản phẩm【' + item.ProductName + '】chờ cập nhật') : null
                        }                        
                    </TopRow>

                    <BottomText>• {item.StoreName} - {item.ResidentName}</BottomText>
                </TextWrapper>

                <TimeWrapper>
                    <TimeLabel>{timeLabel}</TimeLabel>
                </TimeWrapper>

                <ButtonWrapper>
                    <Button>
                        <StyledCheckIcon />
                    </Button>

                    <Button onClick={() => handleRejectItem()}>
                        <StyledCancelIcon />
                    </Button>
                </ButtonWrapper>
            </NotificationWrapper>
    );
};

export default NotificationItem;