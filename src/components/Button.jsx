import React from 'react'

const Button = ({
    children,
    variant="primary",
    type="button",
    disabled=false,
    onClick,
    className="",
}) => {

    const baseStyles = "inline-flex justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
    
    const variants ={
        primary: "bg-primary text-white hover:bg-primary-hover",
        outline: "border border-primary text-primary hover:bg-indigo-50",
        ghost: "text-text-main hover:bg-slate-100",
        danger: "bg-danger text-white hover:bg-red-600",
    }
  return (
    <button 
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`${baseStyles} ${variants[variant]} ${className}`}
    >
        {children}
    </button>
  )
}

export default Button
