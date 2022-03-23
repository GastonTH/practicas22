import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  name: string;
  avatar:string;
}


@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject({} as User);
  public readonly currentUser: Observable<User> = this.currentUserSubject.asObservable();

 
  constructor() { }



  modifyUser(currentUser:User){
    this.currentUserSubject.next(currentUser);
  }



}
