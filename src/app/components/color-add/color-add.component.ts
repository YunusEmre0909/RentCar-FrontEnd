import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup

  constructor(private formBuilder:FormBuilder,private colorService:ColorService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }
  add(){
    if(this.colorAddForm.valid){
      let colorModel=Object.assign({},this.colorAddForm.value)
      this.colorService.addColors(colorModel).subscribe(response=>{
        this.toastrService.success("Renk Eklendi","Başaılı")
      },errorResponse=>{
        if(errorResponse.error.Errors.length>0){
          for(let i=0;i<errorResponse.error.Errors.length;i++){
            this.toastrService.warning(errorResponse.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }else{
          this.toastrService.error("Form Eksik Girildi", "Hata")
        }
      })
    }
  }
}
