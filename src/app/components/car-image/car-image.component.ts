import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {

  carImages:CarImage[]

  constructor(private carImageService:CarImageService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarImageById(params["carId"])
      }
    })
  }

  getCarImageById(carId:number){
    this.carImageService.getCarImageById(carId).subscribe(response=>{
      this.carImages=response.data
      console.log(this.carImages)
    })
  }

}
