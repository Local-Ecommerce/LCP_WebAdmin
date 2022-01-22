import { React } from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ currentItems, handleNavigate }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <NotificationItem item={item}
            handleNavigate={handleNavigate}  key={index} />
        )
    });
}

export default NotificationList;