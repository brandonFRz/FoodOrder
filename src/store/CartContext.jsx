import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [], //Lista de productos en el carrito
  addItem: (item) => {}, //función placeholder para agregar un producto
  removeItem: (id) => {},//función placeholder para agregar un producto
  clearCart: () => {},//función placeholder para limpiar el carrito
});

//Gestiona las acciones sobre el carro de compras.
function cartReducer(state, action) {

  //Acción de agregar item.
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updateItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = updateItems[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updateItems[existingCartItemIndex] = updatedItem;
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updateItems };
  }

  //Acción para remover un item.
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const updatedItems = [...state.items];
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  //Limpiar el carrito.
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

//Proveedor del contexto CartContext
export function CartContextProvider({ children }) {
  //Hook useReducer para manejar los estados del carrito usando cartReducer
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  //Funciones que disparan sus respectivas acciones.
  function addItem(item) {
    dispatch({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatch({ type: "REMOVE_ITEM", id });
  }

  function clearCart(){
    dispatch({type:'CLEAR_CART'})
  }

  //Objeto del contexto que proporciona el estado actual  las funciones para modificarlo
  const cartContext = {
    items: state.items,
    addItem,
    removeItem,
    clearCart,
  };

  // Renderiza el proveedor del contexto envolviendo los hijos
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
