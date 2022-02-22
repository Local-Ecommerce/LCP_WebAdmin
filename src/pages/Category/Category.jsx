import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import CategoryList from '../../components/Category/CategoryList';
import { AddCircle } from '@mui/icons-material';
import { api } from "../../RequestMethod";
import { Search } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { TextField, MenuItem } from '@mui/material';

const PageWrapper = styled.div`
    margin: 50px 40px;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: ${props => props.mb ? "30px" : "0px"};
`;

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const SearchBar = styled.div`
    display: flex;
    width: 50%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #D8D8D8;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
`;

const CategoryListWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 50px;
`

const Input = styled.input`
    padding: 4px;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;
    margin-right: 8px;

    &:focus {
    outline: 0;
    }
`;

const Button = styled.button`
    height: 36px;
    width: 70px;
    background-color: ${props => props.theme.blue};
    border-style: none;
    border-radius: 5px;
    color: #fff;    

    &:focus {
    opacity: 0.5;
    }
`;

const AddCategoryButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.blue};
    height: 44px;
    width: 15%;
    border-style: none;
    border-radius: 5px;
    color: #fff;
    text-decoration: none;
    font-size: 0.9em;
    margin-left: 31%;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

    &:hover {
    opacity: 0.8;
    }
`;

const AddCategoryIcon = styled(AddCircle)`
    padding-right: 5px;
`;

const TableWrapper = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const ModalTitle = styled.h2`
    margin: 25px 20px;
    color: #212529;
`;

const ModalContentWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    border-bottom: 1px solid #cfd2d4;
    padding: 25px;
`;

const FormLabel = styled.div`
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: ${props => props.mt ? "30px" : null};
`;

const DangerModalContent = styled.div`
    color: #762a36;
    padding: 20px;
    background: #f8d7da;
    border-radius: 5px;
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    float: right;
`;

const ModalButton = styled.button`
    min-width: 80px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
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

