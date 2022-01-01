import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails:CarDetail[]
  carId:number


  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailId(params["carId"]);
      }
    })
 
  }

  getCarDetailId(carId:number){
    this.carService.getCarDetailId(carId).subscribe(response=>{
      this.carDetails=response.data
    })

  }
  setCurrentRoute(){
    this.router.navigateByUrl("cars/update")
  }

}
