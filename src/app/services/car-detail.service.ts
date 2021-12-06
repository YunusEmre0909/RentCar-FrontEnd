import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl="https://localhost:44314/api"

  constructor(private httpClient:HttpClient) { }

  getCarDetailId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"/cars/getcardetailid?id="+ carId
    return  this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
  getCarDetail():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"/cars/getcardetails"
      return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
}
