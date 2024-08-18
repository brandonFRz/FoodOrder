import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Error from "./Error.jsx";
import useHttp from "../hook/useHttp.js";

//Configuración de la solicitud
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data, // Datos de la respuesta del servidor
    isLoading: isSending, // Indica si la solicitud está en curso
    error, // Mensaje de error en caso de fallo
    sendRequest, // Función para enviar la solicitud HTTP
    clearData, // Función para limpiar los datos de la respuesta
  } = useHttp("http://localhost:3000/orders", requestConfig); // Configura el hook useHttp con la URL y la configuración de la solicitud

  //Calcula el total del carrito
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  // Cierra el modal de checkout
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  // Finaliza el proceso de checkout, limpia el carrito y los datos de la solicitud
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  // Maneja el envío del formulario de checkout
  function handleSubmit(event) {
    event.preventDefault();

    // Extrae los datos del formulario y los convierte en un objeto
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    // Envía la solicitud HTTP con los datos del pedido.
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  // Acciones predeterminadas del modal
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Cerrar
      </Button>
      <Button>Enviar Orden</Button>
    </>
  );

  // Cambia las acciones si la solicitud está en curso
  if (isSending) {
    actions = <span>Enviando orden...</span>;
  }

  // Muestra un mensaje de éxito si la solicitud se completó correctamente
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Gracias</h2>
        <p>Su orden se ha enviado exitosamente.</p>
        <p>
          En los próximos minutos nos pondremos en contacto con usted por correo
          electrónico.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  // Renderiza el formulario de checkout
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total: {cartTotal}</p>

        <Input label="Nombre" type="text" id="name" />
        <Input label="E-Mail" type="email" id="email" />
        <Input label="Calle" type="text" id="street" />
        <div className="control-row">
          <Input label="Codigo Postal" type="text" id="postal-code" />
          <Input label="Ciudad" type="text" id="city" />
        </div>

        {error && <Error title="Fallo al mandar la orden" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

