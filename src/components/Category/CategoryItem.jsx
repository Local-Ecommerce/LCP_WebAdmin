import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { ArrowDropUp, ArrowDropDown, Edit, Delete, ContentPasteSearch } from '@mui/icons-material';
import { Link } from "react-router-dom";

const CategoryContent = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: center;
    margin: ${props => props.level === 1 ? "20px" : "0px"} 0px 8px 0px;
    list-style: none;
    width: ${props => props.level === 3 ? "90%" : props.level === 2 ? "95%" : "100%"};
    height: 60px;
    text-decoration: none;
    font-size: 18px;
    color: #404040;
    border-radius: 10px;
    border: 1px solid #fff;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    margin-left: auto;
    font-size: 1em;

    &:hover {
        background-color: rgb(240, 240, 255);
        cursor: pointer;
        text-decoration: none;
        color: #0056b3;
    }

    &:focus {
        background-color: rgb(240, 240, 255);
        cursor: pointer;
        text-decoration: none;
        color: #0056b3;
    }
`;

const Button = styled.button`
    padding: 3px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: grey;

    &:focus {
    outline: none;
    }
`;

const ModalButton = styled.button`
    min-width: 60px;
    background: ${props => props.red ? "#dc3545" : "#17a2b8"};
    color: white;
    margin: 5px;
    padding: 7px;
    border: 2px solid ${props => props.red ? "#dc3545" : "#17a2b8"};
    border-radius: 3px;
    text-align: center;
    float: right;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }
`;

const Title = styled.h1`
    font-size: 30px;
    margin: 15px;
    color: #dc3545;
    border-bottom: 1px solid #dee2e6;
`;

const NameWrapper = styled.div`
    display: flex;
    flex: 8;
    text-align: left;
    margin-left: 20px;
`;

const DropdownIcon = styled(ArrowDropDown)`
    margin-left: 10px;
`;

const DropupIcon = styled(ArrowDropUp)`
    margin-left: 10px;
`;

const ButtonWrapper = styled.div`
    flex: 1;
`;

const ModalTextWrapper = styled.div`
    margin: 15px;
`;

const Text = styled.p`
    color: #000;
    margin: 5px 0px 0px 0px;
    font-size: 0.9em;
    display: inline-block;
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '65%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const StyledSearchIcon = styled(ContentPasteSearch)`
    &:hover {
    color: #dc3545;
    }
`;

const StyledEditIcon = styled(Edit)`
    &:hover {
    color: #dc3545;
    }
`;

const StyledDeleteIcon = styled(Delete)`
    &:hover {
    color: #dc3545;
    }
`;

const CategoryItem = ({ item, handleDeleteItem }) => {
    const [child, setChild] = useState(false);
    const [DeleteModal, toggleDeleteModal] = React.useState(false);

    const showChild = () => setChild(!child);

    const toggleModal = () => {
        toggleDeleteModal(!DeleteModal);
    }

    return (
        <>
            <CategoryContent level={item.CategoryLevel} onClick={item.InverseBelongToNavigation && showChild}>
                <NameWrapper>
                    {item.SysCategoryName}
                    {Array.isArray(item.InverseBelongToNavigation) && item.InverseBelongToNavigation.length && child
                    ? <DropupIcon />
                        : Array.isArray(item.InverseBelongToNavigation) && item.InverseBelongToNavigation.length
                        ? <DropdownIcon />
                        : null}
                </NameWrapper>

                <ButtonWrapper>
                    <Link to={"/"}>
                        <Button>
                            <StyledSearchIcon />
                        </Button>
                    </Link>

                    <Link to={"/editCategory/" + item.SystemCategoryId}>
                        <Button>
                            <StyledEditIcon />
                        </Button>
                    </Link>

                    <Button onClick={toggleModal}>
                        <StyledDeleteIcon />
                    </Button>

                    <Modal isOpen={DeleteModal} onRequestClose={toggleModal} style={customStyles}>
                        <Title>Xác Nhận Xóa</Title>
                        <ModalTextWrapper>
                            <Text>Bạn có chắc chắn muốn xóa danh mục【<b>{item.SysCategoryName}</b>】?</Text>
                        </ModalTextWrapper>
                        <ModalButton onClick={toggleModal}>Quay lại</ModalButton>
                        <ModalButton red onClick={() => { handleDeleteItem(item.SystemCategoryId); toggleModal() }}>Xóa</ModalButton>
                    </Modal>
                </ButtonWrapper>

            </CategoryContent>

            {child &&
                item.InverseBelongToNavigation.map((item, index) => {
                    return (
                        <CategoryItem item={item} handleDeleteItem={handleDeleteItem} key={index} />
                    );
                })
            }
        </>
    );
}

export default CategoryItem;