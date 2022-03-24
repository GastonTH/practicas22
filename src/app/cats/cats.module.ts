import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsComponent } from './cats.component';
import { CatsRoutingModule } from './cats-routing.module';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    CatsComponent,

    
  ],
  imports: [
    CommonModule,
    CatsRoutingModule,
    SharedModule
  ]
})
export class CatsModule { }
