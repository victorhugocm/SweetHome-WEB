import { Product } from './../../../models/product/product';
import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  displayedColumns: string[] = ['descricao', 'preco', 'cor', 'tamanho'];
  dataSource;

  constructor(private productService: ProductService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.productService.getAll().subscribe((data: Product[])=>{
      console.log(data);
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    }) 
  }

}
