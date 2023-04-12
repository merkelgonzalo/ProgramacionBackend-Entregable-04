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

}
