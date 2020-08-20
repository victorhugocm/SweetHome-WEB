import { Color } from '../color/color';
import { Size } from '../size/size';

export interface Product {
    id: number;
    descricao: string;
    preco: number;
    tamanhoId: number;
    corId: number;
    cor: Color;
    tamanho: Size;
}