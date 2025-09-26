import React from 'react';

function MenuItem({ item }) {
  return (
    <div className="menu-item">
      {item.image && (
        <img src={item.image} alt={item.name} className="menu-img" style={{width:'60px',height:'60px',objectFit:'cover',borderRadius:'8px',marginBottom:'0.5em'}} />
      )}
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <span>₹{item.price.toFixed(2)}</span>
    </div>
  );
}

export default MenuItem;
