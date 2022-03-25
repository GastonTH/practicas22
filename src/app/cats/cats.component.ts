import { Component, OnInit } from '@angular/core';
import { CatsService } from '../cats.service';
import { forkJoin } from 'rxjs';
import { User, UserDataServiceService } from '../user-data-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// interfaz de cat
export interface Cat {
  image:string,
  fact:string,
  isLoading:boolean,
  commentList:Array<string>,
  like:string,
  likeNumber:number
}

// interfaz comment
export interface Comment {
 text:string,
 emitter:User,
 creationDate: Date
 response: Comment
}

// clase de cat que es un cat(interface)
export class Cat{
  constructor(cat:Cat){
    this.image = cat.image || '';
    this.fact = cat.fact || '';
    this.isLoading = true;
    this.like = "favorite_border";
    this.likeNumber = 0;
    this.commentList = Array<any>();

  }
}

// Component
@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})

// clase del componente
export class CatsComponent implements OnInit {

  // variables del componente
  public posts:Cat[]=[];
  // lista de comentarios que son asignados a los inputs para que despues se puedan diferenciar entre ellos
  public newComments:Array<string> = [];

  // clase publica de un usuario que es un usuario(interface) para
  // poder recoger la informacion del usuario logeado actualmente
  public user: User = {
    name: '',
    avatar: ''
  }

  // esta variable publica es un usuario
  public userName = this.user.name

  constructor(private catService: CatsService,private snackBar: MatSnackBar, private UserData: UserDataServiceService, private router: Router) { }

  // variables que cuando inicie el modulo creara y cargara estas variables
  ngOnInit(): void {

    // nos subscribimos al nombre de perfil
    this.UserData.currentUser.subscribe(thisUser => {
      this.user = thisUser
      this.userName = thisUser.name;

      console.log(this.userName);

    })

    // inicializacion de las variables de servicio de gatos para cargar las imagenes
    let image = this.catService.getCat();
    let fact = this.catService.getCatFact();
  
    // todos los servicios se cargan aqui al unisono
    forkJoin([image, fact]).subscribe((results:any) => {

      // con cada resultado que de creara un gato y lo guardara en un array de gatos
      results[0].forEach((image:any, index:number)=> {
        let cat = new Cat({
          image:image.url,
          fact: results[1].data[index].fact,
          isLoading: true,
          like:"favorite_border",
          likeNumber:0,
          commentList: new Array<any>()
          
        })

        // despues de crear el gato, se añade en el array de posts para la web
        this.posts.push(cat);
      })

      console.log(this.posts);
    })

  }

  gotoProfile(){
    this.router.navigate(['/profile']);  // define your component where you want to go
}

  public addComment(index:number){

    console.log(index);
    console.log(this.newComments[index]);
    this.posts[index].commentList.push(this.newComments[index])
    this.newComments[index] = "";
    
    
/*
    // Comprobar si hay un nombre de usuario guardado
    if (this.userName != undefined && this.userName != '') {
      // si hay un nombre de usuario guardado entonces puedes agregar tareas a la lista
      
      this.posts[index].commentList.push(this.newComment)
      this.newComment = "";

    } else {

      // si no, debera aparecer una alerta y pedirte que guardes un nombre de usuario
      this.openSnackBar();

    }*/

  }

  public likePost(index:number){
    
    if (this.posts[index].like == "favorite_border") {
      this.posts[index].like = "favorite"
      this.posts[index].likeNumber += 1;
    } else {
      this.posts[index].like = "favorite_border"
      this.posts[index].likeNumber -= 1;
    }  
  }

  public sharePost(index:number){
    console.log(index);
  }

  openSnackBar() {
    
    var message = "No tienes un nombre de perfil asignado";

    this.snackBar.open(message, "ir al perfil").afterDismissed().subscribe(()=>{this.gotoProfile()})
  }
}
