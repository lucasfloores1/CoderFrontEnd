import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router);
  if (!authService.getAuthCookie() || !authService.getIsLoggedIn()) {
    if (authService.getAuthCookie()) {    
      authService.getUser().subscribe( response =>{
        authService.updateCurrentUser(response.payload);
        authService.updateIsLoggedIn(true);
      });
      return true;
    } 
    console.log( 'GUARD: Logged out', 'cookie', authService.getAuthCookie(), 'boolean', authService.getIsLoggedIn() );    
    authService.updateCurrentUser({});
    authService.updateIsLoggedIn(false);
    router.navigate(['login']);
    return false
  } else {
    console.log('GUARD: Logged in');
    return true
  }
};
