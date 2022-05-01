import { React } from 'react';
import FeedbackItem from './FeedbackItem';

const FeedbackList = ({ currentItems, handleGetItem }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <FeedbackItem 
                item={item} 
                key={index}
                handleGetItem={handleGetItem}
            />
        )
    });
}

export default FeedbackList;