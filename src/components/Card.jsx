import React from 'react'

const Card = ({children,className=""}) => {
  return (
    <div className={`rounded-xl border border-border bg-surface p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card
