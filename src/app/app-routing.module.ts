import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuiensoyComponent } from './components/quiensoy/quiensoy.component';
import { WordScrambleComponent } from './components/word-scramble/word-scramble.component';
//import {canActivate, redirectUnauthorizedTo,AuthGuard} from '@angular/fire/auth-guard';

//const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [

  // { path: 'home',
  //   canActivate: [AuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLogin },
  //   loadChildren: () => import('./components/home/home.component').then(m=> m.HomeComponent)
  // },
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'home/quiensoy', component:QuiensoyComponent},
  {path: 'home/word-scramble', component:WordScrambleComponent},
  {path: 'home/logout', component:LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
