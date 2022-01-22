import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
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

const SidebarItem = ({ item }) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            {
            (item.path !== null) ?
            <SidebarLink pad={item.icon === '' ? true : false} to={item.path} onClick={item.subNav && showSubnav}>
                <Row>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </Row>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                            ? item.iconClosed
                            : null}
                </div>
            </SidebarLink> 
            :
            <SidebarDiv pad={item.icon === '' ? true : false} to={item.path} onClick={item.subNav && showSubnav}>
                <Row>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </Row>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                            ? item.iconClosed
                            : null}
                </div>
            </SidebarDiv>
            }
            {subnav &&
                item.subNav.map((item, index) => {
                    return (
                        <SidebarItem item={item} pad key={index}/>
                    );
                })}
        </>
    );
};

export default SidebarItem;