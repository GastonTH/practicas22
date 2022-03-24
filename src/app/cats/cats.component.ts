import { Component, OnInit } from '@angular/core';
import { CatsService } from '../cats.service';
import { forkJoin } from 'rxjs';


export interface Cat {
  image:string,
  fact:string,
  isLoading:boolean
}
export class Cat{
  constructor(cat:Cat){
    this.image = cat.image || '';
    this.fact = cat.fact || '';
    this.isLoading = true;

  }
}

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})

export class CatsComponent implements OnInit {

  public currentCat:any;
  public posts:Cat[]=[];

  constructor(private catService: CatsService) { }


  ngOnInit(): void {

    let image = this.catService.getCat();
    let fact = this.catService.getCatFact();
  
    forkJoin([image, fact]).subscribe((results:any) => {

      results[0].forEach((image:any, index:number)=> {
        let cat = new Cat({
          image:image.url,
          fact: results[1].data[index].fact,
          isLoading: true
        })
        this.posts.push(cat);
      })
      console.log(this.posts);
    })

  }

}
