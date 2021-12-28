import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardToPay } from '../models/cardToPay';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl ="https://localhost:44314/api/payments/pay"

  constructor(private httpClient:HttpClient) { }

  pay(card:CardToPay):Observable<any>{
    return this.httpClient.post<any>(this.apiUrl,card)
  }
}
