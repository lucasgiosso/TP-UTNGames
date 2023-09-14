import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuiensoyComponent } from './components/quiensoy/quiensoy.component';
import { WordScrambleComponent } from './components/word-scramble/word-scramble.component';
//import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { AuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  // {
  //   path: 'main', 
  //   component:RegisterComponent, 
  //   ...canActivate(()=> redirectUnauthorizedTo(['/register']))
  // },
  {path: 'home', component:HomeComponent},
  {path: 'home/quiensoy', component:QuiensoyComponent},
  {path: 'home/word-scramble', component:WordScrambleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
