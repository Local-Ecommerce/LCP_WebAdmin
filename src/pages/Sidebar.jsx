import React from 'react';
import styled from 'styled-components';
import Logo from '../components/Sidebar/Logo';
import SidebarData from '../components/Sidebar/SidebarData';
import SidebarItem from '../components/Sidebar/SidebarItem';

const SidebarWrapper = styled.div`
    background-color: #F8F8F8;
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

const PaddingBlock = styled.div`
    height: 100px;
`;

const Sidebar = () => {
    return (
        <SidebarWrapper>
            <Logo />

            {SidebarData.map((item, index) => {
                return <SidebarItem item={item} key={index} />;
            })}

            <PaddingBlock />
        </SidebarWrapper>
    );
};

export default Sidebar;