import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import CategoryList from '../../components/Category/CategoryList';
import AddCircle from '@mui/icons-material/AddCircle';
import { publicRequest, api } from "../../RequestMethod";
import { Search } from '@mui/icons-material';
import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';

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
    width: 31%;
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
    background-color: #17a2b8;
    border-style: none;
    border-radius: 5px;
    color: #fff;    

    &:focus {
    opacity: 0.5;
    }
`;

const SelectWrapper = styled.div`
    display: flex;
    width: ${props => props.width};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #E0E0E0;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
`;

const Select = styled.select`
    padding: 4px;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;

    &:focus {
    outline: 0;
    }
`;

const AddCategoryButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #28a745;
    height: 44px;
    width: 15%;
    border-style: none;
    border-radius: 5px;
    color: #fff;
    text-decoration: none;
    font-size: 0.9em;
    margin-left: 31%;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

    &:focus {
    opacity: 0.5;
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
`;

const ModalContent = styled.p`
    margin: 25px 20px;
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
    const location = useLocation(); //để fetch state name truyền từ AddCategory qua

    const [DeleteModal, toggleDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState({id: '', name: ''});

    const [APIdata, setAPIdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [change, setChange] = useState(false);
    const [search, setSearch] = useState(''); //search filter
    const [status, setStatus] = useState('3001'); //status filter

    useEffect(() => {
        if (location.state && location.state.name) {
            const notify = () => toast.success("Tạo thành công " + location.state.name + "!", {
                position: toast.POSITION.TOP_CENTER
              });
            notify();
        }
    }, [location]);

    useEffect(() => {
        const url = "systemCategory/all";

        const fetchData = async () => {
            api.get(url)
            .then(function (res) {
                setAPIdata(res.data.Data);
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

    const handleGetDeleteItem = (id, name) => {
        setDeleteItem({id: id, name: name});
        toggleDeleteModal(!DeleteModal)
    }

    const handleDeleteItem = (id) => {
        const url = "systemCategory/" + id;
        const deleteData = async () => {
            try {
                const res = await fetch(publicRequest(url), { method: 'DELETE' });
                const json = await res.json();
                if (json.ResultMessage === "SUCCESS") {
                    setChange(!change);
                    const notify = () => toast.success("Xóa thành công " + deleteItem.name + "!", {
                        position: toast.POSITION.TOP_CENTER
                      });
                    notify();
                }
            } catch (error) { }
        };
        deleteData();
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

                    <SelectWrapper width="16%">
                        <Select value={status} onChange={(event) => handleSearch(search, event.target.value)}>
                            <option value="3001">Đang hoạt động</option>
                            <option value="3002">Ngừng hoạt động</option>
                            <option value="3004">Đã xóa</option>
                            <option value="0">-- Hiển thị tất cả --</option>
                        </Select>
                    </SelectWrapper>

                    <AddCategoryButton to={"/addCategory"}>
                        <AddCategoryIcon />
                        Tạo danh mục mới
                    </AddCategoryButton>
                </Row>
            </TableWrapper>

            
            <CategoryListWrapper>
                <CategoryList currentItems={filteredData} handleGetDeleteItem={handleGetDeleteItem} />
            </CategoryListWrapper>


            
            <Modal isOpen={DeleteModal} onRequestClose={() => toggleDeleteModal(!DeleteModal)} style={customStyles} ariaHideApp={false}>
                <ModalTitle>Xác Nhận Xóa</ModalTitle>
                <ModalContentWrapper>
                    <ModalContent>Bạn có chắc chắn muốn xóa danh mục【<b>{deleteItem.name}</b>】?</ModalContent>
                </ModalContentWrapper>
                <ModalButtonWrapper>
                    <ModalButton onClick={() => toggleDeleteModal(!DeleteModal)}>Quay lại</ModalButton>
                    <ModalButton red onClick={() => { handleDeleteItem(deleteItem.id); toggleDeleteModal(!DeleteModal) }}>Xóa</ModalButton>
                </ModalButtonWrapper>
            </Modal>
        </PageWrapper>
    )
}

export default Category;