const Category = () => {
    const [CreateModal, toggleCreateModal] = useState(false);
    const [input, setInput] = useState({ name: '', type: '', belongTo: '', belongToName: '' })
    const types = ['Tươi sống', 'Khác'];
    const [error, setError] = useState({ nameError: '', typeError: '' })
    const [DeleteModal, toggleDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState({ id: '', name: '' });

    const [APIdata, setAPIdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [change, setChange] = useState(false);
    const [search, setSearch] = useState(''); //search filter
    const [status, setStatus] = useState('3001'); //status filter

    useEffect(() => {
        const url = "categories";
        const fetchData = () => {
            api.get(url)
            .then(function (res) {
                setAPIdata(res.data.Data.List);
            })
            .catch(function (error) {
                console.log(error);
            });
        };
        fetchData();
    }, [change]);

    useEffect(() => {   //filter based on 'search' & 'status'
        const result = APIdata.filter((item) => {
            if (status !== '0') {
                return [item.SystemCategoryId, item.SysCategoryName].join('').toLowerCase().includes(search.toLowerCase())
                        && item.Status === parseInt(status)
            } else {
                return [item.SystemCategoryId, item.SysCategoryName].join('').toLowerCase().includes(search.toLowerCase())
            }
        })
        setFilteredData(result);
    }, [search, status, APIdata]);

    const handleSearch = (searchValue, statusValue) => {
        setSearch(searchValue);
        setStatus(statusValue);
    }

    const clearSearch = () => {
        setSearch('');
        document.getElementById("search").value = '';
    }

    const handleToggleCreateModal = () => {
        setInput({ name: '', type: '', belongTo: '', belongToName: '' });
        toggleCreateModal(!CreateModal);
    }

    const handleGetCreateItem = (id, name) => {
        setInput({ name: '', type: '', belongTo: id, belongToName: name });
        toggleCreateModal(!CreateModal);
    }

    const handleGetDeleteItem = (id, name) => {
        setDeleteItem({ id: id, name: name });
        toggleDeleteModal(!DeleteModal);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    const handleAddItem = (event) => {
        event.preventDefault();
        if (validCheck()) {
            const url = "categories";
            const addData = async () => {
                api.post(url, {
                    sysCategoryName: input.name,
                    type: input.type,
                    belongTo: input.belongTo || null
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Tạo thành công danh mục " + input.name + "!", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        notify();
                        toggleCreateModal(!CreateModal);
                        setChange(!change);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            };
            addData();
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, nameError: '', typeError: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, nameError: 'Vui lòng nhập tên danh mục' }));
            check = true;
        }
        if (input.type === null || input.type === '') {
            setError(error => ({ ...error, typeError: 'Vui lòng chọn loại danh mục' }));
            check = true;
        }
        if (check === true) {
            return false;
        }
        return true;
    }

    const handleEditItem = (id, name, type, belongTo, status) => {
        const url = "categories?id=" + id;
        const editData = async () => {
            api.put(url, {
                sysCategoryName: name,
                type: type,
                status: status,
                belongTo: belongTo
            })
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    const notify = () => toast.success("Cập nhật thành công " + name + "!", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    notify();
                    setChange(!change);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        editData();
    }

    const handleDeleteItem = (event) => {
        event.preventDefault();
        const url = "categories?id=" + deleteItem.id;
        const deleteData = async () => {
            api.delete(url)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    const notify = () => toast.success("Xóa thành công danh mục " + deleteItem.name + "!", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    notify();
                    setChange(!change);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        };
        deleteData();
        toggleDeleteModal(!DeleteModal);
    };

    return (
        <PageWrapper>
            <Title>Danh mục</Title>

            <TableWrapper>
                <Row>
                    <SearchBar>
                        <StyledSearchIcon />
                        <Input id="search" placeholder="Search tên danh mục" onChange={(event) => handleSearch(event.target.value, status)} />
                        <Button onClick={() => clearSearch()}>Clear</Button>
                    </SearchBar>

                    <AddCategoryButton onClick={handleToggleCreateModal}>
                        <AddCategoryIcon />
                        Tạo danh mục mới
                    </AddCategoryButton>
                </Row>
            </TableWrapper>

            
            <CategoryListWrapper>
                <CategoryList 
                    currentItems={filteredData} 
                    getCreateItem={handleGetCreateItem}
                    getEditItem={handleEditItem}
                    getDeleteItem={handleGetDeleteItem} 
                />
            </CategoryListWrapper>


            <Modal isOpen={CreateModal} onRequestClose={() => toggleCreateModal(!CreateModal)} style={customStyles} ariaHideApp={false}>
                <ModalTitle>Tạo danh mục mới</ModalTitle>
                <ModalContentWrapper>
                    <FormLabel>Tên danh mục</FormLabel>
                    <TextField
                        fullWidth size="small" 
                        value={input.name ? input.name : ''} name='name'
                        onChange={handleChange}
                        error={error.nameError !== ''}
                        helperText={error.nameError}
                    />

                    <FormLabel mt>Loại</FormLabel>
                    <TextField
                        fullWidth size="small" select
                        value={input.type ? input.type : ''} name='type'
                        onChange={handleChange}
                        error={error.typeError !== ''}
                        helperText={error.typeError}
                    >
                        {types.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </TextField>
                    
                    {
                    input.belongTo === '' ?
                    null :
                    <>
                        <FormLabel mt>Danh mục cha</FormLabel>
                        <TextField
                            fullWidth size="small"
                            InputProps={{ readOnly: true }}
                            value={input.belongToName ? input.belongToName : ''} name='name'
                            onChange={handleChange}
                        />
                    </>
                    }
                </ModalContentWrapper>
                <ModalButtonWrapper>
                    <ModalButton onClick={() => toggleCreateModal(!CreateModal)}>Quay lại</ModalButton>
                    <ModalButton blue onClick={handleAddItem}>Tạo</ModalButton>
                </ModalButtonWrapper>
            </Modal>

            
            <Modal isOpen={DeleteModal} onRequestClose={() => toggleDeleteModal(!DeleteModal)} style={customStyles} ariaHideApp={false}>
                <ModalTitle>Xác Nhận Xóa</ModalTitle>
                <ModalContentWrapper>
                    <DangerModalContent>Bạn có chắc chắn muốn xóa danh mục【<b>{deleteItem.name}</b>】?</DangerModalContent>
                </ModalContentWrapper>
                <ModalButtonWrapper>
                    <ModalButton onClick={() => toggleDeleteModal(!DeleteModal)}>Quay lại</ModalButton>
                    <ModalButton red onClick={handleDeleteItem}>Xóa</ModalButton>
                </ModalButtonWrapper>
            </Modal>
        </PageWrapper>
    )
}

export default Category;