import fs from 'fs';

export default class CartManager{

    constructor(path){
        this.path = path;
    }

    getCarts = async() => {   
        if(fs.existsSync(`./${this.path}`)){
            const data = await fs.promises.readFile(`./${this.path}`, 'utf-8');
            const carts = JSON.parse(data);
            return carts;
        }else{
            return [];
        }
    }

    getCartById = async(aId) => {
        if(fs.existsSync(`./${this.path}`)){
            const data = await fs.promises.readFile(`./${this.path}`, 'utf-8');
            const carts = JSON.parse(data);
            let cartMatched = carts.find(cart => cart.id == aId);

            if(cartMatched == undefined){
                return -1
            }else{
                return cartMatched;
            }
        }else{
            return -1;
        }
    }

    addCart = async () => {
        const carts = await this.getCarts();
        const cart = {
            products: []
        };

        if(carts.length === 0){
            cart.id = 1;
        }else{
            cart.id = carts[carts.length-1].id+1;
        }

        carts.push(cart);
    
        await fs.promises.writeFile(`./${this.path}`, JSON.stringify(carts, null, '\t'));
    
        return cart;
    }

}
