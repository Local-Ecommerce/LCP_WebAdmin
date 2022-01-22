import React from 'react';
import styled from "styled-components";
import { ContentPasteSearch, CheckBoxRounded } from '@mui/icons-material';
import { DateTime } from 'luxon';

const NotificationWrapper = styled.a`
    padding: 15px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dee2e6;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
        background-color: rgb(240, 240, 255);
        }
    
        &:focus {
        outline: 0;
        }
    
        &:active {
        transform: translateY(1px);
        }
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const TopRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
`;

const BottomRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const TopTextLeft = styled.h3`
    display: flex;
    font-weight: 600;
    margin: 5px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #007bff;
`;

const TopTextRight = styled.p`
    float: right;
    margin: 0px 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #484848;
    font-size: 0.8em;
    font-weight: 400;
`;

const BottomTextLeft = styled.p`
    flex: 1;
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #484848;
    font-size: 0.9em;
`;

const BottomTextRightFlex2 = styled(BottomTextLeft)`
    flex: 2;
`;

const BottomTextRightFlex4 = styled(BottomTextLeft)`
    flex: 4;
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

const StyledSearchIcon = styled(ContentPasteSearch)`
    && {
        font-size: 30px;
    }

    &:hover {
    color: #484848;
    }
`;

const StyledCheckIcon = styled(CheckBoxRounded)`
    && {
        font-size: 30px;
    }

    &:hover {
    color: #28a745;
    }
`;

const NotificationItem = ({ item, handleNavigate }) => {
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


    return (
            <NotificationWrapper onClick={() => handleNavigate(item.id, item.Status)}>
                <TextWrapper>
                    <TopRow>
                        <TopTextLeft>
                            {
                            (item.Status === 6006 || item.Status === 6007) ? ('Cửa hàng【' + item.StoreName + '】chờ duyệt') :
                            (item.Status === 1006 || item.Status === 1007) ? ('Sản phẩm【' + item.ProductName + '】chờ duyệt') : null
                            }
                        </TopTextLeft>
                        <TopTextRight>{timeLabel}</TopTextRight>
                    </TopRow>

                    <BottomRow>
                        <BottomTextLeft>•&nbsp;
                            {
                            (item.Status === 6006 || item.Status === 6007) ? (item.ResidentName) :
                            (item.Status === 1006 || item.Status === 1007) ? (item.StoreName) : null
                            }
                        </BottomTextLeft>
                        {
                        (item.Status === 6006 || item.Status === 6007) ? <BottomTextRightFlex4>{item.Address}</BottomTextRightFlex4> :
                        (item.Status === 1006 || item.Status === 1007) ? <BottomTextRightFlex2>{item.ResidentName}</BottomTextRightFlex2> : null
                        }
                    </BottomRow>
                </TextWrapper>

                <ButtonWrapper>
                    <Button onClick={() => handleNavigate(item.id, item.Status)}>
                        <StyledCheckIcon />
                    </Button>

                    <Button onClick={() => handleNavigate(item.id, item.Status)}>
                        <StyledSearchIcon />
                    </Button>
                </ButtonWrapper>
            </NotificationWrapper>
    );
};

export default NotificationItem;