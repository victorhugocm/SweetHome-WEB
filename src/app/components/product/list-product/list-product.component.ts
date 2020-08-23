import { HttpResponse } from '@angular/common/http';
import { Product } from './../../../models/product/product';
import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  displayedColumns: string[] = ['descricao', 'preco', 'cor', 'tamanho', 'actions'];
  dataSource;

  constructor(private productService: ProductService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.productService.getAll().subscribe((data: Product[])=>{
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    }) 
  }

  delete(id: any){
    console.log(id);
    this.productService.delete(id).subscribe((res: Product)=>{
      // Implementar lógica de recarregar a página
      // console.log(res);
      // if (true) {
      //   window.location.reload();
      // }
    });
  }

}
