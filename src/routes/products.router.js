import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const router = Router();
const productManager = new ProductManager("/src/products.json");

router.get('/', async (req,res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    if(!limit){
        res.send(products);
    }else{
        const productsLimit = products.filter(product => product.id <= limit);
        res.send(productsLimit);
    }
});

export default router;