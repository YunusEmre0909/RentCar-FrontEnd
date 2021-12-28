import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brands';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  
  apiUrl="https://localhost:44314/api/";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl +"brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
  }
  getBrandById(id:number):Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl+"brands/getbyid?id="+id
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
  }
  addBrands(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"brands/add"
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }
}
