import fs from 'fs';
import path from 'path';

const productsFilePath = path.resolve('src/data/products.json');

export const readProducts = () => {
    try {
        const data = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo el archivo de productos:', error);
        return [];
    }
};

export const saveProducts = (products) => {
    try {
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error guardando el archivo de productos:', error);
    }
};