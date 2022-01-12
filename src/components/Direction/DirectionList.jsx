import React from 'react';
import styled from 'styled-components';
import DirectionItem from './DirectionItem';
import Stores from '../../mockdata/Stores';

const ButtonWrapper = styled.div`
    display: flex;
    width: 500px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border-radius: 5px;
    border-color: #E0E0E0;
    border-style: solid;
    border-width: thin;
    height: 48px;
    padding: 0px 3px 0px 8px;
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
    height: 40px;
    width: 80px;
    background-color: #17a2b8;
    color: #ffffff;
    text-transform: uppercase;
    border-style: none;
    border-radius: 5px;

    &:focus {
    opacity: 0.5;
    }
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    justify-content: center;
`;

const DirectionList = () => {
    return (
        <div>
            <ButtonWrapper>
                <Input placeholder="Search tên cửa hàng" />
                <Button className="btn btn-info" type="button">Clear</Button>
            </ButtonWrapper>

            <Row>
                {Stores.map((item, index) => {
                    return <DirectionItem item={item} key={index} />
                })}
            </Row>
        </div>
    );
}

export default DirectionList;