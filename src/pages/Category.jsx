import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryList from '../components/Category/CategoryList';
import { AddCircle } from '@mui/icons-material';
import { api } from "../RequestMethod";
import { Search } from '@mui/icons-material';
import { toast } from 'react-toastify';
import * as Constant from '../Constant';

import CreateModal from '../components/Category/CreateModal';
import DeleteModal from '../components/Category/DeleteModal';

const PageWrapper = styled.div`
    margin: 50px 40px;
`;

const CategoryListWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 50px;
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

const Align = styled.div`
    display: flex;
    width: 80%;
    align-items: center;
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
    margin-right: 15px;
`;

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

const DropdownWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #D8D8D8;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
    margin-right: 15px;
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

const AddButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: ${props => props.theme.green};
    border-style: none;
    border-radius: 5px;
    color: ${props => props.theme.white};
    text-decoration: none;
    font-size: 0.9em;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

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

const AddIcon = styled(AddCircle)`
    && {
        margin-right: 5px;
        font-size: 20px;
    }
`;

const TableWrapper = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Category = () => {
    const [createModal, setCreateModal] = useState(false);
    function toggleCreateModal() { setCreateModal(!createModal); }
    const [deleteModal, setDeleteModal] = useState(false);
    function toggleDeleteModal() { setDeleteModal(!deleteModal); }
    const [input, setInput] = useState({ name: '', belongTo: '', belongToName: '' })
    const [error, setError] = useState({ name: '' })
    const [deleteItem, setDeleteItem] = useState({ id: '', name: '' });
    
    const [APIdata, setAPIdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [change, setChange] = useState(false);
    const [search, setSearch] = useState(""); //search filter
    const [status, setStatus] = useState(Constant.ACTIVE_SYSTEM_CATEGORY); //status filter

    useEffect(() => {
        const url = "categories" 
        + "?sort=-syscategoryname" 
        + "&status=" + Constant.ACTIVE_SYSTEM_CATEGORY
        + "&status=" + Constant.INACTIVE_SYSTEM_CATEGORY;
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
            if (status !== Constant.ACTIVE_SYSTEM_CATEGORY + "&status=" + Constant.INACTIVE_SYSTEM_CATEGORY) {
                return [item.SystemCategoryId, item.SysCategoryName].join('').toLowerCase().includes(search.toLowerCase())
                        && item.Status === parseInt(status);
            } else {
                return [item.SystemCategoryId, item.SysCategoryName].join('').toLowerCase().includes(search.toLowerCase());
            }
        })
        setFilteredData(result);
    }, [search, status, APIdata]);

    const clearSearch = () => {
        setSearch('');
        document.getElementById("search").value = '';
    }

    const handleToggleCreateModal = () => {
        setInput({ name: '', belongTo: '', belongToName: '' });
        toggleCreateModal();
    }

    const handleGetCreateItem = (id, name) => {
        setInput({ name: '', belongTo: id, belongToName: name });
        toggleCreateModal();
    }

    const handleGetDeleteItem = (id, name) => {
        setDeleteItem({ id: id, name: name });
        toggleDeleteModal();
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
                const notification = toast.loading("Đang xử lí yêu cầu...");

                api.post(url, {
                    sysCategoryName: input.name,
                    belongTo: input.belongTo || null
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        toast.update(notification, { render: "Tạo danh mục thành công!", type: "success", autoClose: 5000, isLoading: false });
                        toggleCreateModal();
                        setChange(!change);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
                });
            };
            addData();
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, name: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, name: 'Vui lòng nhập tên danh mục' }));
            check = true;
        }
        if (check === true) {
            return false;
        }
        return true;
    }

    const handleEditItem = (id, name, belongTo, status) => {
        const url = "categories?id=" + id;
        const editData = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");

            api.put(url, {
                sysCategoryName: name,
                status: status,
                belongTo: belongTo
            })
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toast.update(notification, { render: "Cập nhật thành công!", type: "success", autoClose: 5000, isLoading: false });
                    setChange(!change);
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        editData();
    }

    const handleDeleteItem = (event) => {
        event.preventDefault();
        const url = "categories?id=" + deleteItem.id;
        const deleteData = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");

            api.delete(url)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toast.update(notification, { render: "Xóa danh mục thành công!", type: "success", autoClose: 5000, isLoading: false });
                    setChange(!change);
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        };
        deleteData();
        toggleDeleteModal();
    };

    return (
        <PageWrapper>
            <Title>Danh mục</Title>

            <TableWrapper>
                <Row>
                    <Align>
                        <SearchBar>
                            <StyledSearchIcon />
                            <Input id="search" placeholder="Search tên danh mục cha" onChange={(event) => setSearch(event.target.value)} />
                            <Button onClick={() => clearSearch()}>Clear</Button>
                        </SearchBar>

                        <small>Trạng thái:&nbsp;</small>
                        <DropdownWrapper width="16%">
                            <Select value={status} onChange={(event) => setStatus(event.target.value)}>
                                <option value={Constant.ACTIVE_SYSTEM_CATEGORY + "&status=" + Constant.INACTIVE_SYSTEM_CATEGORY}>
                                    Toàn bộ
                                </option>
                                <option value={Constant.ACTIVE_SYSTEM_CATEGORY}>Hoạt động</option>
                                <option value={Constant.INACTIVE_SYSTEM_CATEGORY}>Ngừng hoạt động</option>
                            </Select>
                        </DropdownWrapper>
                    </Align>

                    <AddButton onClick={handleToggleCreateModal}>
                        <AddIcon />
                        Tạo danh mục mới
                    </AddButton>
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

            <CreateModal 
                display={createModal}
                toggle={toggleCreateModal}
                input={input}
                error={error} 
                handleChange={handleChange}
                handleAddItem={handleAddItem}
            />

            <DeleteModal 
                display={deleteModal}
                toggle={toggleDeleteModal}
                deleteItem={deleteItem}
                handleDeleteItem={handleDeleteItem}
            />
        </PageWrapper>
    )
}

export default Category;