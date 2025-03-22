import express from 'express';
import Cart from '../models/cart.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json({ status: 'success', payload: carts });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;