import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Edit, Delete, ContentPasteSearch } from '@mui/icons-material';
import { Link } from "react-router-dom";

const Image = styled.img`
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const Button = styled.button`
    padding: 3px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: ${props => props.disabled === true ? "#E0E0E0" : "grey"};

    &:focus {
    outline: none;
    }
`;

const TableRow = styled.tr`
    &:hover {
    background-color: rgba(0, 0, 0, 0.075);
    }
`;

const TableData = styled.td`
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    overflow: hidden;
    white-space: nowrap;
`;

const Status = styled.span`
    display: inline-block;
    padding: 8px 10px 8px 10px;
    font-size: 0.9;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    color: #fff;
    background-color: ${props => props.active === "verified" ? "#28a745"
        :
        props.active === "unverified" ? "#FF8800"
            :
            props.active === "deleted" ? "#dc3545"
                :
                "#dc3545"};
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

const Row = styled.div`
    margin: 15px;
`;

const Text = styled.p`
    color: #000;
    margin: 5px 0px 0px 0px;
    font-size: 0.9em;
    display: inline-block;
`;

const Name = styled(Text)`
    font-weight: bold;
`;

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
    color: ${props => props.disabled === true ? "#E0E0E0" : "#dc3545"};
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
    },
};

const ProductItem = ({ item, handleDeleteItem }) => {
    const [DeleteModal, toggleDeleteModal] = React.useState(false);

    const toggleModal = () => {
        toggleDeleteModal(!DeleteModal);
    }

    if (item === 0) {
        return (
            <TableRow>
                <td colspan="6">
                    <h4>Không tìm thấy dữ liệu.</h4>
                </td>
            </TableRow>
        )
    }
    let activeCheck = '';
    let activeLabel = '';
    let disabledCheck = false;
    switch (item.Status) {
        case 1004:
            activeCheck = 'deleted';
            activeLabel = 'Deleted';
            disabledCheck = true;
            break;
        case 1005:
            activeCheck = 'verified';
            activeLabel = 'Verified';
            break;
        case 1006:
            activeCheck = 'unverified';
            activeLabel = 'Unverified - Create';
            break;
        case 1007:
            activeCheck = 'unverified';
            activeLabel = 'Unverified - Update';
            break;
    }

    return (
        <TableRow>
            <TableData center><Image src={item.Image} /></TableData>
            <TableData>{item.ProductName}</TableData>
            <TableData>{item.ProductType}</TableData>
            <TableData center>{item.DefaultPrice}</TableData>

            <TableData center>
                <Status active={activeCheck}>{activeLabel}</Status>
            </TableData>

            <TableData center>
                <Link to={"/"}>
                    <Button>
                        <StyledSearchIcon />
                    </Button>
                </Link>

                <Link to={"/"}>
                    <Button>
                        <StyledEditIcon />
                    </Button>
                </Link>

                <Button disabled={disabledCheck} onClick={toggleModal}>
                    <StyledDeleteIcon disabled={disabledCheck} />
                </Button>

                <Modal isOpen={DeleteModal} onRequestClose={toggleModal} style={customStyles} ariaHideApp={false}>
                    <Title>Xác Nhận Xóa</Title>
                    <Row><Text>Bạn có chắc chắn muốn xóa sản phẩm【<Name>{item.name}</Name>】?</Text></Row>
                    <ModalButton onClick={toggleModal}>Quay lại</ModalButton>
                    <ModalButton red onClick={() => { handleDeleteItem(item.ProductId); toggleModal()}}>Xóa</ModalButton>
                </Modal>
            </TableData>
        </TableRow>
    )
}

export default ProductItem;