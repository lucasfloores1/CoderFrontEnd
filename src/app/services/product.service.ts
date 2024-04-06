import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../dto/api-response.dto';
import { Product } from '../dto/Product.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpOptions = {
    withCredentials : true
  }

  private apiUrl = environment.apiUrl

  constructor( private http : HttpClient ) { }

  getPaginated( data?: { limit?: number, page?: number, sort?: string, search?: string, tags?: Array<any> } ) : Observable<any> {
    let params = new HttpParams();
    if (data) {
      if (data.limit) {
        params = params.set('limit', data.limit.toString());
      }
  
      if (data.page) {
        params = params.set('page', data.page.toString());
      }
  
      if (data.sort) {
        params = params.set('sort', data.sort);
      }
  
      if (data.search) {
        params = params.set('search', data.search);
      }
  
      if (data.tags && data.tags.length > 0) {
        const tagsQueryParam = data.tags.join(',');
        params = params.set('tags', tagsQueryParam);
      }
    }

    return this.http.get<any>( `${this.apiUrl}/api/products`, { withCredentials : true, params } );
  }

  getById ( pid : String ) : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/products/${pid}`, this.httpOptions);
  }

  createProduct ( product : Product ) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/products`, product, this.httpOptions);
  }

  updateProduct ( data : any, pid : String ) : Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/api/products/${pid}`, data, this.httpOptions);
  }

  deleteProduct ( pid : String, uid : String ) : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/api/products/${pid}/user/${uid}`, this.httpOptions);
  }

}
