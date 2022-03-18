import { React } from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ currentItems, handleGetDetailItem }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <NotificationItem 
                item={item} key={index} 
                handleGetDetailItem={handleGetDetailItem}
            />
        )
    });
}

export default NotificationList;