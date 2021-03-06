import React, { useState } from "react";
import "./ProductionOrder.scss";
import "./ProductionOrderItem";
import ProductionOrderItem from "./ProductionOrderItem";
import Axios from "axios";

export default function ProductionOrder({
  setSelectedOrders,
  selectedOrders,
  id,
  items,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  let cssClass = "";
  if (selectedOrders.find((ele) => ele === id)) {
    cssClass = "order-selected";
  }
  const orders = items.map((item, index) => {
    return (
      <ProductionOrderItem
        key={index}
        id={index}
        name={item.name}
        mods={item.mods}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    );
  });

  //Mark order complete in db
  const completeOrder = () => {
    const data = { isFood: true };
    Axios.post(`/api/orders/${items[0].order_id}/make`, data);
  };

  return (
    <div className="order-container">
      <div
        className={"prod-order " + cssClass}
        onClick={() => {
          setSelectedOrders([...selectedOrders, id]);
          if (selectedOrders.find((ele) => ele === id)) {
            cssClass = "";
            setSelectedOrders(
              [...selectedOrders].splice(
                [...selectedOrders].find((ele) => ele === id),
                1
              )
            );
          }
        }}
      >
        <div>
          <h3> ORDER NUMBER: {items[0].order_id}</h3>
          <ul className="scroll-y">{orders}</ul>
        </div>
        <div className="mark-complete">
          <p
            onClick={() => {
              completeOrder();
            }}
          >
            Mark Complete
          </p>
        </div>
      </div>
    </div>
  );
}
