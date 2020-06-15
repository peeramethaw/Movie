import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-show-register',
  templateUrl: './show-register.component.html',
  styleUrls: ['./show-register.component.css']
})
export class ShowRegisterComponent implements OnInit {
  profiles: any;
  constructor(private ps: ProfileService) {
    this.onLoading();
   }

  ngOnInit(): void {  }
  onLoading(){
    try {
        this.ps.getProfile().subscribe (
            data => {
            this.profiles = data;
            },
            err => {
                console.log(err)
            });
    }catch (error) {
        console.log(error)
    }
}

}
