import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44314/api"

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"/rentals/getrentaldetails"
    return  this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  addRentals(rental:any):Observable<any>{
    let newPath=this.apiUrl+"/rentals/add"
    return this.httpClient.post<any>(newPath,rental)
  }
  checkIfCarIsAvaliable(carId:number, rentDate:string ,returnDate:string):Observable<any>{

    let newPath=this.apiUrl+`/rentals/checkifcarisavaliable?carId=${carId}&rentDate=${rentDate}&returnDate=${returnDate}`
    return this.httpClient.get<any>(newPath)
  }
}
