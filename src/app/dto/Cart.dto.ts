import { Product } from "./Product.dto";

export interface Cart {
    id : string;
    products : ProductCard[];
    total : number;
}

interface ProductCard {
    product : Product
    quantity : number
}