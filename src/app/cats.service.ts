import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(private http:HttpClient) { }

  getCat(){
    return this.http.get("https://api.thecatapi.com/v1/images/search")
  }

  getCatFact(){
    return this.http.get("https://catfact.ninja/fact")
  }

}
