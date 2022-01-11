import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { publicRequest } from "../RequestMethod";

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

const UpdateItem = styled.div`
    display: flex;
    flex-direction: column;
`;

const UpdateItemLabel = styled.label`
    margin-top: 20px;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`;

const UpdateItemInput = styled.input`
    border: none;
    width: 75%;
    height: 30px;
    border-bottom: 1px solid gray;
    outline: none;

    &: focus {
    outline: none;
    }
`;

const UpdateItemTextField = styled.textarea`
    border: none;
    width: 75%;
    height: 60px;
    border-bottom: 1px solid gray;
    outline: none;
    resize: none;

    &: focus {
    outline: none;
    }
`;

const UpdateItemSelect = styled.select`
    border: none;
    width: 75%;
    height: 33px;
    border-bottom: 1px solid gray;
    outline: none;

    &: focus {
    outline: none;
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
    width: 75%;
    margin-top: 30px;
`;

const SuccessSpan = styled.span`
    display: inline-block;
    padding: 0.25em 0.4em;
    margin-left: 20px;
    font-size: 50%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
    color: #fff;
    background-color: #dc3545;
`;

const EditNews = () => {
    const { id } = useParams();
    const [news, setNews] = useState({});
    const [status, setStatus] = useState(12001);
    const [success, setSuccess] = useState(false);
    const showSuccess = () => setSuccess(true);
    let activeCheck = '';
    let activeLabel = '';

    useEffect(() => {
        const url = "news/" + id;

        const fetchNews = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setNews(json.Data);
            } catch (error) { }
        };
        fetchNews();
    }, [success]);

    const handleEditNews = (event) => {
        event.preventDefault();
        const url = "news/update/" + id;

        const updateNews = async () => {
            try {
                const res = await fetch(publicRequest(url), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: event.target.elements.title.value,
                        text: event.target.elements.text.value,
                        marketManagerId: event.target.elements.marketManagerId.value,
                        apartmentId: event.target.elements.apartmentId.value
                    })
                });
                const json = await res.json();
                if (json.ResultMessage === "SUCCESS") {
                    showSuccess();
                }
            } catch (error) { }
        };
        updateNews();
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    switch (news.Status) {
        case 12001:
            activeCheck = 'active';
            activeLabel = 'Active';
            break;
        case 12002:
            activeCheck = 'inactive';
            activeLabel = 'Inactive';
            break;
    }

    return (
        <div>
            <Title><StyledLink to={"/news"}>POIs</StyledLink> / {news.Title}
            </Title>

            <ContainerWrapper>
                <NewsDetailWrapper>
                    <UpdateTitle>
                        Chi tiết { success ? <SuccessSpan>Cập nhật thành công</SuccessSpan> : null }
                    </UpdateTitle>

                    <DetailBottom>

                        <DetailTitle>News ID</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{news.NewsId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Tiêu đề</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{news.Title}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Nội dung</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{news.Text}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Ngày tạo</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{news.ReleaseDate}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Quản lý</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{news.MarketManagerId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Chung cư</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{news.ApartmentId}</DetailInfoText>
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
                        <UpdateItem>
                            <UpdateItemLabel>Tiêu đề</UpdateItemLabel>
                            <UpdateItemInput type="text" name="title" defaultValue={news.Title} />
                        </UpdateItem>

                        <UpdateItem>
                            <UpdateItemLabel>Nội dung</UpdateItemLabel>
                            <UpdateItemTextField type="text" name="text" defaultValue={news.Text} />
                        </UpdateItem>

                        <UpdateItem>
                            <UpdateItemLabel>ID Quản lý</UpdateItemLabel>
                            <UpdateItemInput type="text" name="marketManagerId" defaultValue={news.MarketManagerId} />
                        </UpdateItem>

                        <UpdateItem>
                            <UpdateItemLabel>ID Chung cư</UpdateItemLabel>
                            <UpdateItemInput type="text" name="apartmentId" defaultValue={news.ApartmentId} />
                        </UpdateItem>

                        <UpdateItem>
                            <UpdateItemLabel>Trạng thái</UpdateItemLabel>
                            <UpdateItemSelect value={status} name="newsStatus" onChange={handleStatusChange}>
                                <option value="13001">Active</option>
                                <option value="13002">Inactive</option>
                            </UpdateItemSelect>
                        </UpdateItem>

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </NewsUpdateWrapper>
            </ContainerWrapper>
        </div>
    )
}

export default EditNews;