/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../../RequestMethod";
import { Close, Check, Help } from '@mui/icons-material';
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

const Row = styled.div`
    display: flex;
    align-items: center;
`;

const TooltipText = styled.div`
    visibility: hidden;
    width: ${props => props.w ? "270px" : null};
    font-size: 13px;
    font-weight: 400;
    background-color: ${props => props.theme.dark};
    color: ${props => props.theme.white};
    padding: 6px;
    border-radius: 6px;

    position: absolute;
    z-index: 1;
`;

const Tooltip = styled.div`
    position: relative;
    display: inline-block;
    width: ${props => props.w0 ? null : "100%"};

    &:hover ${TooltipText} {
        visibility: visible;
    }
`;

const Status = styled.span`
    display: inline-block;
    padding: 3px 5px;
    font-size: 9px;
    margin-left: 5px;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: #fff;
    background-color: #dc3545;
`;

const StyledHelpIcon = styled(Help)`
    && {
        font-size: 18px;
        margin-left: 8px;
        color: ${props => props.theme.grey};
        opacity: 0.5;
        cursor: pointer;

        &:hover {
            opacity: 1.0;
        }
    }
`;

const DetailProductModal = ({ display, toggle, detailItem, handleGetApproveItem, handleGetRejectItem }) => {
    const [item, setItem] = useState({});
    const [images, setImages] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [prevCategory, setPrevCategory] = useState('');
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
            const url = "products?id=" + detailItem.id + "&include=related&status=" + Constant.UNVERIFIED_PRODUCT;
            const fetchData = async () => {
                api.get(url)
                .then(function (res) {
                    setItem(res.data.Data.List[0]);
                    console.log(res.data.Data.List[0])

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

                            if (res.data.Data.List[0].CurrentProduct) {
                                api.get("categories?id=" + res.data.Data.List[0].CurrentProduct.SystemCategoryId + "&include=parent")
                                .then(function (res3) {
                                    if (res3.data.ResultMessage === "SUCCESS") {
                                        setPrevCategory(res3.data.Data.List[0].SysCategoryName);
                                        setLoading(false);
                                    }
                                })
                            } else {
                                setLoading(false);
                            }
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
            <ModalTitle>
                <Row>
                    Chi tiết sản phẩm
                    {
                        item.CurrentProduct ?
                        <Tooltip w0>
                            <StyledHelpIcon />
                            <TooltipText w>Rê chuột vào ô để xem dữ liệu của sản phẩm trước khi cập nhật</TooltipText>
                        </Tooltip>
                        : null
                    }
                </Row>
            </ModalTitle>

            <ModalContentWrapper>
                <LeftWrapper>
                    {
                        loading ? 
                        null :
                        <>
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

                            {
                                item.CurrentProduct && item.Image !== item.CurrentProduct.Image ?
                                <Status>Cập nhật</Status>
                                : null
                            }
                        </>
                    }
                </LeftWrapper>

                <RightWrapper>
                    <Flex>
                        <FlexChild mr>
                            <Tooltip>
                                <FieldLabel mt>
                                    <Row>
                                        Tên sản phẩm
                                        {
                                            item.CurrentProduct && !loading && item.ProductName !== item.CurrentProduct.ProductName ?
                                            <Status>Cập nhật</Status>
                                            : null
                                        }
                                    </Row>
                                </FieldLabel>

                                <TextField
                                    disabled={true}
                                    type="text" value={loading ? '' : item.ProductName}
                                />
                                {
                                    item.CurrentProduct ?
                                    <TooltipText>{loading ? '' : item.CurrentProduct.ProductName}</TooltipText>
                                    : null
                                }
                            </Tooltip>
                        </FlexChild>

                        <FlexChild>
                            <Tooltip>
                                <FieldLabel mt>
                                    <Row>
                                        Mã sản phẩm
                                        {
                                            item.CurrentProduct && !loading && item.ProductCode !== item.CurrentProduct.ProductCode ?
                                            <Status>Cập nhật</Status>
                                            : null
                                        }
                                    </Row>
                                </FieldLabel>

                                <TextField
                                    disabled={true}
                                    type="text" value={loading ? '' : item.ProductCode ? item.ProductCode : 'N/A'}
                                />
                                {
                                    item.CurrentProduct ?
                                    <TooltipText>{loading ? '' : item.CurrentProduct.ProductCode}</TooltipText>
                                    : null
                                }
                            </Tooltip>
                        </FlexChild>
                    </Flex>

                    <Flex>
                        <FlexChild mr>
                            <Tooltip>
                                <FieldLabel mt>
                                    <Row>
                                        Danh mục
                                        {
                                            item.CurrentProduct && !loading && item.SysCategoryName !== prevCategory ?
                                            <Status>Cập nhật</Status>
                                            : null
                                        }
                                    </Row>
                                </FieldLabel>

                                <TextField
                                    disabled={true}
                                    type="text" value={loading ? '' : item.SysCategoryName}
                                />
                                {
                                    item.CurrentProduct ?
                                    <TooltipText>{loading ? '' : prevCategory}</TooltipText>
                                    : null
                                }
                            </Tooltip>
                        </FlexChild>

                        <FlexChild>
                            <Tooltip>
                                <FieldLabel mt>
                                    <Row>
                                        Giá
                                        {
                                            item.CurrentProduct && !loading && item.DefaultPrice.toString() !== item.CurrentProduct.DefaultPrice.toString() ?
                                            <Status>Cập nhật</Status>
                                            : null
                                        }
                                    </Row>
                                </FieldLabel>

                                <TextField
                                    disabled={true}
                                    type="text" value={loading ? '' : item.DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}
                                />
                                {
                                    item.CurrentProduct ?
                                    <TooltipText>{loading ? '' : item.CurrentProduct.DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}</TooltipText>
                                    : null
                                }
                            </Tooltip>
                        </FlexChild>
                    </Flex>

                    <Flex>
                        <FlexChild mr>
                            <Tooltip>
                                <FieldLabel mt>
                                    <Row>
                                        Miêu tả
                                        {
                                            item.CurrentProduct && !loading && item.Description !== item.CurrentProduct.Description ?
                                            <Status>Cập nhật</Status>
                                            : null
                                        }
                                    </Row>
                                </FieldLabel>

                                <TextArea
                                    disabled={true} rows="4"
                                    type="text" value={loading ? '' : item.Description}
                                />
                                {
                                    item.CurrentProduct ?
                                    <TooltipText>{loading ? '' : item.CurrentProduct.Description}</TooltipText>
                                    : null
                                }
                            </Tooltip>

                            <Tooltip>
                                <FieldLabel mt>
                                    <Row>
                                        Miêu tả ngắn
                                        {
                                            item.CurrentProduct && !loading && item.BriefDescription !== item.CurrentProduct.BriefDescription ?
                                            <Status>Cập nhật</Status>
                                            : null
                                        }
                                    </Row>
                                </FieldLabel>
                                <TextArea
                                    disabled={true} rows="2"
                                    type="text" value={loading ? '' : item.BriefDescription}
                                />
                                {
                                    item.CurrentProduct ?
                                    <TooltipText>{loading ? '' : item.CurrentProduct.BriefDescription}</TooltipText>
                                    : null
                                }
                            </Tooltip>
                        </FlexChild>

                        <FlexChild>
                            {
                                !loading && colors.length ?
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
                                !loading && sizes.length ?
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
                                !loading && weights.length ?
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