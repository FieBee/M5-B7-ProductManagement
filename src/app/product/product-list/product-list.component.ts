import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product: Product ={}
  products: Product[] = [];
  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
  });



  constructor(private  productService: ProductService ) {}

  ngOnInit(): void {
    this.getAll();
    console.log(this.getAll());
  }

  getAll(){
    this.products  =  this.productService.getAll()
  }

  currenIndex:any = null;


  create() {
    if (this.currenIndex== null){
      this.products.push(this.productForm.value)
    }else {
      this.products.splice(this.currenIndex,1,this.product);
    }

  }

  cancel() {
    this.productForm.reset()
    this.currenIndex = null;
  }

  delete(i: number) {
    this.productService.delete(i)
  }

  edit(i: number) {
    this.currenIndex = i
    this.product = {...this.products[i]}

  }
}
