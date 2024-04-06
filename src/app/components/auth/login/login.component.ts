import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { concatMap } from 'rxjs';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, ButtonModule, InputTextModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm! : FormGroup;

  constructor (
    private router : Router,
    private fb : FormBuilder,
    private authService : AuthService,
    private cartService : CartService,
    private toast : ToastService
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).pipe(
      concatMap(() => this.authService.getUser()),
    ).subscribe(response => {      
      this.authService.updateCurrentUser(response.payload);
      this.authService.updateIsLoggedIn(true);
      this.cartService.onUpdateCartSubject(true);
      this.toast.create('success', 'Logged In')
      this.router.navigate(['home']);
    });
  }

}
