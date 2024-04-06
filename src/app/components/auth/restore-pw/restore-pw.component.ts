import { Component, Input, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restore-pw',
  standalone: true,
  imports: [CheckboxModule, ButtonModule, InputTextModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './restore-pw.component.html',
  styleUrl: './restore-pw.component.scss'
})
export class RestorePwComponent implements OnInit{

  @Input() token? : string;

  isToken : boolean = false;

  emailForm! : FormGroup;
  passwordForm! : FormGroup;

  constructor (
    private router : Router,
    private fb : FormBuilder,
    private authService : AuthService,
    private toast : ToastService
  ){}

  ngOnInit(): void {
    if (this.token) {
      this.isToken = true;
    }
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.passwordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  emailSubmit(): void {
    const { email } = this.emailForm.value
    this.authService.sendEmailRestorePassword(email).subscribe( response => {
      this.toast.create('success', response.message);
    })
  }

  passwordSubmit() : void {
    const { email, password } = this.passwordForm.value
    if (this.token) {
      this.authService.restorePassword(email, password, this.token).subscribe( response => {
        this.toast.create('info', response.message);
        this.router.navigate(['login']);
      })
    }
  }
}