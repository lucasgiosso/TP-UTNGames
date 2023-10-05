import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WordScrambleComponent } from "./word-scramble.component";
import { WordScrambleRoutingModule } from './word-scramble-routing.module';


@NgModule({
    imports: [
      CommonModule,
      WordScrambleRoutingModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [
        WordScrambleComponent
    ]
  })
export class WordScrambleModule {}