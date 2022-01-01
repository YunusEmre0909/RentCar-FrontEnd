import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup
  cars:Car[]

  constructor(private carService:CarService,private formBuilder:FormBuilder,private toastrService:ToastrService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.getcarbyid(params["carId"])
      }
    })
    this.createCarUpdateForm()
  }
  createCarUpdateForm(){
    this.carUpdateForm=this.formBuilder.group({
      carId:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }
  getcarbyid(carId:number){
    this.carService.getById(carId).subscribe(response=>{
      this.cars=response.data
    })
  }
  update(){
    if (this.carUpdateForm.valid) {
      
      let carModel=Object.assign({},this.carUpdateForm.value)
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success("Araba Güncellendi","Başarılı")
      },errorResponse=>{
        if (errorResponse.error.Error.length>0) {
          for (let i = 0; i <errorResponse.error.Errors.length; i++) {
           this.toastrService.warning(errorResponse.error.Errors[i].ErrorMessage, "Doğrulama Hatası")
            
          }
        }else{
          this.toastrService.error("Araba Güncellenemedi")
        }
      })
    }
  }
}
