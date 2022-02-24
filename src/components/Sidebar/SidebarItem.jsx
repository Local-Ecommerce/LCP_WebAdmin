import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 0px 20px;
    list-style: none;
    height: 55px;
    text-decoration: none;
    color: ${props => props.theme.dark};
    font-size: 0.9em;
    font-weight: 600;

    &:hover, &:focus, &[class*="active"] {
        background-color: ${props => props.theme.hover};
        cursor: pointer;
        text-decoration: none;
        color: ${props => props.theme.blue};
    }
`;

const SidebarDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 20px;
    list-style: none;
    height: 30px;
    text-decoration: none;
    color: rgba(0,0,0,0.3);
    font-size: 14px;
    font-weight: 600;
    margin-top: 15px;
`;

const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SidebarItem = ({ item }) => {
    const user = JSON.parse(localStorage.getItem('USER'));

    let role = "";
    if (user.RoleId === "R002") {
        role = "Admin";
    } else if (user.RoleId === "R001" && user.Residents[0].Type === "MarketManager") {
        role = "MarketManager";
    }

    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);

    return (
        (
            item.role && item.role !== role ?
            null :
            <>
                {
                item.path ?
                <SidebarLink to={item.path} onClick={item.subNav ? showSubnav : null}>
                    <Row>
                        {item.icon}
                        {item.title}
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

                <SidebarDiv>
                    {item.title}
                </SidebarDiv>
                }
            </>
        )
    );
};

export default SidebarItem;