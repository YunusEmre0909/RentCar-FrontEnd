import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup

  constructor(private brandService:BrandService,private toastrService:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createBrandAddForm()
  }

  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }
  add(){
    if (this.brandAddForm.valid) {
      let brandModel= Object.assign({},this.brandAddForm.value) 
      this.brandService.addBrands(brandModel).subscribe(response=>{
        this.toastrService.success("Marka Eklendi","Başarılı")
      },errorResponse=>{
        if (errorResponse.error.Errors.length>0) {
          for (let i = 0; i < errorResponse.error.Errors.length; i++) {
            this.toastrService.warning(errorResponse.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
            
          }
        }else{
          this.toastrService.error("Marka Eklenemedi","Hata")
        }
      })
    }
  }

}
