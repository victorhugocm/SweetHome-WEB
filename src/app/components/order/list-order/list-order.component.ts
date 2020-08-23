import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/models/order/order';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'data', 'valor', 'nome', 'comissao'];
  dataSource;

  constructor(private orderService: OrderService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.orderService.getAll().subscribe((data: Order[]) => {
      this.dataSource = new MatTableDataSource<any>(
        data.sort((a, b) => new Date(b.dataVenda).getTime() - new Date(a.dataVenda).getTime())
      );
      this.dataSource.paginator = this.paginator;
    });
  }

}
