import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Edit, Delete } from '@mui/icons-material';

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
    padding: 1rem;
    vertical-align: top;
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    overflow: hidden;
    white-space: nowrap;
`;

const Status = styled.span`
    display: inline-block;
    padding: 4px 6px;
    font-size: 0.8em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
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

const Form = styled.form`
    padding: 20px;
    margin: 0 auto;
    width: 50%;
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 20px;
`;

const ItemLabel = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
`;

const ItemInput = styled.input`
    border: none;
    height: 30px;
    border-bottom: 1px solid gray;
    outline: none;

    &: focus {
    outline: none;
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
    const [DeleteModal, changeDeleteModal] = React.useState(false);
    const [EditModal, changeEditModal] = React.useState(false);
    const toggleDeleteModal = () => changeDeleteModal(!DeleteModal);
    const toggleEditModal = () => changeEditModal(!EditModal);

    if (item === 0) {
        return (
            <TableRow>
                <TableData colSpan={4} >
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
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
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
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
                <Button onClick={toggleEditModal}>
                    <StyledEditIcon />
                </Button>

                <Button disabled={disabledCheck} onClick={toggleDeleteModal}>
                    <StyledDeleteIcon disabled={disabledCheck} />
                </Button>

                <Modal isOpen={EditModal} onRequestClose={toggleEditModal} style={customStyles} ariaHideApp={false}>
                    <Title>Chỉnh sửa sản phẩm</Title>

                    <Form id="form">
                    <Item>
                        <ItemLabel>Tựa đề</ItemLabel>
                        <ItemInput type="text" name="title" />
                    </Item>

                    <Item>
                        <ItemLabel>Nội dung</ItemLabel>
                        <ItemInput type="text" name="text" />
                    </Item>

                    <Item>
                        <ItemLabel>ID Quản lý</ItemLabel>
                        <ItemInput type="text" name="marketManagerId" />
                    </Item>

                    <Item>
                        <ItemLabel>ID Chung cư</ItemLabel>
                        <ItemInput type="text" name="apartmentId" />
                    </Item>

                    <ModalButton red onClick={() => { handleDeleteItem(item.ProductId); toggleEditModal()}}>Cập nhật</ModalButton>
                </Form>

                </Modal>

                <Modal isOpen={DeleteModal} onRequestClose={toggleDeleteModal} style={customStyles} ariaHideApp={false}>
                    <Title>Xác Nhận Xóa</Title>
                    <Row><Text>Bạn có chắc chắn muốn xóa sản phẩm【<Name>{item.ProductName}</Name>】?</Text></Row>
                    <ModalButton onClick={toggleDeleteModal}>Quay lại</ModalButton>
                    <ModalButton red onClick={() => { handleDeleteItem(item.ProductId); toggleDeleteModal()}}>Xóa</ModalButton>
                </Modal>
            </TableData>
        </TableRow>
    )
}

export default ProductItem;