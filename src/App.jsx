import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

// Todos los componentes están envueltos por los proveedores de contexto para que puedan acceder al estado global gestionado por los respectivos contextos.

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart/>
        <Checkout/>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
