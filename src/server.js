import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/cart.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readProducts, saveProducts } from './utils.js'; // Importar las funciones

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

// Crear un servidor HTTP y un servidor de Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer);

// Exportar io para que pueda ser utilizado en otros módulos
export { io };

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Rutas para las vistas
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Manejar eventos de WebSocket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Enviar la lista de productos al cliente al conectarse
    socket.emit('updateProducts', readProducts());

    // Escuchar eventos de agregar y eliminar productos
    socket.on('addProduct', (newProduct) => {
        const products = readProducts();
        products.push(newProduct);
        saveProducts(products);
        io.emit('updateProducts', products); // Notificar a todos los clientes
    });

    socket.on('deleteProduct', (productId) => {
        const products = readProducts();
        const updatedProducts = products.filter(p => p.id !== productId);
        saveProducts(updatedProducts);
        io.emit('updateProducts', updatedProducts); // Notificar a todos los clientes
    });
});

// Iniciar el servidor
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});