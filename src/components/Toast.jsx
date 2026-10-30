import React, { useEffect } from 'react'

const Toast = ({
    message,
    type="success",
    onClose,
    duration=3000,
}) => {
 
    useEffect(()=>{
        if(!message) return;

        const timer=setTimeout(()=>{
            onClose?.();
        },duration);

        return ()=> clearTimeout(timer);

    },[message,duration,onClose]);

    if(!message) return null;

    const styles={
        success: "bg-green-600",
        error: "bg-red-600",
        warning: "bg-yellow-500",
        info: "bg-blue-600",
    }
  return (
    <div role='status'
    className={`fixed right-5 top-5 z-[60] rounded-lg px-5 py-3 text-sm text-white shadow-lg ${styles[type] || styles.info}`}>
      {message}
    </div>
  )
}

export default Toast
