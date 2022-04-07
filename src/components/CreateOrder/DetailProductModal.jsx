/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { ShoppingCart, Add, Remove } from '@mui/icons-material';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 0;
    display: flex;
    justify-content: center;
    max-height: 70vh;
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

const Invisible = styled.div`
    min-width: 80px;
`;

const BigImageWrapper = styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;
    margin-bottom: 15px;
    border: 1px solid rgba(0,0,0,0.1);
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

const Category = styled.div`
    margin-top: 5px;
    font-size: 16px;
    color: ${props => props.theme.grey};
`;

const Name = styled.div`
    font-size: 24px;
    margin-top: 10px;
`;

const Price = styled.div`
    font-size: 30px;
    color: ${props => props.theme.red};
    margin: 25px 0;
`;

const OptionWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 20px 0;
`;

const OptionLabel = styled.div`
    min-width: 90px;
    color: ${props => props.theme.grey};
`;

const Option = styled.div`
    padding: 10px 20px;
    border: 1px solid ${props => props.active ? "red" : "rgba(0,0,0,0.1)"};
    border-radius: 3px;
    color: ${props => props.active ? "red" : null};
    cursor: pointer;
    
    &:hover {
        background-color: ${props => props.theme.hover};
    }
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 25px;
    background: ${props => props.theme.white};
    color: ${props => props.theme.red};
    border: 1px solid ${props => props.theme.red};
    border-radius: 3px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 30px;

    &:hover {
        opacity: 0.8;
        background-color: #fbebed;
    }

    &:focus {
        outline: 0;
    }

    &:active {
        transform: translateY(1px);
    }
`;

const StyledShoppingCartIcon = styled(ShoppingCart)`
    && {
        font-size: 20px;
        margin-right: 5px;
    }
`;

const Quantity = styled.div`
    width: 20px;
    padding: 10px;
    outline: none;
    margin: 0 10px;
    border: 1px solid rgba(0,0,0,0.1);
    font-size: 16px;
    background-color: ${props => props.theme.white};
    text-align: center;
`;

const StyledAddIcon = styled(Add)`
    && {
        font-size: 20px;
        color: ${props => props.theme.dark};
        padding: 8px;
        background-color: ${props => props.theme.hover};
        opacity: 0.8;
        cursor: pointer;
    }

    &:hover {
        opacity: 1;
        color: ${props => props.theme.black};
    }
`;

const StyledRemoveIcon = styled(Remove)`
    && {
        font-size: 20px;
        color: ${props => props.theme.dark};
        padding: 8px;
        background-color: ${props => props.theme.hover};
        opacity: 0.8;
        cursor: pointer;
    }

    &:hover {
        opacity: 1;
        color: ${props => props.theme.black};
    }
`;

const DescriptionLabel = styled.div`
    color: ${props => props.theme.grey};
    min-width: 150px;
`;

const Description = styled.div`
    font-size: 16px;
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '35%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const DetailProductModal = ({ display, toggle, detailItem, AddItemToCart }) => {
    const [images, setImages] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [prices, setPrices] = useState([]);
    const [category, setCategory] = useState('');

    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [weights, setWeights] = useState([]);

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (display) {
            setImages([]); setColors([]); setSizes([]); setWeights([]); setQuantity(1); setCategory('');

            const imageList = detailItem.Image.split("|").filter(item => item).map((item) => (
                { image: item }
            ));
            setImages(imageList);
            setImageSrc(imageList.length ? imageList[0].image : '');

            if (detailItem.RelatedProducts.length > 0) {
                setPrices(detailItem.RelatedProducts.map((item) => (item.DefaultPrice)));

                setColors([...new Map(detailItem.RelatedProducts.map(({ Color }) => ({ 
                    value: Color
                })).map(item => [item['value'], item])).values()].filter(item => (item.value)));

                setSizes([...new Map(detailItem.RelatedProducts.map(({ Size }) => ({ 
                    value: Size
                })).map(item => [item['value'], item])).values()].filter(item => (item.value)));

                setWeights([...new Map(detailItem.RelatedProducts.map(({ Weight }) => ({ 
                    value: Weight
                })).map(item => [item['value'], item])).values()].filter(item => (item.value)));

            } else {
                setPrices([detailItem.DefaultPrice]);
            }

            const fetchData = () => {
                api.get("categories?id=" + detailItem.SystemCategoryId + "&include=parent")
                .then(function (res) {
                    setCategory(res.data.Data.List[0].SysCategoryName);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            fetchData();
        }
    }, [display])

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        AddItemToCart(detailItem, quantity);
        toggle();
    }

    const handleAddQuantity = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
    }

    const handleRemoveQuantity = (e) => {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

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
                    <Name>{detailItem.ProductName}</Name>
                    <Category>{category}</Category>

                    {
                        prices.length === 1 || (prices.length > 1 && Math.min(...prices) === Math.max(...prices)) ?
                        <Price>{prices[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}</Price>
                        : prices.length > 1 ?
                        <Price>{Math.min(...prices)} - {Math.max(...prices)}</Price>
                        : null
                    }

                    <OptionWrapper>
                        <DescriptionLabel>Mô tả sản phẩm</DescriptionLabel>
                        <Description>{detailItem.Description}</Description>
                    </OptionWrapper>

                    {
                        colors.length ?
                        <OptionWrapper>
                            <OptionLabel>Màu sắc</OptionLabel>

                            {colors.map((item, index) => {
                                return (
                                    <Option 
                                        key={index} 
                                        onClick={() => setSelectedColor(item.value)}
                                        active={selectedColor === item.value}
                                    > 
                                        {item.value} 
                                    </Option>
                                );
                            })}
                        </OptionWrapper>
                        : null
                    }

                    {
                        sizes.length ?
                        <OptionWrapper>
                            <OptionLabel>Kích thước</OptionLabel>

                            {sizes.map((item, index) => {
                                return (
                                    <Option 
                                        key={index} 
                                        onClick={() => setSelectedSize(item.value)}
                                        active={selectedSize === item.value}
                                    > 
                                        {item.value} 
                                    </Option>
                                );
                            })}
                        </OptionWrapper>
                        : null
                    }

                    {
                        weights.length ?
                        <OptionWrapper>
                            <OptionLabel>Trọng lượng</OptionLabel>

                            {weights.map((item, index) => {
                                return (
                                    <Option 
                                        key={index} 
                                        onClick={() => setSelectedWeight(item.value)}
                                        active={selectedWeight === item.value}
                                    > 
                                        {item.value} 
                                    </Option>
                                );
                            })}
                        </OptionWrapper>
                        : null
                    }

                    <OptionWrapper>
                        <OptionLabel>Số lượng</OptionLabel>

                        <StyledRemoveIcon onClick={handleRemoveQuantity} />
                        <Quantity>{quantity}</Quantity>
                        <StyledAddIcon onClick={handleAddQuantity} />
                    </OptionWrapper>

                    <Button type="button" onClick={handleAddItemToCart}>
                        <StyledShoppingCartIcon />
                        Bỏ vào giỏ hàng
                    </Button>
                </RightWrapper>
            </ModalContentWrapper>

            <ModalButtonWrapper>
                <Invisible />
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default DetailProductModal;