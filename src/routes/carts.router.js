import { Router } from 'express';
import CartManager from '../CartManager.js';

const router = Router();
const cartManager = new CartManager("/src/carts.json");

router.get('/', async (req,res) => {
    const limit = req.query.limit;
    const carts = await cartManager.getCarts();
    if(!limit){
        res.send(carts);
    }else{
        const cartsLimit = carts.filter(cart => cart.id <= limit);
        res.send(cartsLimit);
    }
});


export default router;