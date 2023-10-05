import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatComponent } from "./chat.component";
import { ChatRoutingModule } from './chat-routing.module';


@NgModule({
    imports: [
      CommonModule,
      ChatRoutingModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    exports: [
   
    ],
    declarations: [

    ],
    providers: [
    ],
  })
export class ChatModule {}