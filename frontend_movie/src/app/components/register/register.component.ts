import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { ProfileService } from '../../services/profile.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status="INVALID";
  image: File;


  profileForm = new FormGroup({
    img: new FormControl('', [Validators.required]),
    file: new FormControl(''),
    id: new FormControl('', [Validators.required]),
    password: new FormControl('',Validators.min(8)),
    title: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
  });

  previewLoaded: boolean = false;


get email(){
  return this.profileForm.get('email');
}



  constructor(private ps: ProfileService) { }

  ngOnInit(): void {
  }

  addProfile(){
    console.log(this.profileForm.value);
    this.ps.addProfile(this.profileForm.value).subscribe(
        data =>{
            console.log(data)
            alert(' Product added successfully') ;
            this.profileForm.reset();
        },
        err =>{
            console.log(err);
        });
}




  stat(){
    if(this.email.invalid){
      return "INVALID"
    }else{
      return "VALID"
    }
  }


  onChangeImg(e: any){
    if(e.target.files.length > 0){
      this.image = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if(!this.image.type.match(pattern)){
        alert('invalid format');
        this.profileForm.reset();
      }else{
        reader.readAsDataURL(this.image);
        reader.onload = () => {
          this.previewLoaded = true;
          this.profileForm.patchValue({
            img: reader.result
          });
        }
      }
    }
  }

  resetForm(){
    this.profileForm.reset();
    this.previewLoaded = false;
}


}
