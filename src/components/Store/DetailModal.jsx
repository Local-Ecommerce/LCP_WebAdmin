/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import * as Constant from '../../Constant';

import StoreMenuList from './StoreMenuList';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 20px;
    display: flex;
    justify-content: center;
`;

const LeftWrapper = styled.div`
    flex: 1;
    padding: 20px 20px 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid rgba(0,0,0,0.1);
`;

const RightWrapper = styled.div`
    flex: 2;
    padding: 20px;
    max-height: 50vh;
    overflow: auto;
    overflow-x: hidden;
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const ImageWrapper = styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;
    margin-bottom: 15px;
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

const Text = styled.div`
    font-size: 20px;
    color: ${props => props.theme.dark};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const Label = styled.div`
    font-size: 16px;
    color: #383838;
    font-weight: 600;
    margin-bottom: 10px;
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

const DetailModal = ({ display, toggle, detailItem }) => {
    const [menus, setMenus] = useState([]);
    const [store, setStore] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (display) {
            setLoading(true);
            const fetchData = async () => {
                api.get("stores?id=" + detailItem.id)
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        setStore(res.data.Data.List[0])
                        let url = "menus"
                        + "?sort=-createddate"
                        + "&include=product"
                        + "&status=" + Constant.ACTIVE_MENU;
                        api.get(url)
                        .then(function (res2) {
                            if (res2.data.ResultMessage === "SUCCESS") {
                                setMenus(res2.data.Data.List);
                                setLoading(false);
                            }
                        })
                    }
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
                    <ImageWrapper>
                        <Image src={store.StoreImage} />
                    </ImageWrapper>

                    <Text> {loading ? '' : store.StoreName} </Text>
                </LeftWrapper>

                <RightWrapper>
                    <Label>Bảng giá</Label>

                    {loading ? null : <StoreMenuList currentItems={menus} />}
                </RightWrapper>
            </ModalContentWrapper>

            <ModalButtonWrapper>
                <small>{menus.length} bảng giá thuộc {store.StoreName}</small>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default DetailModal;