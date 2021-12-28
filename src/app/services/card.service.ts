import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl="https:\\localhost:44314/api"
  constructor(private httpClient:HttpClient) { }
  addCard(card:Card):Observable<ResponseModel>{
    let newPath=this.apiUrl+"/cards/add"
    return this.httpClient.post<ResponseModel>(newPath,card)

  }
}
