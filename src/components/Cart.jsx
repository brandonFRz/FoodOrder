import React, { useContext} from "react";

import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);//Obtienes acceso al contenido del carrito.
  const userProgressCtx = useContext(UserProgressContext);//Obtienes acceso al contenido del progreso del usuario.

  //Calcula el precio total del carrito sumando el precio de todos los artículos
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => (totalPrice += item.price * item.quantity),
    0
  
  );  
  
  //Cierra el carrito llamando a la función hideCart
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  //Cambia la vista al proceso de pago llamando a la función showChecout
  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    //Muestra o cierra el modal según el progreso del usuario.
    <Modal
      className="cart"
      open={userProgressCtx.progress === 'cart'}
      onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
    >
      {/* Renderiza cada articulo del carrito */}
      <h2>Tu carrito</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            OnIncrease={() => cartCtx.addItem(item)} // Aumenta la cantidad del artículo
            onDecrease={() => cartCtx.removeItem(item.id)}// Disminuye la cantidad del artículo
          />
        ))}
      </ul>
      {/* Muestra el precio total del carrito */}
      <p className="cart-total">${cartTotal}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Cerrar
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Checkout</Button> //Solo muestra el checkout si hay artículos en el carro
        )}
      </p>
    </Modal>
  );
}
