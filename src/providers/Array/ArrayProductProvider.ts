import { Product } from "../../shared/models/Product.model";
import { ProductProvider } from "../../shared/providers/ProductProvider";

const path_images = '../../assets/imgs/Products/'

export class ArrayProductProvider implements ProductProvider {
    public setLevel(level:number): void {
        if (level == undefined) {
                this.Continue();
        }
        else{
            this.level=level;
        }
        
    }
    private level:number;
    constructor()
    {
        this.level=1;
    }
    public nextLevel(): void {
        let maxLevel=this.getQuantityOfProducts()-1;
        (this.level>maxLevel)?this.level==maxLevel:this.level++;      
    }
    public getActualLevel(): number {
        return this.level;
    }
    
    static products: Product[] = [
        Product.createProduct(1, 'ARROZ', path_images+'arroz.jpg',1),
        Product.createProduct(2, 'ATUN', path_images+'atun.jpg',2),
        Product.createProduct(3, 'AZUCAR', path_images+'azucar.jpg',3),
        Product.createProduct(4, 'BANANA', path_images+'banana.jpg',4),
        Product.createProduct(5, 'CARNE', path_images+'carne.jpg',5),
        Product.createProduct(6, 'CAFE', path_images+'cafe.jpg',6),
        Product.createProduct(7, 'ARVEJA', path_images+'arveja.jpg',7),
        Product.createProduct(8, 'BROCOLI', path_images+'brocoli.jpg',8),
        Product.createProduct(9, 'BATATA', path_images+'batata.jpg',9),
        Product.createProduct(10, 'CEBOLLA', path_images+'cebolla.jpg',10),
        Product.createProduct(11, 'CEREAL', path_images+'cereal.jpg',11),
        Product.createProduct(12, 'COCA', path_images+'coca.jpg',12)
    ];
    public getProductOfActualLevel():Product{
        return ArrayProductProvider.products.find((x)=>x.Level==this.level);
    }
    public getQuantityOfProducts(): number {
        return ArrayProductProvider.products.length;
    }
    private Continue()
    {
        return this.level=1;
    }
}
