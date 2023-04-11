import fs from 'fs';

export default class ProductManager{

    constructor(path){
        this.path = path;
    }

    addProduct = async (product) => {

        const products = await this.getProducts();

        if(products.length === 0){
            product.id = 1;
        }else{
            product.id = products[products.length-1].id+1;
        }

        products.push(product);

        await fs.promises.writeFile(`./${this.path}`, JSON.stringify(products, null, '\t'));

        return product;

    }

    getProducts = async() => {   
        if(fs.existsSync(`./${this.path}`)){
            const data = await fs.promises.readFile(`./${this.path}`, 'utf-8');
            const products = JSON.parse(data);
            return products;
        }else{
            return [];
        }
    }

    getProductById = async(aId) => {
        if(fs.existsSync(`./${this.path}`)){
            const data = await fs.promises.readFile(`./${this.path}`, 'utf-8');
            const products = JSON.parse(data);
            let productMatched = products.find(product => product.id == aId);

            if(productMatched == undefined){
                return 'ID not found'
            }else{
                return productMatched;
            }
        }else{
            return 'The file is empty';
        }
    }

    updateProduct = async (aId, product) => {

        const products = await this.getProducts();

        if(products.length === 0){
            return 'Empty file: Can not update a product'
        }else{
            let productById = await productManager.getProductById(aId);
            if(productById == 'ID not found'){
                return 'ID not found';
            }else{
                product.id = productById.id;
                products[productById.id-1] = product;
                await fs.promises.writeFile(`./${this.path}`, JSON.stringify(products, null, '\t'));
                return product;
            }
                
        }

    }

    deleteProductById = async(aId) => {
        if(fs.existsSync(`./${this.path}`)){
            const data = await fs.promises.readFile(`./${this.path}`, 'utf-8');
            const products = JSON.parse(data);
            let productMatched = products.find(product => product.id == aId);

            if(productMatched == undefined){
                return 'ID not found'
            }else{
                let newArrayProducts = products.filter(product => product.id !== aId);
                await fs.promises.writeFile(`./${this.path}`, JSON.stringify(newArrayProducts, null, '\t'));
                return newArrayProducts;
            }
        }else{
            return 'The file is empty';
        }
    }

}
