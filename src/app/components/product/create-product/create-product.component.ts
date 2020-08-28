import { ProductService } from 'src/app/services/product/product.service';
import { ColorService } from 'src/app/services/color/color.service';
import { SizeService } from 'src/app/services/size/size.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private productService: ProductService, private sizeService: SizeService, private colorService: ColorService) { }

  ngOnInit(): void {
    this.loadSize();
    this.loadColor();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.productForm.value);
    this.productService.create(this.productForm.value).subscribe((res: Product) => {
      // Implementar lógica de recarregar a página
      // console.log(res);
      // if (true) {
      //   window.location.reload();
      // }
    });

  }

  loadSize() {
    this.sizeService.getAll().subscribe((data: Size[]) => {
      this.sizes = data;
      console.log(this.sizes);
    })
  }

  loadColor() {
    this.colorService.getAll().subscribe((data: Color[]) => {
      this.colors = data;
      console.log(this.colors);
    })
  }
}
