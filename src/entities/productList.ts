import { Entity, Column, PrimaryColumn } from "typeorm";
import { Product } from "./product";

@Entity("product_list")
export class ProductList {

    @PrimaryColumn()
    id:number;

    @Column({name: "product_id"})
    product_id: number;

    @Column({name: "list_id"})
    list_id: number;

    product: Product;
}