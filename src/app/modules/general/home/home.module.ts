import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from './home-routing.module';
import { ChatComponent } from "./chat/chat.component";



@NgModule({
    imports: [
      CommonModule,
      HomeRoutingModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [
        HomeComponent,
        ChatComponent
    ]
  })
export class HomeModule {}