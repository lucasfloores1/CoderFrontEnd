import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../dto/User.dto';
import { AuthService } from '../../../services/auth.service';
import { AccordionModule } from 'primeng/accordion';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AccordionModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  @Input() user! : User


  constructor(
    private authService : AuthService,
    private router : Router,
    private toast : ToastService
  ){}

  ngOnInit(): void {   
  }

  logout(){
    this.authService.logout().subscribe(response => {
      this.toast.create('warning', response.message);
      this.authService.updateIsLoggedIn(false);
      this.router.navigate(['login']);
    });
  }

}
