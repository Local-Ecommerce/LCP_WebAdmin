import React from 'react';
import NewsItem from './NewsItem';

const NewsList = ({ currentItems, handleGetDetailItem, handleGetToggleStatusItem }) => {

    if (currentItems.length === 0) {
        return <NewsItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <NewsItem
                item={item} index={index} key={index}
                handleGetDetailItem={handleGetDetailItem}
                handleGetToggleStatusItem={handleGetToggleStatusItem}
            />
        )
    });
}

export default NewsList;