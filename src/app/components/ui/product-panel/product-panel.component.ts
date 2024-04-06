import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from '../../../dto/Product.dto';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { environment } from '../../../../environments/environment.development';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product-panel',
  standalone: true,
  imports: [DataViewModule, ButtonModule, InputTextModule, CommonModule, TagModule],
  templateUrl: './product-panel.component.html',
  styleUrl: './product-panel.component.scss'
})
export class ProductPanelComponent implements OnInit{

  @Output() addProduct = new EventEmitter<any>();

  @Input() products : Product[] = [];
  layout : "list" | "grid" = 'grid';
  environment = environment;  

  constructor () {}

  ngOnInit(): void {
  }

  getStatus(product: Product) {  
    if (product.stock === 0) {
      return 'OUT OF STOCK'
    }
    if (product.stock >= 10) {
      return 'IN STOCK';
    } else {
      return 'LOW STOCK';
    }
  };

  getSeverity(product: Product) {
    if (product.stock === 0) {
      return 'danger'
    }
    if (product.stock >= 10) {
      return 'success';
    } else {
      return 'warning';
    }
  };

  onAddProduct( product : Product ) : void {
    this.addProduct.emit(product.id);
  }

}
