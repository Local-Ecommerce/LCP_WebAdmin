import React from 'react';
import styled from 'styled-components';
import SidebarData from '../components/Sidebar/SidebarData';
import SidebarItem from '../components/Sidebar/SidebarItem';
import { Logout } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const SidebarWrapper = styled.div`
    background-color: #fff;
    text-decoration: none;
    min-width: 245px;
    max-width: 245px;
    height: 100vh;
    border-right: 1px solid #E0E0E0;
    position: fixed; 
    z-index: 1; 
    top: 0; 
    left: 0;
    overflow-y:scroll;

    &::-webkit-scrollbar {
    display: none;
    }
`;

const SidebarDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 0px 20px 0px 20px;
    list-style: none;
    height: 50px;
    text-decoration: none;
    color: #44474a;
    font-size: 0.9em;
    font-weight: 600;

    &:hover {
        background-color: rgba(246, 246, 247, 1);
        cursor: pointer;
        text-decoration: none;
        color: #17a2b8;
    }

    &:focus {
        background-color: rgba(246, 246, 247, 1);
        cursor: pointer;
        text-decoration: none;
        color: #17a2b8;
    }
`;

const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;

const PaddingBlock = styled.div`
    height: 100px;
`;

const Sidebar = () => {
    let navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    }

    return (
        <SidebarWrapper>
            <PaddingBlock />

            {SidebarData.map((item, index) => {
                return <SidebarItem item={item} key={index} />;
            })}

            <SidebarDiv pad={false} onClick={() => handleLogOut()}>
                <Row>
                    <Logout />
                    <SidebarLabel>Log out</SidebarLabel>
                </Row>
            </SidebarDiv>

            <PaddingBlock />
        </SidebarWrapper>
    );
};

export default Sidebar;