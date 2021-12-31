import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

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
    background-color: ${props => props.active === "active" ? "#28a745" : "#dc3545"};
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

const MenuItem = ({ item, handleDeleteItem }) => {
    const [DeleteModal, toggleDeleteModal] = React.useState(false);

    const toggleModal = () => {
        toggleDeleteModal(!DeleteModal);
    }

    if (item === 0) {
        return (
            <tr>
                <TableData>
                    <h4>Không tìm thấy sản phẩm.</h4>
                </TableData>
            </tr>
        )
    }
    let activeCheck = '';
    let activeLabel = '';
    switch (item.status) {
        case 1:
            activeCheck = 'active';
            activeLabel = 'Active';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'Inactive';
            break;
    }

    return (
        <TableRow>
            <TableData>{item.name}</TableData>

            <TableData center>
                <Status active={activeCheck}>{activeLabel}</Status>
            </TableData>

            <TableData center>
                <Link to={"/menu/" + item.id}>
                    <Button>
                        <EditIcon />
                    </Button>
                </Link>

                <Button onClick={toggleModal}>
                    <DeleteIcon />
                </Button>

                <Modal isOpen={DeleteModal} onRequestClose={toggleModal} style={customStyles}>
                    <Title>Xác Nhận Xóa</Title>
                    <Row><Text>Bạn có chắc chắn muốn xóa bộ sưu tập【<Name>{item.name}</Name>】?</Text></Row>
                    <ModalButton onClick={toggleModal}>Quay lại</ModalButton>
                    <ModalButton red onClick={() => { handleDeleteItem(item.id); toggleModal() }}>Xóa</ModalButton>
                </Modal>
            </TableData>
        </TableRow>
    )
}

export default MenuItem;