import React from 'react';
import { FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';
import { useToastStore } from '../store/notifications/toastStore';

const ToastNotification: React.FC = () => {

    const {message, type, animationClass} = useToastStore();

    const typeStyle = {
        success:"bg-green-500 text-white",
        error:"bg-red-500 text-white",
        info:"bg-blue-500 text-white"
    }

    const icons = {
        success: <FiCheckCircle size={20}/>,
        error: <FiXCircle size={20}/>,
        info: <FiInfo size={20} />
    }


    return (
      <div className={`toast-base ${animationClass} ${typeStyle[type]}`}>
        {icons[type]}
        <span>{message}</span>
      </div>
    );
};

export default ToastNotification;