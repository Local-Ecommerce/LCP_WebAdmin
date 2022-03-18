import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { HideImage, Close, Check } from '@mui/icons-material';
import * as Constant from '../../Constant';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 0;
    display: flex;
    justify-content: center;
`;

const LeftWrapper = styled.div`
    flex: 1;
    padding: 20px;
    border-right: 1px solid rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const RightWrapper = styled.div`
    flex: 1;
    padding: 20px;
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-between;
`;

const ModalButton = styled.button`
    padding: 8px 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.green ? props.theme.green : props.theme.white};
    color: ${props => props.red || props.green ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.green ? props.theme.green : props.theme.greyBorder};
    border-radius: 6px;
    text-align: center;
    font-size: 14px;
    display: inline-flex;
    align-items: center;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '40%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.start ? "flex-start" : "space-between"};
    margin-left: ${props => props.ml ? "10px" : "0px"};
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: ${props => props.mb ? "20px" : "0px"};
`;

const StyledNoImageIconBig = styled(HideImage)`
    && {
        color: rgba(0,0,0,0.1);
        width: 100%;
        font-size: 144px;
        margin: 80px 0;
    }
`;

const StyledNoImageIconSmall = styled(HideImage)`
    && {
        color: rgba(0,0,0,0.1);
        width: 12.5%;
        font-size: 44px;
    }
`;

const ProductCode = styled.div`
    font-size: 12px;
    color: ${props => props.theme.grey};
    margin: 0;
`;

const ProductName = styled.div`
    font-size: 28px;
    color: ${props => props.theme.dark};
    margin: 8px 0;
`;

const CategoryName = styled.div`
    font-size: 14px;
    color: ${props => props.theme.grey};
    margin: 0;
`;

const Price = styled.div`
    font-size: 24px;
    color: ${props => props.theme.dark};
    margin: 25px 0;
`;

const Description = styled.div`
    font-size: 14px;
    color: ${props => props.theme.dark};
`;

const BriefDescription = styled.div`
    font-size: 14px;
    color: ${props => props.theme.dark};
    margin-top: 15px;
    margin-bottom: 25px;
`;

const OptionWrapper = styled.div`
    margin: 10px;
`;

const ValueLabel = styled.div`
    font-size: 14px;
    color: ${props => props.theme.grey};
`;

const ValueTag = styled.span`
    display: inline-block;
    padding: 4px 10px;
    font-size: 13px;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: ${props => props.theme.white};
    background-color: ${props =>  props.theme.blue};
    margin: 0px 5px 5px 0px;
`;

const Invisible = styled.div`
    min-width: 80px;
`;

const StyledCheckIcon = styled(Check)`
    && {
        font-size: 18px;
        margin-right: 5px;
    }
`;

const StyledCancelIcon = styled(Close)`
    && {
        font-size: 18px;
        margin-right: 5px;
    }
`;


const DetailModal = ({ display, toggle, detailItem, handleGetApproveItem, handleGetRejectItem }) => {
    const [item, setItem] = useState({});
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [weights, setWeights] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSetApproveItem = () => {
        handleGetApproveItem(item.ProductId, item.ProductName);
    }

    const handleSetRejectItem = () => {
        handleGetRejectItem(item.ProductId, item.ProductName);
    }

    useEffect(() => {
        if (display) {
            setLoading(true);
            const url = "products?id=" + detailItem.id + "&include=related";
            const fetchData = async () => {
                api.get(url)
                .then(function (res) {
                    setItem(res.data.Data.List[0]);

                    setColors([...new Map(res.data.Data.List[0].RelatedProducts.map(({ Color }) => ({ 
                        value: Color, error: '', old: true
                    })).map(item => [item['value'], item])).values()].filter(item => (item.value))
                    .map((item, index) => ({ name: index, ...item })));

                    setSizes([...new Map(res.data.Data.List[0].RelatedProducts.map(({ Size }) => ({ 
                        value: Size, error: '', old: true
                    })).map(item => [item['value'], item])).values()].filter(item => (item.value))
                    .map((item, index) => ({ name: index, ...item })));

                    setWeights([...new Map(res.data.Data.List[0].RelatedProducts.map(({ Weight }) => ({ 
                        value: Weight, error: '', old: true
                    })).map(item => [item['value'], item])).values()].filter(item => (item.value))
                    .map((item, index) => ({ name: index, ...item })));

                    api.get("categories?id=" + res.data.Data.List[0].SystemCategoryId + "&include=parent")
                    .then(function (res2) {
                        if (res2.data.ResultMessage === "SUCCESS") {
                            setItem(item => ({
                                ...item,
                                SysCategoryName: res2.data.Data.List[0].SysCategoryName
                            }));
                            setLoading(false);
                        }
                    })
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false);
                });
            };
            fetchData();
        }
    }, [display]);

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>

            <ModalContentWrapper>
                <LeftWrapper>
                    <StyledNoImageIconBig />
                    <Row>
                        <StyledNoImageIconSmall />
                        <StyledNoImageIconSmall />
                        <StyledNoImageIconSmall />
                        <StyledNoImageIconSmall />
                        <StyledNoImageIconSmall />
                        <StyledNoImageIconSmall />
                        <StyledNoImageIconSmall />
                        <StyledNoImageIconSmall />
                    </Row>
                </LeftWrapper>

                <RightWrapper>
                    <ProductCode> {loading ? '' : item.ProductCode} </ProductCode>
                    <ProductName> {loading ? '' : item.ProductName} </ProductName>
                    <CategoryName> {loading ? '' : item.SysCategoryName} </CategoryName>
                    <Price> {loading ? '' : item.DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"} </Price>
                    <Description> {loading ? '' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'} </Description>
                    <BriefDescription> {loading ? '' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'} </BriefDescription>

                    {
                        colors.length ?
                        <>
                            <ValueLabel>Màu sắc:</ValueLabel>
                            <OptionWrapper>
                                {colors.map((item, index) => {
                                    return (
                                        <ValueTag key={index}> {item.value} </ValueTag>
                                    );
                                })}
                            </OptionWrapper>
                        </>
                        : null
                    }

                    {
                        sizes.length ?
                        <>
                            <ValueLabel>Kích thước:</ValueLabel>
                            <OptionWrapper>
                                {sizes.map((item, index) => {
                                    return (
                                        <ValueTag key={index}> {item.value} </ValueTag>
                                    );
                                })}
                            </OptionWrapper>
                        </>
                        : null
                    }

                    {
                        weights.length ?
                        <>
                            <ValueLabel>Trọng lượng:</ValueLabel>
                            <OptionWrapper>
                                {weights.map((item, index) => {
                                    return (
                                        <ValueTag key={index}> {item.value} kg </ValueTag>
                                    );
                                })}
                            </OptionWrapper>
                        </>
                        : null
                    }
                </RightWrapper>
            </ModalContentWrapper>
            <ModalButtonWrapper>
                <Invisible />
                {
                    item.Status === Constant.UNVERIFIED_PRODUCT ?
                    <div>
                        <ModalButton green onClick={handleSetApproveItem}>
                            <StyledCheckIcon />
                            Duyệt
                        </ModalButton>

                        <ModalButton red onClick={handleSetRejectItem}>
                            <StyledCancelIcon />
                            Từ chối
                        </ModalButton>
                    </div>
                    : null
                }
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default DetailModal;