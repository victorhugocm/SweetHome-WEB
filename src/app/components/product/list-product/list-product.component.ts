import { HttpResponse } from '@angular/common/http';
import { Product } from './../../../models/product/product';
import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  displayedColumns: string[] = ['descricao', 'preco', 'cor', 'tamanho', 'actions'];
  dataSource;

  constructor(private productService: ProductService, private snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe((data: Product[]) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  delete(id: any) {
    this.productService.delete(id).subscribe((res: Product) => {
      if (id == res.id) {
        let snackBarRef = this.openSnackBar('Produto excluído!', 'Sucesso');
        snackBarRef.afterDismissed().subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}