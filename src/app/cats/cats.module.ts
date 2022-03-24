import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsComponent } from './cats.component';
import { CatsRoutingModule } from './cats-routing.module';
import { MatCardModule } from '@angular/material/card';




@NgModule({
  declarations: [
    CatsComponent,
    
  ],
  imports: [
    CommonModule,
    CatsRoutingModule
  ]
})
export class CatsModule { }
