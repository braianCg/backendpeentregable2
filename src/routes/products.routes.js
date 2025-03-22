import express from 'express';
import Product from '../models/products.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const queryOptions = {};

    if (query) {
        queryOptions.$or = [
            { category: new RegExp(query, 'i') },
            { title: new RegExp(query, 'i') },
        ];
    }

    try {
        const totalProducts = await Product.countDocuments(queryOptions);
        const totalPages = Math.ceil(totalProducts / limit);
        const products = await Product.find(queryOptions)
            .limit(parseInt(limit))
            .skip((page - 1) * limit)
            .sort(sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {});

        res.json({
            status: 'success',
            payload: products,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page: parseInt(page),
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}` : null,
            nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${page + 1}` : null,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Eliminar un producto
router.delete('/:pid', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.pid);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
        res.json({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;