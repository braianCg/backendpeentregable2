import { io } from '../server.js'; // Asegúrate de que el server.js exporte io
import express from 'express';
const router = express.Router();

// En el endpoint POST para agregar un producto  
router.post('/addProduct', (req, res) => {
    const newProduct = req.body;
    const products = readProducts();
    newProduct.id = products.length ? products[products.length - 1].id + 1 : 1; // Generar ID
    products.push(newProduct);
    saveProducts(products);
    io.emit('updateProducts', products); // Emitir el evento para actualizar productos
    res.status(201).json(newProduct);
});

// En el endpoint DELETE para eliminar un producto  
router.delete('/deleteProduct/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const products = readProducts();
    const updatedProducts = products.filter(p => p.id !== productId);
    saveProducts(updatedProducts);
    io.emit('updateProducts', updatedProducts); // Emitir el evento para actualizar productos
    res.status(200).json({ message: 'Producto eliminado' });
});

export default router;