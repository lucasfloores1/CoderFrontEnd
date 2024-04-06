import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './components/auth/login/login.component';
import { NavBarComponent } from './components/ui/nav-bar/nav-bar.component';
import { ProductPanelComponent } from './components/ui/product-panel/product-panel.component';
import { CommonModule } from '@angular/common';
import { PaginationOptions, Product } from './dto/Product.dto';
import { CartComponent } from './components/pages/cart/cart.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, NavBarComponent, ProductPanelComponent, CommonModule, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CookieService]
})
export class AppComponent implements OnInit {
  title = 'frontEnd';
  panelOn : Boolean = false;
  products! : Product[];
  paginationOptions! : PaginationOptions

  isLoggedInSubscription : Subscription;
  isLoggedIn$ : boolean = false;

  constructor( 
    public cookieService : CookieService,
    private authService : AuthService,
  ){
    this.isLoggedInSubscription = authService.isLoggedIn$.subscribe( value => {
      this.isLoggedIn$ = value;
    })
  }


  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe( value => this.isLoggedIn$ = value )
  }

  panel() : void {
    this.panelOn = !this.panelOn;
  }
}