import { Component, OnInit } from '@angular/core';
import { CatsService } from '../cats.service';
import { forkJoin } from 'rxjs';
import { User, UserDataServiceService } from '../user-data-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

moment.locale("es")

// interfaz de cat
export interface Cat {
  image: string,
  fact: string,
  isLoading: boolean,
  commentList: Array<Comment>,
  like: string,
  likeNumber: number
}

// interfaz comment
export interface Comment {
  text: string,
  emitter: string,
  creationDate: string,
  response: Array<Comment>
}

// clase de cat que es un cat(interface)
export class Cat {
  constructor(cat: Cat) {
    this.image = cat.image || '';
    this.fact = cat.fact || '';
    this.isLoading = true;
    this.like = "favorite_border" || '';
    this.likeNumber = 0;
    this.commentList = Array<Comment>();

  }
  image:string;
  fact:string;
  isLoading:boolean;
  like:string;
  likeNumber:number;
  commentList:Array<Comment>;
}

// Clase 
export class Comment {
  constructor(com: Comment) {
    this.text = com.text || '';
    this.emitter = com.emitter || '';
    this.creationDate = com.creationDate || '';
    this.response = com.response || [];
  }
  text: string;
  emitter: string;
  creationDate: string;
  response: Array<Comment>;
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
  public posts: Cat[] = [];
  // lista de comentarios que son asignados a los inputs para que despues se puedan diferenciar entre ellos
  public newComments: Array<string> = [];
  // corazon like test
  public liked = false;

  // clase publica de un usuario que es un usuario(interface) para
  // poder recoger la informacion del usuario logeado actualmente
  public user: User = {
    name: '',
    avatar: ''
  }

  // esta variable publica es un usuario
  public userName = this.user.name

  constructor(private catService: CatsService, private snackBar: MatSnackBar, private UserData: UserDataServiceService, private router: Router) { }

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
    forkJoin([image, fact]).subscribe((results: any) => {

      // con cada resultado que de creara un gato y lo guardara en un array de gatos
      results[0].forEach((image: any, index: number) => {
        let cat = new Cat({
          image: image.url,
          fact: results[1].data[index].fact,
          isLoading: true,
          like: "favorite_border",
          likeNumber: 0,
          commentList: new Array<Comment>()

        })

        // despues de crear el gato, se añade en el array de posts para la web
        this.posts.push(cat);
      })

      // console.log(this.posts);
    })

  }

  gotoProfile() {
    this.router.navigate(['/profile']);  // define your component where you want to go
  }

  public addComment(index: number) {

    // Comprobar si hay un nombre de usuario guardado
    if (this.userName != undefined && this.userName != '') {

      // si hay un nombre de usuario guardado entonces puedes agregar tareas a la lista
      // creamos un nuevo comentario
      let newComment = new Comment({
        text: this.newComments[index],
        emitter: this.user.name,
        creationDate: moment().fromNow(),
        response: Array<Comment>()
      });

      this.posts[index].commentList.push(newComment)
      this.newComments[index] = "";

    } else {

      // si no, debera aparecer una alerta y pedirte que guardes un nombre de usuario
      this.openSnackBar();

    }

  }


  public likePost(index: number) {

    if (this.posts[index].like == "favorite_border") {
      this.posts[index].like = "favorite"
      this.posts[index].likeNumber += 1;
    } else {
      this.posts[index].like = "favorite_border"
      this.posts[index].likeNumber -= 1;
    }
  }

  public sharePost(index: number) {
    console.log(index);
  }

  openSnackBar() {

    var message = "No tienes un nombre de perfil asignado";

    this.snackBar.open(message, "ir al perfil").afterDismissed().subscribe(() => { this.gotoProfile() })
    
  }

  cambiarLike(indexComment:number, postIndex:number){

    console.log(this.posts[postIndex]);
    console.log("comment number: " + indexComment);
    
    
    
    if (this.liked) {
      this.liked = false;
    } else {
      this.liked = true;
    }

  }
}