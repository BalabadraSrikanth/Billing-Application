import React, { useState } from 'react';

import menu from './menuData';
import MenuItem from './MenuItem';
import './menu.css';

const categories = [
  'All',
  'Classic Teas',
  'Herbal Teas',
  'Milkshakes',
  'Mocktails',
];

function App() {
  const [bill, setBill] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const handleSelect = (item) => {
    setBill((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const handleQty = (id, delta) => {
    setBill((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handlePrint = () => {
    // Print only the text bill
    const printContents = document.getElementById('print-bill').innerHTML;
    const win = window.open('', '', 'height=600,width=400');
    win.document.write('<html><head><title>Billing </title>');
    win.document.write('<style>body{font-family:sans-serif;padding:2em;}h2{text-align:center;}table{width:100%;border-collapse:collapse;}th,td{padding:0.5em;border-bottom:1px solid #ccc;text-align:left;}th{text-align:left;}tfoot td{font-weight:bold;}</style>');
    win.document.write('</head><body>');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  const filteredMenu = menu.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="tea-shop-layout">
      <aside className="sidebar">
  <div className="logo"><img src="/Tea.jpeg" alt="Tea" style={{width:'32px',height:'32px',objectFit:'cover',borderRadius:'50%',marginRight:'0.5em'}} /><span>Billing</span></div>
        <ul className="category-list">
          {categories.map((cat) => (
            <li
              key={cat}
              className={selectedCategory === cat ? 'active' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>
      <main className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {categories.filter(c => c !== 'All').map((cat) => (
          <section key={cat} className="menu-section">
            <h2>{cat}</h2>
            <div className="menu-grid">
              {filteredMenu.filter(item => item.category === cat).length === 0 ? (
                <p className="no-items">No items</p>
              ) : (
                filteredMenu.filter(item => item.category === cat).map((item) => (
                  <div key={item.id} className="menu-grid-item" onClick={() => handleSelect(item)}>
                    <MenuItem item={item} />
                  </div>
                ))
              )}
            </div>
          </section>
        ))}
      </main>
      <aside className="order-section">
        <div className="order-header">Current Order</div>
        <div className="order-list">
          {bill.length === 0 ? (
            <p className="no-items">No items selected</p>
          ) : (
            bill.map((item) => (
              <div key={item.id} className="order-item">
                <span className="order-name">{item.name}</span>
                <span className="order-price">₹{item.price.toFixed(2)}</span>
                <div className="order-qty">
                  <button onClick={() => handleQty(item.id, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => handleQty(item.id, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="order-total">
          <div>Subtotal: <span>₹{bill.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}</span></div>
          <div>Tax: <span>₹0.00</span></div>
          <div className="order-grand">Total: <span>₹{bill.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}</span></div>
        </div>
        <div className="payment-methods">
          <span>Payment Method</span>
          <div className="pay-btns">
            <button>Cash</button>
            <button>Card</button>
            <button>E-Wallet</button>
          </div>
        </div>
        <button className="place-order-btn" onClick={handlePrint}>Place Order</button>
        {/* Hidden printable bill */}
        <div id="print-bill" style={{display:'none'}}>
          <h2>Tea Shop</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>₹{(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total</td>
                <td>₹{bill.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </aside>
    </div>
  );
}

export default App
