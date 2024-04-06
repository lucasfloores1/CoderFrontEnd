import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthService } from '../../../services/auth.service';
import { CommonModule, AsyncPipe } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { SidebarModule } from 'primeng/sidebar';
import { Subscription } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../dto/Cart.dto';
import { User } from '../../../dto/User.dto';
import { CartComponent } from '../../pages/cart/cart.component';
import { UserComponent } from '../../pages/user/user.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ToolbarModule, CommonModule, AsyncPipe, RouterOutlet, RouterLink, RouterLinkActive, BadgeModule, SidebarModule, CartComponent, UserComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{

  updateCartSubscription : Subscription;
  isLoggedInSubscription : Subscription;
  currentUserSubscription : Subscription;

  user! : User
  cart! : Cart

  totalProducts : string = "0";
  currentUser$ : any = {};
  isLoggedIn$ : boolean = false;
  displayCart : boolean = false;
  displayUser : boolean = false;

  constructor(
    private router : Router,
    private authService : AuthService,
    private cartService : CartService,
    private toast : ToastService
  ){
    this.currentUserSubscription = authService.currentUser$.subscribe( value => {
      this.currentUser$ = value;
    })
    this.isLoggedInSubscription = authService.isLoggedIn$.subscribe( value => {
      this.isLoggedIn$ = value;
    })
    this.updateCartSubscription = cartService.updateCart$.subscribe( value => {
      if (this.currentUser$.cart_id) {        
        this.totalProducts = "0"
        this.getCart(this.currentUser$.cart_id);
      }      
    })
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe( value => this.currentUser$ = value );
    this.authService.isLoggedIn$.subscribe( value => this.isLoggedIn$ = value );   
    if (this.isLoggedIn$ && this.currentUser$.cart_id) {
      this.getCart(this.currentUser$.cart_id);
    }    
  }

  getCart( cid : String ) : void {
    this.cartService.getById(cid).subscribe( response => {
      this.cart= response.payload
      this.cart.products.map( product => {
        const parsedActual = parseFloat(this.totalProducts);
        const value = parsedActual + product.quantity;
        this.totalProducts = value.toString();
      });        
    })
  }

  editQuantityOfProduct( product : any ) : void {    
    this.cartService.updateQuantityOfProduct( this.currentUser$.id, product.product.id, this.currentUser$.cart_id, product.quantity ).subscribe( response => {
      this.cartService.onUpdateCartSubject( true );
      this.toast.create('success', response.message);
    });
  }

  deleteProductFromCart ( product : any ) : void {
    this.cartService.deleteProduct( product.product.id, this.currentUser$.cart_id ).subscribe( response => {
      this.cartService.onUpdateCartSubject( true );
      this.toast.create('warning', response.message);
    })
  }

  onHideCart( cart : any ) {
    this.displayCart = false;
    this.router.navigate([`checkout/${cart.id}`])
  }
  
}
