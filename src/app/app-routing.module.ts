import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/general/page-not-found/page-not-found.component';


const routes: Routes = [

  // { path: '', component: HomeComponent, },
  {
    path: 'home',
    loadChildren: () => import('./modules/general/home/home.module')
      .then(mod => mod.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/general/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/general/register/register.module')
      .then(mod => mod.RegisterModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./modules/general/home/chat/chat.module')
      .then(mod => mod.ChatModule)
  },
  {
    path: '**', component: PageNotFoundComponent 
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
