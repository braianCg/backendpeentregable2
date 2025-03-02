import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productsFilePath = path.join(__dirname, '../data/products.json');

export const readProducts = () => {
    if (fs.existsSync(productsFilePath)) {
        const data = fs.readFileSync(productsFilePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
};

export const saveProducts = (products) => {
    // Asegúrate de que la carpeta exista antes de escribir el archivo
    const dir = path.dirname(productsFilePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};