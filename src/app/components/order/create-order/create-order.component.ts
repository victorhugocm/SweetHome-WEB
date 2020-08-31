import { ProductOrder } from 'src/app/models/product-order/product-order';
import { ProductService } from 'src/app/services/product/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SellerService } from 'src/app/services/seller/seller.service'
import { Seller } from 'src/app/models/seller/seller';
import { Product } from 'src/app/models/product/product';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  //Início variáveis de controle

  //Formulário da venda
  orderForm = new FormGroup({
    vendedorid: new FormControl(),
    datavenda: new FormControl(),
    valorvenda: new FormControl()
  });

  //Array de vendedores
  sellers: Seller[] = [];

  //Tabela de produtos adicionados
  displayedColumnsAddedProducts: string[] = ['descricao', 'preco', 'cor', 'tamanho', 'quantidade', 'actions'];
  addedProducts: ProductOrder[] = [];
  addedProductsSource;

  //Produto adicionado
  addedProduct: ProductOrder;

  //Tabela produtos disponíveis
  displayedColumnsAvaiableProducts: string[] = ['descricao', 'preco', 'cor', 'tamanho', 'actions'];
  avaiableProductsSource;

  //Paginador Tabela produtos disponíveis
  @ViewChild(MatPaginator, { static: true }) paginatorAvaiableProducts: MatPaginator;

  //Fim variáveis de controle

  constructor(
    private sellerService: SellerService,
    private productService: ProductService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadSellers();
    this.loadAvaiableProducts();
    this.resetAddedProduct();
  }

  onSubmit() {

  }

  loadSellers() {
    this.sellerService.getAll().subscribe((data: Seller[]) => {
      this.sellers = data;
    });
  }

  loadAvaiableProducts() {
    this.productService.getAll().subscribe((data: Product[]) => {
      this.avaiableProductsSource = new MatTableDataSource<any>(data);
      this.avaiableProductsSource.paginator = this.paginatorAvaiableProducts;
    });
  }

  loadAddedProducts() {
    this.addedProductsSource = new MatTableDataSource<any>(this.addedProducts);
  }

  addProductToOrder(id: any) {
    let productExists = this.addedProducts.some(x => x.produtoId == id);
    if (productExists) {
      this.openSnackBar('Este produto já foi adicionado ao pedido!', 'Atenção');
    }
    else {
      this.productService.getById(id).subscribe(p => {
        this.addedProduct.produtoId = p.id;
        this.addedProduct.precoProduto = p.preco;
        this.addedProduct.quantidade = 1;
        this.addedProduct.produto = p;
        this.addedProducts.push(this.addedProduct);
        this.resetAddedProduct();
        this.loadAddedProducts();
        this.openSnackBar('Produto adicionado ao pedido com sucesso!', 'Sucesso');
      });
    }
  }

  removeProductFromOrder(id: any) {
    let index = this.addedProducts.findIndex(x => x.produtoId == id);
    this.addedProducts.splice(index, 1);
    this.loadAddedProducts();
    this.openSnackBar('Produto removido do pedido com sucesso!', 'Sucesso');
  }

  resetAddedProduct() {
    this.addedProduct = {
      id: 0,
      vendaId: 0,
      produtoId: 0,
      quantidade: 0,
      precoProduto: 0,
      produto: {
        id: 0,
        descricao: '',
        preco: 0,
        tamanhoId: 0,
        corId: 0,
        cor: {
          id: 0,
          descricao: ''
        },
        tamanho: {
          id: 0,
          descricao: ''
        }
      },
      venda: {
        id: 0,
        vendedorId: 0,
        valorVenda: 0,
        dataVenda: null,
        vendedor: {
          id: 0,
          nome: '',
          comissao: 0
        }
      }
    }
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
