import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MayoromenorComponent } from "./mayoromenor.component";
import { MayoromenorRoutingModule } from './mayoromenor-routing.module';


@NgModule({
    imports: [
      CommonModule,
      MayoromenorRoutingModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [
      MayoromenorComponent
    ]
  })
export class MayoromenorModule {}