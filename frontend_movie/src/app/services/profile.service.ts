import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    profiles: any;
    constructor(private http: HttpClient) { }
    addProfile(profile) {
        console.log('on add');
        return this.http.post<any>('http://localhost:3000/profile/add', profile)
        .pipe(map(data => {
            return data;
        }));
    }



        getProfile(){
            return this.http.get<any>('http://localhost:3000/profile/get')
            .pipe(map(data => {
                if (data) {
                    this.profiles = data;
                    console.log(this.profiles);
                }
                    return this.profiles;
                }));
            }



        }
