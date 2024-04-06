import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiResponse } from '../dto/api-response.dto';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private updateCartSubject = new Subject<boolean>();
  updateCart$ = this.updateCartSubject.asObservable();

  private httpOptions = {
    withCredentials : true
  }

  private apiUrl = environment.apiUrl

  constructor( private http : HttpClient, private cookieService : CookieService ) { }

  onUpdateCartSubject( value : boolean ) {
    this.updateCartSubject.next(value);
  }

  getById ( cid : String ) : Observable<ApiResponse> {
    return this.http.get<ApiResponse>( `${this.apiUrl}/api/carts/${cid}`, this.httpOptions );
  }

  addProduct ( uid : String, pid : String ) : Observable<ApiResponse> {   
    return this.http.post<ApiResponse>( `${this.apiUrl}/api/carts/${uid}/products/${pid}`, null, this.httpOptions );
  }

  deleteProduct ( pid : String, cid : String ) : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>( `${this.apiUrl}/api/carts/${cid}/products/${pid}`, this.httpOptions );
  }

  deleteAllProdct ( cid : String ) : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>( `${this.apiUrl}/api/carts/${cid}`, this.httpOptions );
  }

  updateQuantityOfProduct ( uid : String, pid : String, cid : String, quantity : Number ) : Observable<ApiResponse> {
    const data = { quantity };
    return this.http.put<ApiResponse>( `${this.apiUrl}/api/carts/${cid}/products/${pid}/user/${uid}`, data, this.httpOptions );
  }
  
  purchase( cid : String ) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>( `${this.apiUrl}/api/carts/${cid}/purchase`, null, this.httpOptions );
  }

}
