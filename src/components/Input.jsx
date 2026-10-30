import React from 'react'

const Input = ({
    label,
    type="text",
    name,
    value,
    onChange,
    placeholder="",
    error,
    disabled=false,
    required=false,
    className="",
}) => {

  return (
    <div className='w-full space-y-1.5'>
      {label && (
        <label htmlFor={name} 
        className='block text-sm font-medium text-text-main'
        >
         {label}
        </label>
      )}
      <input  
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      aria-invalid={Boolean(error)}
      className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition ${className}
       ${
            error
              ? "border-danger focus:ring-2 focus:ring-red-200"
              : "border-border focus:border-primary focus:ring-2 focus:ring-indigo-100"
          }
          disabled:cursor-not-allowed disabled:bg-slate-100`}
          />
          {error && (
            <p className='text-xs text-danger'>{error}</p>
          )}
    </div>
  );
};

export default Input
