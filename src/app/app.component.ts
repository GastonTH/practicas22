import { Component, OnInit } from '@angular/core';
import { User, UserDataServiceService } from './user-data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 public title = 'ArdisApp';
 public menuItems = [
   {
     name:'Home',
    path:'',
    icon:'fa-home'
   },
   {
      name:'Profile',
      path:'profile',
      icon:'fa-user'
   }
 ]
  public user:User = {
    name:'',
    avatar:''
  } 


 constructor(private UserService:UserDataServiceService){

 }

 ngOnInit(): void {
   this.UserService.currentUser.subscribe( user => {
     this.user = user;
   })
 }
}
