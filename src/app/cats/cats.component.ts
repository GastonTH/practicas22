import { Component, OnInit } from '@angular/core';
import { CatsService } from '../cats.service';

export interface Cat {
  image:string,
  fact:string
}
export class Cat{
  constructor(cat:Cat){
    this.image = cat.image || '';
    this.fact = cat.fact || '';

  }
}

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})

export class CatsComponent implements OnInit {

  public currentCat:any;

  constructor(private catService: CatsService) { }

  ngOnInit(): void {

    this.currentCat = new Cat({
      image:'',
      fact:''
    })

    this.catService.getCat().subscribe((data:any) => {
      let image = data[0].url;
      this.currentCat.image = image;
      console.log("imagen actualizada");
      
    })

    this.catService.getCatFact().subscribe((data:any) =>{
      let fact =  data.fact
      this.currentCat.fact = fact
      console.log("frase actualizada");
      
    })

  }

}
