import { createContext, useState } from 'react';

const UserProgressContext = createContext({
  progress: '', // Representa el estado actual del usuario ('cart', 'checkout', o vacío)
  showCart: () => {}, //Función placeholder para mostrar el carrito
  hideCart: () => {},//Función placeholder para ocultar el carrito
  showCheckout: () => {},// Función placeholder para mostrar el checkout
  hideCheckout: () => {},// Función placeholder para ocultar el carrito
});


export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState('');

  //Función para establecer el progreso en 'cart' cuando se muestre
  function showCart() {
    setUserProgress('cart');
  }
  //Función para limpiar el progreso del carrito
  function hideCart() {
    setUserProgress('');
  }

  //Función para establecer el progreso en 'checkout' cuando se muestre
  function showCheckout() {
    setUserProgress('checkout');
  }

  //Función para limpiar el progreso del checkout
  function hideCheckout() {
    setUserProgress('');
  }

  //Objeto de contexto que proporciona el estado actual y las funciones para modificarlo
  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  //Renderiza el proveedor del contexto envolviendo los hijos
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;