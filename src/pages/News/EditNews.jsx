import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';

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
    margin-top: 20px;
`;

const NewsDetailWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const NewsUpdateWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`;

const DetailBottom = styled.div`
    margin-top: 20px;
`;

const DetailTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`;

const DetailInfo = styled.div`
    align-items: center;
    margin: 12px 10px;
    color: #444;
`;

const DetailInfoText = styled.span`
    display: block;
    margin: 10px;
`;

const DetailStatus = styled.span`
    display: inline-block;
    padding: 8px 10px;
    margin: 0px 10px;
    font-size: 0.9;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    color: #fff;
    background-color: ${props => props.active === "active" ? "#28a745" : "#dc3545"};
`;

const UpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
    display: flex;
    align-items: center;
`;

const UpdateForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const StyledTextField = styled(TextField)`
    && {    
    margin-top: 30px;
    }
`;

const UpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 15px;
    cursor: pointer;
    background-color: #17a2b8;
    color: white;
    font-weight: 600;
    width: 100%;
    margin-top: 50px;

    &:active {
    box-shadow: 0 2px #666;
    transform: translateY(2px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const EditNews = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});

    const [updateTitle, setUpdateTitle] = useState('');
    const [updateText, setUpdateText] = useState('');

    const [success, setSuccess] = useState(false);
    let activeCheck = '';
    let activeLabel = '';

    useEffect(() => {
        const url = "news/" + id;

        const fetchNews = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setItem(json.Data);
                setUpdateTitle(json.Data.Title);
                setUpdateText(json.Data.Text);
            } catch (error) { }
        };
        fetchNews();
    }, [id, success]);

    const handleEditNews = (event) => {
        event.preventDefault();
        if (validCheck(updateTitle)) {
            const url = "news/update/" + id;

            const updateNews = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            title: updateTitle,
                            text: updateText,
                            marketManagerId: item.MarketManagerId,
                            apartmentId: item.ApartmentId
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Cập nhật thành công " + item.Title + "!", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        notify();
                        setSuccess(!success);
                    }
                } catch (error) { }
            };
            updateNews();
        }
    }

    const validCheck = (title) => {
        if (title === null || title === '') {
            return false;
        }
        return true;
    }

    switch (item.Status) {
        case 12001:
            activeCheck = 'active';
            activeLabel = 'Active';
            break;
        case 12002:
            activeCheck = 'inactive';
            activeLabel = 'Inactive';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
    }

    return (
        <div>
            <Title><StyledLink to={"/news"}>News</StyledLink> / {item.Title}
            </Title>

            <ContainerWrapper>
                <NewsDetailWrapper>
                    <UpdateTitle>
                        Chi tiết
                    </UpdateTitle>

                    <DetailBottom>

                        <DetailTitle>News ID</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.NewsId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Tiêu đề</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.Title}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Nội dung</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.Text}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Ngày tạo</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{DateTime.fromISO(item.ReleaseDate).toLocaleString(DateTime.DATETIME_SHORT)}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Quản lý</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.MarketManagerId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Chung cư</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.ApartmentId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Trạng thái</DetailTitle>
                        <DetailInfo>
                            <DetailStatus active={activeCheck}>{activeLabel}</DetailStatus>
                        </DetailInfo>

                    </DetailBottom>
                </NewsDetailWrapper>


                <NewsUpdateWrapper>
                    <UpdateTitle>Chỉnh sửa</UpdateTitle>

                    <UpdateForm onSubmit={handleEditNews}>
                        <StyledTextField
                            fullWidth 
                            value={updateTitle}
                            onChange={event => setUpdateTitle(event.target.value)}
                            error={updateTitle === ''}
                            helperText={updateTitle === '' ? 'Vui lòng nhập nội dung' : ''}
                            label="Nội dung" 
                        />

                        <StyledTextField
                            fullWidth multiline rows={4}
                            value={updateText}
                            onChange={event => setUpdateText(event.target.value)}
                            label="Tựa đề" 
                        />

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </NewsUpdateWrapper>
            </ContainerWrapper>
        </div>
    )
}

export default EditNews;