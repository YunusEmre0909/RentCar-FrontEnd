import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44314/api/"

  constructor(private  httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath= this.apiUrl+ "cars/getcarsbybrandid?id="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcarsbycolorid?id="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  addCars(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/add"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
  getCarDetailId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetailid?id="+ carId
    return  this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
  getCarDetail():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetails"
      return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
  update(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/update"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
  getById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getbyid"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
