import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const handleIncrement = (name, quantity) => {
    dispatch(updateQuantity({ name, quantity: quantity + 1 }));
  };

  const handleDecrement = (name, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ name, quantity: quantity - 1 }));
    } else {
      dispatch(removeItem(name));
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-items">
      <h2>Your Shopping Cart</h2>
      {cartItems.map(item => (
        <div key={item.name} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="item-details">
            <h3>{item.name}</h3>
            <p>${item.cost}</p>
            <p>Subtotal: ${(item.cost * item.quantity).toFixed(2)}</p>
            <div className="quantity-control">
              <button onClick={() => handleDecrement(item.name, item.quantity)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item.name, item.quantity)}>+</button>
            </div>
            <button onClick={() => handleRemove(item.name)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: ${calculateTotalAmount()}</h3>
        <button onClick={() => window.location.href = "/products"}>Continue Shopping</button>
        <button onClick={() => alert('Functionality to be added for future reference')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


