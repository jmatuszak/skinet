import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  types: Type[] =[];
  brands: Brand[] = [];
  brandIdSelected = 0;
  typeIdSelected = 0;



constructor(private shopService: ShopService){}

  ngOnInit(): void {
    this.getBrands();
    this.getProducts();
    this.getTypes();
  }


  getProducts(){
    this.shopService.getProducts(this.brandIdSelected,this.typeIdSelected).subscribe({
      next: (response: any) => this.products = response.data,
      error: error => console.log(error)
    })
  }
  getBrands(){
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{id:0, name:'All'}, ...response],
      error: error => console.log(error)
    })
  }
  getTypes(){
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{id:0, name:'All'}, ...response],
      error: error => console.log(error)
    })
  }
  onBrandSelected(brandId: number){
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.typeIdSelected = typeId;
    this.getProducts();
  }
}
