import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { InputMaskModule } from 'primeng/inputmask';
import { validDate } from '../../../utils/date.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, ButtonModule, InputTextModule, ReactiveFormsModule, InputMaskModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  registerForm! : FormGroup;

  constructor (
    private router : Router,
    private fb : FormBuilder,
    private authService : AuthService,
    private toast : ToastService
  ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      age: ['', Validators.required, validDate],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {

    const { first_name , last_name, age, email, password} = this.registerForm.value;
    const data = {
      first_name,
      last_name,
      age : this.extractYear(age),
      email,
      password
    }
    this.authService.register(data).subscribe( response => {
      this.toast.create('success', response.message)
      this.router.navigate(['login'])     
    });    
    
  }

  extractYear(dateString: string): number | null {
    const regex = /(\d{2})\/(\d{2})\/(\d{4})/;
    const match = regex.exec(dateString);
  
    if (match && match.length === 4) {
      return parseInt(match[3], 10);
    } else {
      return null;
    }
  }
}
