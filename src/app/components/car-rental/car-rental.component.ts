import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { CardToPay } from 'src/app/models/cardToPay';
import { CardService } from 'src/app/services/card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {

  currentDate:any
  returnDate:any
  isCarAvaliable:boolean
  messageToDisplay:string
  carId:number
  isSaveCardChecked:boolean

  paymentForm:FormGroup
  months:string[]=["01","02","03","04","05","06"]
  years:number[]=[2022,2023,2024]

  constructor(private rentalService:RentalService,private toastrService:ToastrService,private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,private datePipe:DatePipe,private cardService:CardService,private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.activatedRoute.params.subscribe((params) => {
      this.carId = params["carId"];
    })

    this.createPaymentForm()

    this.paymentForm.valueChanges.subscribe(console.log);
  }
  createPaymentForm(){
    this.paymentForm=this.formBuilder.group({
      cardNumber:["",Validators.required],
      nameOnCard:["",Validators.required],
      cvv:["",Validators.required],
      expirationMonth:["01",Validators.required],
      expirationYear:["2022",Validators.required]
    })
  }
  getCurrentClassOfPayButton(){
    if(this.isCarAvaliable){
      return "btn btn-primary"
    }else{
      return "btn btn-primary disabled"
    }
  }

  checkIfCarIsAvaliable(carId:number,rentDate:string,returnDate:string){

    this.rentalService.checkIfCarIsAvaliable(carId,returnDate,rentDate).subscribe(response=>{
      this.isCarAvaliable=response.success
      this.messageToDisplay=response.message
      if(response.success){
        this.toastrService.success(response.message)
      }else{
        this.toastrService.error(response.message)
      }
    })
  }
  addRental(){
    let values=this.returnDate.split("-")
    let returnDataConverted=this.datePipe.transform(new Date(+values[0],+values[1] - 1,+values[2]),'yyyy-MM-dd')
    let rental={carId:this.carId,customerId:1,rentDate:this.currentDate,returnDate:returnDataConverted}

    this.rentalService.addRentals(rental).subscribe((response)=>{
      if(response.success){
        this.toastrService.success("araba başarıyla kiralandı")
      }else{
        this.toastrService.error("Hata oluştu ,lütfen tekrar deneyin")
      }
    })
    
  }
  addCard(){
    let  card:Card={
      cardNumber:this.paymentForm.value.cardNumber,cvv:this.paymentForm.value.cvv,
      expiration:this.paymentForm.value.expirationYear+"-"+this.paymentForm.value.expirationMonth+"-"+"01",
      nameOnCard:this.paymentForm.value.nameOnCard,userId:3

    }
    this.cardService.addCard(card).subscribe((response)=>{
      if(response.success){
        this.toastrService.success("kart başarıyla eklendi")

      }else if(response.success==false){
        this.toastrService.error("Kart kaydedilirken bir hata oluştu. Daha sonra tekrar deneyin")
      }
    })
  }
  pay() {
    let card: CardToPay = {
      nameOnCard: this.paymentForm.value.nameOnCard, cardNumber: this.paymentForm.value.cardNumber,
      cvv: this.paymentForm.value.cvv, expirationMonth: this.paymentForm.value.expirationMonth, expirationYear: this.paymentForm.value.expirationYear
    };
    if (this.isSaveCardChecked != true) {
      if (this.paymentForm.valid) {
        this.paymentService.pay(card).subscribe((response) => {
          if (response.success) {
            this.toastrService.success("Ödeme başarılı bir şekilde gerçekleşti");
            this.addRental();
          } else {
            this.toastrService.error("Hata oluştu lütfen tekrar deneyin");
          }
        })
      }
      else {
        this.toastrService.error("Formu doldurun");
      }
    }
    else if (this.isSaveCardChecked == true) {
      if (this.paymentForm.valid) {
        this.paymentService.pay(card).subscribe((response) => {
          if (response.success) {
            this.toastrService.success("Ödeme başarılı bir şekilde gerçekleşti");
            this.addRental();
            this.addCard();
          } else {
            this.toastrService.error("Hata oluştu lütfen tekrar deneyin");
          }
        });
      }else {
        this.toastrService.error("Formu Doldurun");
      }
    }
  }

  
    
  

}
