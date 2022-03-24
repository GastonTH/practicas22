import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatsComponent } from './cats/cats.component';
import { HomeComponent } from './home/home.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

{  path:'',
  component: HomeComponent
},
{
  path:'profile',
  component:ProfileComponent
},
{
  path: 'cats',
  loadChildren:() => import('./cats/cats.module').then(m=>m.CatsModule)
},
{
  path: '**',
  component:NotfoundpageComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
