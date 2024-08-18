import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);
  const [bump, setBump] = useState(false)

  // Calcular el total de items en el carrito
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);


  // Manejar la animación bump cuando el carrito cambia
  const btnClasses = `${bump ? "bump" : ""}`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    };

    setBump(true);

    const timer = setTimeout(() => {
      setBump(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  //Renderiza el botón con las comidas que  se han agregado al carrito
  return (
    <main id="main-header">
      <div id="title">
        <img src={logo} alt="Plato con comida" />
        <h1>Comidas</h1>
      </div>
      <Button onClick={userProgressCtx.showCart} textOnly className={btnClasses}>
        Carrito ({totalCartItems})
      </Button>
    </main>
  );
}
