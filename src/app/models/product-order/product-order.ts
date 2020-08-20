import { Product } from '../product/product';
import { Order } from '../order/order';

export interface ProductOrder {
    id: number;
    vendaId: number;
    produtoId: number;
    quantidade: number;
    precoProduto: number;
    produto: Product;
    venda: Order;
}