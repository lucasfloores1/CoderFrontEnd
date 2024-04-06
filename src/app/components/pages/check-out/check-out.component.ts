import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../dto/Cart.dto';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { environment } from '../../../../environments/environment.development';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, ButtonModule, DividerModule, RouterLink, RouterLinkActive, RouterModule ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit {

  environment = environment;

  @Input() cid? : string;
  cart! : Cart
  
  constructor (
    private router : Router,
    private cartService : CartService,
    private toast : ToastService
  ) {}

  ngOnInit(): void {
    if (this.cid) {
      this.cartService.getById(this.cid).subscribe( response => {
        this.cart = response.payload;        
      });
    }
  }

  pay( cart : any ){
    this.cartService.purchase(cart.id).subscribe( response =>{
      this.cartService.onUpdateCartSubject(true);
      this.toast.create('success', 'Cart Bought Succesfully', 'Ticket sent in your email');
      this.router.navigate(['home']);      
    });
  }

  back(){
    this.router.navigate(['home']);
  }

}
