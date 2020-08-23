import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/order/order';
import { OrderService } from 'src/app/services/order/order.service';

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
        data
          .filter(x => new Date(x.dataVenda).toLocaleDateString() == new Date().toLocaleDateString())
          .sort((a, b) => new Date(b.dataVenda).getTime() - new Date(a.dataVenda).getTime())
      );
      this.dataSource.paginator = this.paginator;
    });
  }

}
