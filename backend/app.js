import fs from 'node:fs/promises'; // Importamos el módulo fs para manejar archivos de manera asíncrona
import bodyParser from 'body-parser'; // Importamos body-parser para analizar cuerpos de solicitudes JSON
import express from 'express';// Importamos express para crear la aplicación del servidor

const app = express();

//// Middleware para analizar cuerpos de solicitudes JSON y servir archivos estáticos desde la carpeta public.
app.use(bodyParser.json());
app.use(express.static('public'));

// Middleware para configurar los encabezados CORS (Cross-Origin Resource Sharing).
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Ruta GET para obtener la lista de comidas.
app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

// Ruta POST para crear un nuevo pedido.
app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  // Validar datos del pedido.
  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Faltan datos.' });
  }

  //Validar los datos del cliente.
  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Faltan datos: Falta el correo electrónico, el nombre, la calle, el código postal o la ciudad.',
    });
  }

  //Crea un nuevo pedido con una id unica
  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  //Leer el archivo JSON que contiente todos los pedidos.
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);//Convierte el contenido del archivo a un objeto JavaScript.
  allOrders.push(newOrder);//Agrega el nuevo pedido a la lista de pedidos
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders))
  res.status(201).json({ message: 'Orden Creada!' });
});

// Middleware para manejar solicitudes no encontradas
app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

//// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000'); 
});
