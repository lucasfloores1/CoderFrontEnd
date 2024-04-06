import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiResponse } from '../dto/api-response.dto';
import { environment } from '../../environments/environment.development';
import { NewUser } from '../dto/User.dto';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>({});
  currentUser$ = this.userSubject.asObservable();

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  private httpOptions = {
    withCredentials : true
  }

  private apiUrl = environment.apiUrl

  constructor( 
    private http : HttpClient,
    private cookieService : CookieService 
  ) { }

  getCurrentUser () : any {
    return this.userSubject.value
  }

  getIsLoggedIn() : any {
    return this.loggedInSubject.value
  }

  updateIsLoggedIn( value : boolean) {
    //console.log('AUTH SERV: Update isLoggedIn', value);    
    this.loggedInSubject.next(value);
  }

  updateCurrentUser( user : any ) {
    //console.log('AUTH SERV: Update currentUser', user);
    this.userSubject.next(user);
  }

  getAuthCookie() : boolean {
    return this.cookieService.check('accessToken');
  }

  login ( data : any ) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/auth/login`, data, this.httpOptions);
  }

  register ( user : NewUser ) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/auth/register`, user, this.httpOptions);
  } 

  getUser () : Observable<ApiResponse> { 
    return this.http.get<ApiResponse>( `${this.apiUrl}/api/auth/current`, this.httpOptions );
  }

  logout () : Observable<ApiResponse> {
    return this.http.get<ApiResponse>( `${this.apiUrl}/api/auth/logout`, this.httpOptions );
  }

  sendEmailRestorePassword ( email : String ) : Observable<ApiResponse> {
    const data = { email };
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/auth/restore-password/email`, data, this.httpOptions);
  }

  restorePassword ( email : String, password : String, token : string ) : Observable<ApiResponse> {
    const data = { email, password };
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/auth/restore-password/${token}`, data, this.httpOptions);
  }

  turnPremiumUser ( uid : String ) : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/auth/users/premium/${uid}`, this.httpOptions );
  }

  uploadFile ( typeFyle : String, file : any ) : Observable<ApiResponse> {
    const data = { file };
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/auth/users/current/documents/${typeFyle}`, data, this.httpOptions);
  }

  getReducedUsers () : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/auth/users`, this.httpOptions );
  }

  deleteUnactiveUsers () : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/api/auth/users`, this.httpOptions );
  }
  
}
