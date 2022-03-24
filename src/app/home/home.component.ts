import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDataServiceService } from '../user-data-service.service';

export interface User {
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public user: User = {
    name: '',
    avatar: ''
  }

  public userName = this.user.name

  checkList = [
    { name: 'hello-world', isChecked: true },
    { name: 'react + nextjs', isChecked: false },
    { name: '@material-ui', isChecked: false },
  ]

  public nameNewCheck = "";

  constructor(private snackBar: MatSnackBar, private UserData: UserDataServiceService, private router: Router) { }

  gotoProfile(){
    this.router.navigate(['/profile']);  // define your component where you want to go
}


  ngOnInit(): void {

    this.UserData.currentUser.subscribe(thisUser => {
      this.user = thisUser
      this.userName = thisUser.name;

      console.log(thisUser);

    })

  }

  openSnackBar() {
    
    var message = "No tienes un nombre de perfil asignado";

    this.snackBar.open(message, "ir al perfil").afterDismissed().subscribe(()=>{this.gotoProfile()})
  }

  public addToCheckList() {

    console.log(this.user.name);

    // Comprobar si hay un nombre de usuario guardado
    if (this.userName != undefined && this.userName != '') {
      // si hay un nombre de usuario guardado entonces puedes agregar tareas a la lista
      this.checkList.push({ name: this.nameNewCheck, isChecked: false });
      this.nameNewCheck = "";

    } else {

      // si no, debera aparecer una alerta y pedirte que guardes un nombre de usuario
      this.openSnackBar();

    }

    //console.log(this.userName)

  }

  deleteItem(index: number) {

    this.checkList.splice(index, 1);

  }

  public checkValue(event: any, index: number) {
    this.checkList[index].isChecked = event.checked

    console.log(this.checkList)

  }
}
