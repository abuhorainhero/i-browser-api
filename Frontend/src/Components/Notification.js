import React from 'react';
import {  NotificationManager } from 'react-notifications';

const createNotification = (type, main, low) => {
    switch (type) {
        case 'info':
            NotificationManager.info(low, main, 2000);
            break;
        case 'success':
            //console.log("click")
            NotificationManager.success(low, main, 2000);
            break;
        case 'warning':
            NotificationManager.warning(low, main, 3000);
            break;
        case 'error':
            NotificationManager.error('Error message', 'Click me!', 5000, () => {
                //alert('callback');
            });
            break;
    }
};

export default createNotification;


