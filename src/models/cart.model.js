// filepath: c:\Users\thela\OneDrive\Escritorio\Javaback\backendpeentregable2\src\models\cart.model.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;