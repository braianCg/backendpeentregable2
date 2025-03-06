import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/cart.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readProducts, saveProducts } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;


const httpServer = createServer(app);
const io = new Server(httpServer);


export { io };

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});


io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.emit('updateProducts', readProducts());

    socket.on('addProduct', (newProduct) => {
        const products = readProducts();
        products.push(newProduct);
        saveProducts(products);
        io.emit('updateProducts', products);
    });

    socket.on('deleteProduct', (productId) => {
        const products = readProducts();
        const updatedProducts = products.filter(p => p.id !== productId);
        saveProducts(updatedProducts);
        io.emit('updateProducts', updatedProducts); 
    });
});

// Iniciar el servidor
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});