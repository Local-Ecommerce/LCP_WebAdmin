import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { Close, Check } from '@mui/icons-material';
import * as Constant from '../../Constant';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 0;
    display: flex;
    justify-content: center;
    height: 70vh;
`;

const LeftWrapper = styled.div`
    flex: 1;
    padding: 20px 20px;
    border-right: 1px solid rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
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

const ProductCode = styled.div`
    font-size: 12px;
    color: ${props => props.theme.grey};
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const ProductName = styled.div`
    font-size: 28px;
    color: ${props => props.theme.dark};
    margin: 8px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const CategoryName = styled.div`
    font-size: 14px;
    color: ${props => props.theme.grey};
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const Price = styled.div`
    font-size: 24px;
    color: ${props => props.theme.dark};
    margin: 20px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const Description = styled.div`
    font-size: 14px;
    color: ${props => props.theme.dark};
    height: 80px;
    overflow: auto;
    padding: 5px;
    border: 1px solid rgba(0,0,0,0.1);
`;

const BriefDescription = styled.div`
    font-size: 14px;
    color: ${props => props.theme.dark};
    margin-bottom: 15px;
    height: 40px;
    overflow: auto;
    padding: 5px;
    border: 1px solid rgba(0,0,0,0.1);
`;

const OptionWrapper = styled.div`
    margin: 0px 10px;
`;

const Label = styled.div`
    font-size: 14px;
    color: ${props => props.theme.grey};
    margin-top: ${props => props.mt ? "20px" : null};
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

const BigImageWrapper = styled.div`
    width: 90%;
    padding-top: 90%;
    position: relative;
    margin-bottom: 15px;
`;

const SmallImageWrapper = styled.div`
    width: 90%;
    height: 50px;
`;

const SmallImageScroller = styled.div`
    height: 80px;
    overflow-y: auto;
    width: 100%;
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
    width: 40px;
    height: 40px;
    margin-right: 5px;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.2);
    opacity: ${props => props.blur ? "0.4" : "1"};
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
`;

const DetailModal = ({ display, toggle, detailItem, handleGetApproveItem, handleGetRejectItem }) => {
    const [item, setItem] = useState({});
    const [images, setImages] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [weights, setWeights] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSetApproveItem = () => {
        handleGetApproveItem(item.ProductId, item.ProductName, images[0], item.ResidentId);
    }

    const handleSetRejectItem = () => {
        handleGetRejectItem(item.ProductId, item.ProductName, images[0], item.ResidentId);
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

            <ModalContentWrapper>
                <LeftWrapper>
                    <BigImageWrapper>
                        <Image src={imageSrc} />
                    </BigImageWrapper>

                    <SmallImageWrapper>
                        <SmallImageScroller>
                        {
                            images.map(item => {
                                return <SmallImage 
                                    src={item.image} blur={item.image !== imageSrc} 
                                    onClick={() => setImageSrc(item.image)} 
                                />
                            })
                        }
                        </SmallImageScroller>
                    </SmallImageWrapper>                  
                </LeftWrapper>

                <RightWrapper>
                    <ProductCode> {loading ? '' : item.ProductCode} </ProductCode>
                    <ProductName> {loading ? '' : item.ProductName} </ProductName>
                    <CategoryName> {loading ? '' : item.SysCategoryName} </CategoryName>

                    <Price> {loading ? '' : item.DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"} </Price>
                    
                    <Label>Miêu tả</Label>

                    {/* <Description> {loading ? '' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'} </Description> */}

                    {/* <BriefDescription> {loading ? '' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'} </BriefDescription> */}
                    <Description> {loading ? '' : item.Description} </Description>
                    <Label mt>Miêu tả ngắn</Label>

                    <BriefDescription> {loading ? '' : item.BriefDescription} </BriefDescription>

                    <Flex>
                        <Label>Màu sắc:</Label>
                        {
                            colors.length ?
                            <OptionWrapper>
                                {colors.map((item, index) => {
                                    return (
                                        <ValueTag key={index}> {item.value} </ValueTag>
                                    );
                                })}
                            </OptionWrapper>
                            : <Label>&nbsp;N/A</Label>
                        }
                    </Flex>

                    <Flex>
                        <Label>Kích thước:</Label>
                        {
                            sizes.length ?
                            <OptionWrapper>
                                {sizes.map((item, index) => {
                                    return (
                                        <ValueTag key={index}> {item.value} </ValueTag>
                                    );
                                })}
                            </OptionWrapper>
                            : <Label>&nbsp;N/A</Label>
                        }
                    </Flex>

                    <Flex>
                        <Label>Trọng lượng:</Label>
                        {
                            weights.length ?
                            <OptionWrapper>
                                {weights.map((item, index) => {
                                    return (
                                        <ValueTag key={index}> {item.value} kg </ValueTag>
                                    );
                                })}
                            </OptionWrapper>
                            : <Label>&nbsp;N/A</Label>
                        }
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

export default DetailModal;