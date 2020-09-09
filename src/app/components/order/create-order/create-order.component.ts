import { ProductOrderService } from 'src/app/services/product-order/product-order.service';
import { OrderService } from 'src/app/services/order/order.service';
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
import { Order } from 'src/app/models/order/order';
import { Router } from '@angular/router';

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
    valorvenda: new FormControl()
  });

  //Array de vendedores
  sellers: Seller[] = [];

  //Tabela produtos disponíveis
  displayedColumnsAvaiableProducts: string[] = ['descricao', 'preco', 'cor', 'tamanho', 'actions'];
  avaiableProductsSource;

  //Tabela de produtos adicionados
  displayedColumnsAddedProducts: string[] = ['descricao', 'preco', 'cor', 'tamanho', 'quantidade', 'actions'];
  addedProductsSource;

  //Array de produtos adicionados
  addedProducts: ProductOrder[] = [];

  //Paginador Tabela produtos disponíveis
  @ViewChild(MatPaginator, { static: true }) paginatorAvaiableProducts: MatPaginator;

  //Fim variáveis de controle

  constructor(
    private router: Router,
    private orderService: OrderService,
    private productOrderService: ProductOrderService,
    private sellerService: SellerService,
    private productService: ProductService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //Carrega lista de seleção de vendedores
    this.loadSellers();

    //Carrega tabela de produtos disponíveis
    this.loadAvaiableProducts();

    // this.resetClosedOrder();
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  //Carrega Vendedores
  loadSellers() {
    this.sellerService.getAll().subscribe((data: Seller[]) => {
      this.sellers = data;
    });
  }

  //Carrega Produtos Disponíveis
  loadAvaiableProducts() {
    this.productService.getAll().subscribe((data: Product[]) => {
      this.avaiableProductsSource = new MatTableDataSource<any>(data);
      this.avaiableProductsSource.paginator = this.paginatorAvaiableProducts;
    });
  }

  //Carrega/Recarrega a tabela de Produtos Adicionados
  loadAddedProducts() {
    this.addedProductsSource = new MatTableDataSource<any>(this.addedProducts);
  }

  //Adiciona um produto à tabela de Produtos Adicionados
  addProductToOrder(id: any) {
    let productExists = this.addedProducts.some(x => x.produtoId == id);
    if (productExists) {
      this.openSnackBar('Este produto já foi adicionado ao pedido!', 'Atenção');
    }
    else {
      this.productService.getById(id).subscribe(p => {
        let addedProduct: any = {
          produtoId: p.id,
          quantidade: 1,
          precoProduto: p.preco,
          produto: p,
          vendaId: 0
        };
        this.addedProducts.push(addedProduct);
        this.orderForm.controls['valorvenda'].setValue(this.orderForm.controls['valorvenda'].value + p.preco.valueOf());
        this.loadAddedProducts();
        this.openSnackBar('Produto adicionado ao pedido com sucesso!', 'Sucesso');
      });
    }
  }

  //Remove um Produto Adicionado
  removeProductFromOrder(id: any) {
    let index = this.addedProducts.findIndex(x => x.produtoId == id);
    this.orderForm.controls['valorvenda'].setValue(this.orderForm.controls['valorvenda'].value - (this.addedProducts[index].precoProduto.valueOf() * this.addedProducts[index].quantidade));
    this.addedProducts.splice(index, 1);
    this.loadAddedProducts();
    this.openSnackBar('Produto removido do pedido com sucesso!', 'Sucesso');
  }

  //Atualiza a quantidade de um Produto Adicionado
  updateProductQuantity(event: any, id: any) {
    if (event.target.value == 0) {
      this.openSnackBar('A quantidade não pode ser zero!', 'Falha');
    }
    else {
      let index = this.addedProducts.findIndex(x => x.produtoId == id);
      this.orderForm.controls['valorvenda'].setValue(this.orderForm.controls['valorvenda'].value - (this.addedProducts[index].precoProduto.valueOf() * this.addedProducts[index].quantidade));
      this.orderForm.controls['valorvenda'].setValue(this.orderForm.controls['valorvenda'].value + (this.addedProducts[index].precoProduto.valueOf() * event.target.value));
      this.addedProducts[index].quantidade = parseInt(event.target.value);
      this.openSnackBar('Quantidade atualizada com sucesso!', 'Sucesso');
    }
  }

  //Realiza o POST de "Venda"
  saveOrder() {
    let order: any = {
      vendedorId: this.orderForm.controls['vendedorid'].value,
      valorVenda: this.orderForm.controls['valorvenda'].value,
      dataVenda: new Date(Date.now())
    };
    this.orderService.create(order).subscribe((data: Order) => {

      if (data.id < 1) {
        this.openSnackBar('Não foi possível salvar a capa do pedido!', 'Atenção');
      } else {
        let productOrderSavedSuccessful: boolean[] = [];
        this.addedProducts.forEach(addedProduct => {
          this.saveProductOrder(addedProduct, data.id, productOrderSavedSuccessful);
        });
        if (productOrderSavedSuccessful.every(x => x === true)) {
          let snackBarRef = this.openSnackBar('Venda salva com sucesso!', 'Sucesso');
          snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigateByUrl('/list-order');
          });
        }
        else {
          this.openSnackBar('Não foi possível salvar o(s) produto(s) do pedido!', 'Atenção');
        }
      }
    });
  }

  //Realiza o POST dos produtos do Pedido
  saveProductOrder(productOrder: ProductOrder, orderId: number, productOrderSavedSuccessful: boolean[]) {
    let _productOrder: any = {
      vendaId: orderId,
      produtoId: productOrder.produtoId,
      quantidade: productOrder.quantidade,
      precoProduto: productOrder.precoProduto
    };
    this.productOrderService.create(_productOrder).subscribe((res: ProductOrder) => {
      if (res.id > 0)
        productOrderSavedSuccessful.push(true);
      else
        productOrderSavedSuccessful.push(false);
    });
  }

  //Método disparado pelo botão "Salvar"
  onSubmit() {
    if (this.orderForm.controls['vendedorid'].value < 1)
      this.openSnackBar('Selecione um vendedor!', 'Atenção');
    else if (this.addedProducts.length < 1)
      this.openSnackBar('Adicione pelo menos um produto!', 'Atenção');
    else {
      this.saveOrder();
    }
  }
}