import express from 'express';
import fs from 'fs';
const router = express.Router();
const cartsFilePath = './data/carts.json';

const readCarts = () => {
    if (fs.existsSync(cartsFilePath)) {
        const data = fs.readFileSync(cartsFilePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
};

const saveCarts = (carts) => {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
};

router.post('/', (req, res) => {
    const carts = readCarts();
    const newCart = {
        id: carts.length ? carts[carts.length - 1].id + 1 : 1,
        products: []
    };

    carts.push(newCart);
    saveCarts(carts);
    
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ message: "Carrito no encontrado" });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const productId = parseInt(req.params.pid);
    const productInCart = cart.products.find(p => p.product === productId);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.products.push({ product: productId, quantity: 1 });
    }
    
    saveCarts(carts);
    res.json(cart.products);
});

export default router;