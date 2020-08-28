import { ProductOrderService } from 'src/app/services/product-order/product-order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductOrder } from 'src/app/models/product-order/product-order';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {

  displayedColumns: string[] = ['descricao', 'cor', 'tamanho', 'preco', 'quantidade'];
  dataSource;

  constructor(private route: ActivatedRoute, private productOrderService: ProductOrderService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.productOrderService.getAll().subscribe((data: ProductOrder[]) => {
        this.dataSource = new MatTableDataSource<any>(
          data.filter(x => x.vendaId == p['id'])
        );
      });
    });
  }
}