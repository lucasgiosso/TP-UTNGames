import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AhorcadoComponent } from "./ahorcado.component";
import { AhorcadoRoutingModule } from './ahorcado-routing.module';


@NgModule({
    imports: [
      CommonModule,
      AhorcadoRoutingModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [
        AhorcadoComponent
    ]
  })
export class AhorcadoModule {}