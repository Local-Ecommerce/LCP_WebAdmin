import React from 'react';
import CollectionItem from './CollectionItem';

const CollectionList = ({ currentItems, handleGetDeleteItem }) => {

    if (currentItems.length === 0) {
        return <CollectionItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <CollectionItem
                item={item}
                handleGetDeleteItem={handleGetDeleteItem} key={index}
            />
        )
    });
}

export default CollectionList;