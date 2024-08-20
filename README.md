# Food Ordering App

Este es un proyecto de aplicación para ordenar comida que permite a los usuarios ver platillos, agregarlos a un carrito y realizar un pedido. La aplicación utiliza React para la interfaz de usuario y Express para el backend.

## Características

- **Visualización de Platillos:** Muestra una lista de platillos disponibles con detalles como nombre, precio y descripción.
- **Carrito de Compras:** Permite a los usuarios agregar y eliminar platillos del carrito. Muestra el total del carrito y ofrece la opción de realizar un pedido.
- **Proceso de Checkout:** Los usuarios pueden ingresar sus datos para completar un pedido. Se valida la información ingresada antes de enviar la orden.
- **Modal para Carrito y Checkout:** Utiliza modales para mostrar el carrito y el proceso de checkout.

## Tecnologías

- **Frontend:**
  - React para la construcción de la interfaz de usuario.
  - CSS para el estilo de los componentes y la animación del carrito.

- **Backend:**
  - Express para manejar las solicitudes del servidor.
  - Archivos JSON para almacenar los datos de platillos y pedidos.

## Instalación

### Frontend

1. Navega a la raiz del proyecto.
2. Instala las dependencias y ejecuta la aplicación
    ```bash
    npm install
    npm run dev
    ```

### Backend

1. Navega al directorio del backend.
2. Instala las dependencias y ejecuta el servidor
    ```bash
    cd backend
    npm install
    npm start
    ```


## Uso

1. Asegúrate de que el servidor backend esté corriendo.
2. Inicia el frontend y abre la aplicación en tu navegador.

## Estructura del Proyecto

- **Frontend:**
  - `src/components/` - Componentes de React como `Header`, `Meals`, `Cart`, `Checkout`, etc.
  - `src/store/` - Contextos de React para el manejo del estado (`CartContext`, `UserProgressContext`).
  - `src/hook/` - Hook personalizado para realizar solicitudes HTTP (`useHttp.js`).

- **Backend:**
  - `app.js` - Configuración del servidor Express y manejo de rutas.
  - `data/` - Archivos JSON para platillos y pedidos.

## Vista Previa
Aquí hay una vista previa de cómo se ve la aplicación:

### Visualización de Platillos
![Food-order](https://github.com/user-attachments/assets/eae6a540-8f18-48ee-925d-a9d5f2e14536)

### Carrito
![Food-order-5](https://github.com/user-attachments/assets/30a80c3c-2975-4f4f-9787-b9835c01f770)

### Checkout Form y error
![Food-order-6](https://github.com/user-attachments/assets/a6dfdd9b-2ba7-4935-9f2a-8eb8c070a56d)

### Mensaje de seguimiento
![Food-order-7](https://github.com/user-attachments/assets/b3d830dd-b9fa-4129-b14c-51a4b2921525)




