import { Component, OnInit, Output } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../dto/Cart.dto';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DataViewModule, ButtonModule, InputTextModule,RouterOutlet, RouterLink, RouterLinkActive, CommonModule, TagModule, CardModule, InputTextModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, DividerModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  updateCartSubscription : Subscription;
  currentUserSubscription : Subscription;

  @Output() onEditQuantityOfProduct = new EventEmitter<any>();
  @Output() onDeleteProduct = new EventEmitter<any>();
  @Output() onHide = new EventEmitter<any>();

  layout : "list" | "grid" = 'list';
  environment = environment;
  currentUser$ : any = {};

  cart! : Cart

  constructor(
    private authService : AuthService,
    private cartService : CartService,
  ) {
    this.currentUserSubscription = authService.currentUser$.subscribe( value => {
      this.currentUser$ = value;
    })
    this.updateCartSubscription = cartService.updateCart$.subscribe( value => {
      if (this.currentUser$.cart_id) {        
        this.getCart(this.currentUser$.cart_id);
      }      
    })
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe( value => this.currentUser$ = value );   
    if (this.currentUser$.cart_id) {
      this.getCart(this.currentUser$.cart_id);
    } 
  }

  getCart( cid : any ) {
    this.authService.getUser().subscribe( response => {
      this.cartService.getById(response.payload.cart_id).subscribe( response => {
        this.cart = response.payload;
      })
    });
  }

  addProduct( i : any ) : void {
    this.cart.products[i].quantity = this.cart.products[i].quantity + 1; 
    this.onEditQuantityOfProduct.emit(this.cart.products[i]);  
  }

  subtractProduct( i : any ) : void {
    this.cart.products[i].quantity = this.cart.products[i].quantity - 1;    
    this.onEditQuantityOfProduct.emit(this.cart.products[i]);    
  }

  deleteProduct( i : any ) : void {
    this.onDeleteProduct.emit(this.cart.products[i]);
  }

  buy() {
    this.onHide.emit(this.cart);
  }

}
