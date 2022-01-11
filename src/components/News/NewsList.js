import React from 'react';
import NewsItem from './NewsItem';

const NewsList = ({ currentItems, handleDeleteItem }) => {

    if (currentItems.length === 0) {
        return <NewsItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <NewsItem
                item={item}
                handleDeleteItem={handleDeleteItem} key={index}
            />
        )
    });
}

export default NewsList;