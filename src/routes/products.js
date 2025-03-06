import { io } from '../server.js';
import express from 'express';
const router = express.Router();


router.post('/addProduct', (req, res) => {
    const newProduct = req.body;
    const products = readProducts();
    newProduct.id = products.length ? products[products.length - 1].id + 1 : 1; // Generar ID
    products.push(newProduct);
    saveProducts(products);
    io.emit('updateProducts', products);
    res.status(201).json(newProduct);
});


router.delete('/deleteProduct/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const products = readProducts();
    const updatedProducts = products.filter(p => p.id !== productId);
    saveProducts(updatedProducts);
    io.emit('updateProducts', updatedProducts); 
    res.status(200).json({ message: 'Producto eliminado' });
});

export default router;