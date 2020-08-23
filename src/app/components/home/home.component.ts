import { OrderService } from './../../services/order/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/order/order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'data', 'valor', 'nome', 'comissao'];
  dataSource;

  constructor(private orderService: OrderService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.orderService.getAll().subscribe((data: Order[]) => {
      this.dataSource = new MatTableDataSource<any>(
        data.filter(x => x.dataVenda.getDate() == new Date().getDate())
      );
      this.dataSource.paginator = this.paginator;
    });
  }

}
