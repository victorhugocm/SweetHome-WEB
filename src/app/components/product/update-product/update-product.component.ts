import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { SizeService } from 'src/app/services/size/size.service';
import { ColorService } from 'src/app/services/color/color.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Size } from 'src/app/models/size/size';
import { Color } from 'src/app/models/color/color';
import { Product } from 'src/app/models/product/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})

export class UpdateProductComponent implements OnInit {
  productForm = new FormGroup({
    id: new FormControl(),
    descricao: new FormControl(),
    preco: new FormControl(),
    tamanhoid: new FormControl(),
    corid: new FormControl()
  });
  sizes: Size[] = [];
  colors: Color[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private sizeService: SizeService,
    private colorService: ColorService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadSizes();
    this.loadColors();
    this.route.queryParams.subscribe(p => {
      this.loadProduct(p['id']);
    });
  }

  onSubmit() {
    this.productService.update(this.productForm.value).subscribe((res: Product) => {
      if (true) {
        let snackBarRef = this.openSnackBar('Produto atualizado com sucesso!', 'Sucesso');
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigateByUrl('/list-product');
        });
      }
    });
  }

  loadSizes() {
    this.sizeService.getAll().subscribe((data: Size[]) => {
      this.sizes = data;
    })
  }

  loadColors() {
    this.colorService.getAll().subscribe((data: Color[]) => {
      this.colors = data;
    })
  }

  loadProduct(id: any) {
    this.productService.getById(id).subscribe((data: Product) => {
      this.productForm = new FormGroup({
        id: new FormControl(data.id),
        descricao: new FormControl(data.descricao),
        preco: new FormControl(data.preco),
        tamanhoid: new FormControl(data.tamanhoId),
        corid: new FormControl(data.corId)
      });
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
