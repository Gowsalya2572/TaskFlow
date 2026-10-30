import React from 'react'

const Alert = ({type="info", message}) => {

    const styles={
        success: "border-green-200 bg-green-50 text-green-700",
        error: "border-red-200 bg-red-50 text-red-700",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-700",
        info: "border-blue-200 bg-blue-50 text-blue-700"
    };
    if(!message) return null;

  return (
    <div  role='alert' className={`rounded-lg border p-3 text-sm ${styles[type] || styles.info}`}>
        {message}
    </div>
  );
};

export default Alert
