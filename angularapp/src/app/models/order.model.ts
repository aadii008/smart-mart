import { Product } from "./product.model";
import { User } from "./user.model";




export interface Order {

    orderId?:number;
    user:User;
    product:Product[];
    shippingAddress:string;
    totalAmount:number;
    quantity:number;
    status:string;
    createdAt:Date;
    updatedAt:Date;
}
