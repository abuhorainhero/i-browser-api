import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';


const createNotification = (type, main, low) => {
  //console.log(type)
  switch (type) {
    case 'info':
      NotificationManager.info(low, main, 2000);
      break;
    case 'success':
      //console.log("click")
      NotificationManager.success(low, main, 2000);
      break;
    case 'warning':
      NotificationManager.warning(low, main, 2000);
      break;
    case 'error':
      NotificationManager.error('Error message', 'Click me!', 2000, () => {
        //alert('callback');
      });
      break;
  }

};

export default createNotification;


