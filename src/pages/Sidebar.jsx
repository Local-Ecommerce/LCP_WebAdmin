import React from 'react';
import styled from 'styled-components';
import Logo from '../components/Sidebar/Logo';
import SidebarData from '../components/Sidebar/SidebarData';
import SidebarItem from '../components/Sidebar/SidebarItem';
import { Logout } from '@mui/icons-material';
import { useHistory } from "react-router-dom";

const SidebarWrapper = styled.div`
    background-color: #2f353a;
    text-decoration: none;
    min-width: 260px;
    max-width: 260px;
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
    padding: 0px 20px 0px  ${props => props.pad ? "30px" : "20px"};
    list-style: none;
    height: 60px;
    text-decoration: none;
    color: #bac3b7;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

    &:hover {
        background-color: #3a4248;
        cursor: pointer;
        text-decoration: none;
        color: #bac3b7;
    }

    &:focus {
        background-color: #3a4248;
        cursor: pointer;
        text-decoration: none;
        color: #bac3b7;
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
    let history = useHistory();

    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        history.push("/login");
    }

    return (
        <SidebarWrapper>
            <Logo />

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