import React from "react";
import "./MenuItem.scss";

export default function MenuItem({ name, price, id, setBill, bill, seat }) {
  let newTotal = bill.total;
  let newSubtotal = bill.subtotal;
  let newTax = bill.tax;
  const changePrice = () => {
    newSubtotal += price;
    newTax = newSubtotal * 0.13;
    newTotal = newSubtotal + newTax;
  };
  return (
    <div
      className="menu-item"
      onClick={() => {
        changePrice();
        setBill({
          items: [...bill.items, { name, price, id, seat }],
          total: newTotal,
          subtotal: newSubtotal,
          tax: newTax,
        });
      }}
    >
      <div className="menu-item-inside">
        <h3 className="item-name">{name}</h3>
        <h3 className="price">${price}</h3>
      </div>
    </div>
  );
}
