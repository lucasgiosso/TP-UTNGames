import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { DataServices } from './data.services';
import { HttpClientModule } from '@angular/common/http';

import { FirestoreModule, provideFirestore,getFirestore } from '@angular/fire/firestore';
import { PageNotFoundComponent } from './modules/general/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FirestoreModule,
     provideFirebaseApp(() => initializeApp(environment.firebase)),
     provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [DataServices],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
