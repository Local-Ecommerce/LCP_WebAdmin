import React from 'react';
import styled from "styled-components";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 28%;
    height: 125px;
    background-color: #F8F8F8;
    border-color: grey;
    box-shadow: rgba(0,0,0,0.0) 0px 2px 3px, inset rgba(0,0,0,0.2) 0px -1px 2px;
    border-radius: 5px;
    padding: 5px;
    margin: 2%;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const Title = styled.h1`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 600;
    border-bottom: 1px solid black;
    padding: 0px 10px 10px 10px;
    color: #383838;
`;

const Description = styled.p`
    display: flex;
    font-size: 0.9em;
    margin: 7px 7px 7px 0px;
    padding: 0px 0px 0px 10px;
    color: #383838;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ArrowIcon = styled(ArrowCircleRightIcon)`
    float:right;
`;

const AddressIcon = styled(HomeIcon)`
    padding-right: 5px;
`;

const ManagerIcon = styled(PersonIcon)`
    padding-right: 5px;
`;

const DirectionItem = ({ item }) => {
    return (
        <Wrapper>
            <Title>{item.name} <ArrowIcon sx={{ fontSize: 22 }} /></Title>
            <Description> <AddressIcon sx={{ fontSize: 15 }} /> {item.address}</Description>
            <Description> <ManagerIcon sx={{ fontSize: 15 }} /> {item.manager}</Description>
        </Wrapper>
    );
};

export default DirectionItem;