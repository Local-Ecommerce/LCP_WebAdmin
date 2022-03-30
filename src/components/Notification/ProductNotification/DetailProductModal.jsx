/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../../RequestMethod";
import { Close, Check } from '@mui/icons-material';
import * as Constant from '../../../Constant';

const ModalTitle = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 20px;
    color: #212529;
    font-weight: 600;
`;

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 0;
    display: flex;
    justify-content: center;
`;

const LeftWrapper = styled.div`
    flex: 1;
    padding: 20px 0px 20px 20px;
`;

const RightWrapper = styled.div`
    flex: 2;
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
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
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

const OptionWrapper = styled.div`
    margin-bottom: 15px;
`;

const ValueTag = styled.span`
    display: inline-block;
    padding: 4px 10px;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: ${props => props.theme.white};
    background-color: ${props =>  props.theme.blue};
    margin: 2px 5px 5px 0px;
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

const BigImageWrapper = styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;
    margin-bottom: 15px;
    margin-top: 10px;
    border: 1px solid rgba(0,0,0,0.2);
`;

const SmallImageWrapper = styled.div`
    width: 100%;
`;

const SmallImageScroller = styled.div`
    overflow: auto;
    width: 100%;
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

const SmallImage = styled.img`
    object-fit: contain;
    width: 15%;
    height: 15%;
    max-width: 40px;
    max-height: 40px;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.2);
    margin-right: 5px;
    opacity: ${props => props.blur ? "0.4" : "1"};
`;

const Flex = styled.div`
    width: 100%;
    display: flex;
`;

const FlexChild = styled.div`
    width: 50%;
    margin-right: ${props => props.mr ? "20px" : null};
`;

const FieldLabel = styled.div`
    font-weight: 400;
    font-size: 14px;
    margin-top: ${props => props.mt ? "10px" : "0px"};
    margin-bottom: 5px;
    color: ${props => props.theme.dark};
`;

const TextField = styled.input`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;

    &:disabled {
        color: ${props => props.theme.black};
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;
    resize: none;

    &:disabled {
        color: ${props => props.theme.black};
    }
`;

const DetailProductModal = ({ display, toggle, detailItem, handleGetApproveItem, handleGetRejectItem }) => {
    const [item, setItem] = useState({});
    const [images, setImages] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [weights, setWeights] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSetApproveItem = () => {
        handleGetApproveItem(item.ProductId, item.ProductName, images.length ? images[0].image : '', item.ResidentId);
    }

    const handleSetRejectItem = () => {
        handleGetRejectItem(item.ProductId, item.ProductName, images.length ? images[0].image : '', item.ResidentId);
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

                    const imageList = res.data.Data.List[0].Image.split("|").filter(item => item).map((item, index) => (
                        { image: item }
                    ));
                    setImages(imageList);
                    setImageSrc(imageList.length ? imageList[0].image : '');

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
            <ModalTitle>Chi tiết sản phẩm</ModalTitle>

            <ModalContentWrapper>
                <LeftWrapper>
                    <BigImageWrapper>
                        <Image src={imageSrc} />
                    </BigImageWrapper>

                    <SmallImageWrapper>
                        <SmallImageScroller>
                        {
                            images.map((item, index) => {
                                return <SmallImage key={index}
                                    src={item.image} blur={item.image !== imageSrc} 
                                    onClick={() => setImageSrc(item.image)} 
                                />
                            })
                        }
                        </SmallImageScroller>
                    </SmallImageWrapper>                  
                </LeftWrapper>

                <RightWrapper>
                    <Flex>
                        <FlexChild mr>
                            <FieldLabel mt>Tên sản phẩm</FieldLabel>
                            <TextField
                                disabled={true} title={loading ? '' : item.ProductName}
                                type="text" value={loading ? '' : item.ProductName}
                            />
                        </FlexChild>

                        <FlexChild>
                            <FieldLabel mt>Mã sản phẩm</FieldLabel>
                            <TextField
                                disabled={true} title={loading ? '' : item.ProductCode ? item.ProductCode : 'N/A'}
                                type="text" value={loading ? '' : item.ProductCode ? item.ProductCode : 'N/A'}
                            />
                        </FlexChild>
                    </Flex>

                    <Flex>
                        <FlexChild mr>
                            <FieldLabel mt>Danh mục</FieldLabel>
                            <TextField
                                disabled={true} title={loading ? '' : item.SysCategoryName}
                                type="text" value={loading ? '' : item.SysCategoryName}
                            />
                        </FlexChild>

                        <FlexChild>
                            <FieldLabel mt>Giá</FieldLabel>
                            <TextField
                                disabled={true} title={loading ? '' : item.DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}
                                type="text" value={loading ? '' : item.DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}
                            />
                        </FlexChild>
                    </Flex>

                    <Flex>
                        <FlexChild mr>
                            <FieldLabel mt>Miêu tả</FieldLabel>
                            <TextArea
                                disabled={true} rows="4" title={loading ? '' : item.Description}
                                type="text" value={loading ? '' : item.Description}
                            />

                            <FieldLabel mt>Miêu tả ngắn</FieldLabel>
                            <TextArea
                                disabled={true} rows="2" title={loading ? '' : item.BriefDescription}
                                type="text" value={loading ? '' : item.BriefDescription}
                            />
                        </FlexChild>

                        <FlexChild>
                            {
                                colors.length ?
                                <>
                                    <FieldLabel mt>Màu sắc</FieldLabel>
                                    {
                                        <OptionWrapper>
                                            {colors.map((item, index) => {
                                                return (
                                                    <ValueTag key={index}> {item.value} </ValueTag>
                                                );
                                            })}
                                        </OptionWrapper>
                                    }
                                </>
                                : null
                            }

                            {
                                sizes.length ?
                                <>
                                    <FieldLabel mt>Kích thước</FieldLabel>
                                    {
                                        <OptionWrapper>
                                            {sizes.map((item, index) => {
                                                return (
                                                    <ValueTag key={index}> {item.value} </ValueTag>
                                                );
                                            })}
                                        </OptionWrapper>
                                    }
                                </>
                                : null
                            }

                            {
                                weights.length ?
                                <>
                                    <FieldLabel mt>Trọng lượng</FieldLabel>
                                    {
                                        <OptionWrapper>
                                            {weights.map((item, index) => {
                                                return (
                                                    <ValueTag key={index}> {item.value} </ValueTag>
                                                );
                                            })}
                                        </OptionWrapper>
                                    }
                                </>
                                : null
                            }
                        </FlexChild>
                    </Flex>
                </RightWrapper>
            </ModalContentWrapper>

            <ModalButtonWrapper>
                <Invisible />
                {
                    item.Status === Constant.UNVERIFIED_PRODUCT ?
                    <div>
                        <ModalButton blue onClick={handleSetApproveItem}>
                            <StyledCheckIcon />
                            Duyệt
                        </ModalButton>

                        <ModalButton onClick={handleSetRejectItem}>
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

export default DetailProductModal;