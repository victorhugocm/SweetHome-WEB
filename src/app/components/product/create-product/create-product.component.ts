import { ProductService } from 'src/app/services/product/product.service';
import { ColorService } from 'src/app/services/color/color.service';
import { SizeService } from 'src/app/services/size/size.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Size } from 'src/app/models/size/size';
import { Color } from 'src/app/models/color/color';
import { Product } from 'src/app/models/product/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm = new FormGroup({
    descricao: new FormControl(),
    preco: new FormControl(),
    tamanhoid: new FormControl(),
    corid: new FormControl()
  });

  sizes: Size[] = [];
  colors: Color[] = [];

  constructor(
    private productService: ProductService,
    private sizeService: SizeService,
    private colorService: ColorService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadSizes();
    this.loadColors();
  }

  onSubmit() {
    this.productService.create(this.productForm.value).subscribe((res: Product) => {
      if (res.id > 0) {
        let snackBarRef = this.openSnackBar('Produto criado com sucesso!', 'Sucesso');
        snackBarRef.afterDismissed().subscribe(() => {
          this.cleanForm();
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

  openSnackBar(message: string, action: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  cleanForm() {
    this.productForm.reset();
  }
}
