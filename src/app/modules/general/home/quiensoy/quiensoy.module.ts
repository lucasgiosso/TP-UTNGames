import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuiensoyComponent } from "./quiensoy.component";
import { QuiensoyRoutingModule } from './quiensoy-routing.module';


@NgModule({
    imports: [
      CommonModule,
      QuiensoyRoutingModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [
        QuiensoyComponent
    ]
  })
export class QuiensoyModule {}