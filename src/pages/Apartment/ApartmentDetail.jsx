import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useParams, Link } from "react-router-dom";
import { api } from "../../RequestMethod";
import { KeyboardBackspace } from '@mui/icons-material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ShopNotifications from '../../mockdata/ShopNotifications';
import ProductNotifications from '../../mockdata/ProductNotifications';
import NotificationList from '../../components/Notification/NotificationList';

const PageWrapper = styled.div`
    width: 1080px;
    margin: 40px auto;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
`;

const StyledBackIcon = styled(KeyboardBackspace)`
    && {
        color: #727272;
        padding: 5px;
        border: 1px solid #727272;
        border-radius: 4px;
    }
`;

const TitleGrey = styled.span`
    color: #727272;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 20px;
`;

const ContainerWrapper = styled.div`
`;

const InfoText = styled.span`
    display: block;
    margin: 30px 0px 10px 0px;
    font-size: 15px;
    font-weight: 600;
    color: rgba(51,51,51,.64);
`;

const Status = styled.span`
    margin-left: 3px;
    display: inline-block;
    padding: 3px 6px;
    font-size: 0.8em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: #fff;
    background-color: #dc3545;
`;

const NotificationWrapper = styled.div`
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const DisplayAllLink = styled.a`
    margin: 10px;
    display: flex;
    justify-content: center;
    text-decoration: none;
    color: #007bff;
    font-size: 1em;
    cursor: pointer;
`;

const ModalTitle = styled.h2`
    margin: 25px 20px;
    color: #212529;
`;

const ModalContentWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    border-bottom: 1px solid #cfd2d4;
`;

const ModalContent = styled.p`
    margin: 25px 20px;
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    float: right;
`;

const ModalButton = styled.button`
    min-width: 80px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.red ? "#dc3545" : "#fff"};
    color: ${props => props.red ? "#fff" : "#212529"};;
    border: 1px solid ${props => props.red ? "#dc3545" : "#fff"};
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }
`;

const StyledFormControl = styled(FormControl)`
    && {
        width: 100%;
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '65%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};


const EditApartment = () => {
    const { id } = useParams();
    const [DeleteModal, toggleDeleteModal] = useState(false);
    const [rejectStatus, setRejectStatus] = useState(0);

    const [item, setItem] = useState({Resident: {ResidentName: ''}, Apartment: {Address: ''}});
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentStores, setCurrentStores] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);

    const [storeCount, setStoreCount] = useState(3);
    const [productCount, setProductCount] = useState(3);

    useEffect(() => {
        const url = "apartment/" + id;

        api.get(url)
        .then(function (res) {
            setItem(res.data.Data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [id]);

    useEffect(() => {
        //const url = "apartment/" + id;

        const fetchPendingStores = async () => {
            try {
                //const res = await fetch(publicRequest(url));
                //const json = await res.json();
                setStores(ShopNotifications);
            } catch (error) { }
        };
        fetchPendingStores();
    }, [id]);

    useEffect(() => {
        //const url = "apartment/" + id;

        const fetchPendingProducts = async () => {
            try {
                //const res = await fetch(publicRequest(url));
                //const json = await res.json();
                setProducts(ProductNotifications);
            } catch (error) { }
        };
        fetchPendingProducts();
    }, [id]);

    useEffect(() => {
        const paging = () => {
            try {
                setCurrentStores(stores.slice(0, storeCount));
            } catch (error) { }
        };
        paging();
    }, [stores, storeCount]);

    useEffect(() => {
        const paging = () => {
            try {
                setCurrentProducts(products.slice(0, productCount));
            } catch (error) { }
        };
        paging();
    }, [products, productCount]);

    const handleRejectItem = (id, status) => {
        toggleDeleteModal(!DeleteModal);
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/apartments"><StyledBackIcon /></Link>
                <Title><TitleGrey>Chung cư </TitleGrey>/ {item.Address}</Title>
            </Row>
            
            <ContainerWrapper>
                <InfoText>Cửa hàng chờ duyệt <Status>{stores.length}</Status> </InfoText>

                <NotificationWrapper>
                    <NotificationList currentItems={currentStores} handleRejectItem={handleRejectItem} />
                </NotificationWrapper>

                {
                (stores.length !== currentStores.length) ? 
                <DisplayAllLink onClick={() => setStoreCount(storeCount + 3)}>Xem thêm cửa hàng chờ duyệt</DisplayAllLink> : null
                }
            </ContainerWrapper>

            <ContainerWrapper>
                <InfoText>Sản phẩm chờ duyệt <Status>{products.length}</Status> </InfoText>

                <NotificationWrapper>
                    <NotificationList currentItems={currentProducts} handleRejectItem={handleRejectItem} />
                </NotificationWrapper>

                {
                (products.length !== currentProducts.length) ? 
                <DisplayAllLink onClick={() => setProductCount(productCount + 3)}>Xem thêm sản phẩm chờ duyệt</DisplayAllLink> : null
                }
            </ContainerWrapper>

            <Modal isOpen={DeleteModal} onRequestClose={() => toggleDeleteModal(!DeleteModal)} style={customStyles} ariaHideApp={false}>
                <ModalTitle>Xác Nhận Từ Chối</ModalTitle>

                <ModalContentWrapper>
                    <ModalContent>
                        <StyledFormControl>
                            <InputLabel id="demo-simple-select-label">Lí do từ chối</InputLabel>
                            <Select 
                                value={rejectStatus} 
                                label="Lí do từ chối"
                                onChange={(event) => setRejectStatus(event.target.value)}
                            >
                            <MenuItem value={0}>Tên không hợp lệ</MenuItem>
                            <MenuItem value={1}>Tên không hợp lệ</MenuItem>
                            <MenuItem value={2}>Tên không hợp lệ</MenuItem>
                            <MenuItem value={3}>Tên không hợp lệ</MenuItem>
                            </Select>
                        </StyledFormControl>
                    </ModalContent>
                </ModalContentWrapper>

                <ModalButtonWrapper>
                    <ModalButton onClick={() => toggleDeleteModal(!DeleteModal)}>Quay lại</ModalButton>
                    <ModalButton red onClick={() => { toggleDeleteModal(!DeleteModal) }}>Từ chối</ModalButton>
                </ModalButtonWrapper>
            </Modal>
        </PageWrapper>
    )
}

export default EditApartment;