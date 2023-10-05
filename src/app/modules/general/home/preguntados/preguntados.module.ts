import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PreguntadosComponent } from "./preguntados.component";
import { PreguntadosRoutingModule } from './preguntados-routing.module';


@NgModule({
    imports: [
      CommonModule,
      PreguntadosRoutingModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [
      PreguntadosComponent
    ]
  })
export class PreguntadosModule {}