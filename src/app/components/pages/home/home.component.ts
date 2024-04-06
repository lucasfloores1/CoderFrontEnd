import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../dto/Product.dto';
import { CartService } from '../../../services/cart.service';
import { User } from '../../../dto/User.dto';
import { ProductPanelComponent } from '../../ui/product-panel/product-panel.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductPanelComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  currentUserSubscription : Subscription;
  isLoggedInSubscription : Subscription;

  isLoggedIn$ : boolean = false;
  currentUser$ : any = {};
  products! : Product[]
  user! : User

  constructor (
    private authService : AuthService,
    private productService : ProductService,
    private cartService : CartService,
    private toast : ToastService
  ){
    this.currentUserSubscription = authService.currentUser$.subscribe( value => {
      this.currentUser$ = value;
    })
    this.isLoggedInSubscription = authService.isLoggedIn$.subscribe( value => {
      this.isLoggedIn$ = value;
    })
  }

  ngOnInit(): void {
    
    this.authService.currentUser$.subscribe( value => this.currentUser$ = value );
    this.authService.isLoggedIn$.subscribe( value => this.isLoggedIn$ = value );
    this.productService.getPaginated().subscribe( response => {
      this.products = response.payload;
    }) 

  }

  addProduct( pid : String ) : void {
    this.cartService.addProduct( this.currentUser$.id, pid ).subscribe(response => {
      this.cartService.onUpdateCartSubject( true );
      this.toast.create('success', response.message);
    });
  }

}
