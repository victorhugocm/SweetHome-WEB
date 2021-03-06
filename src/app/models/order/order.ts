import { Seller } from '../seller/seller';

export interface Order {
    id: number;
    vendedorId: number;
    valorVenda: number;
    dataVenda: Date;
    vendedor: Seller;
}