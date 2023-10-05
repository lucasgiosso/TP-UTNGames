import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";

const routes : Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'quiensoy',
        loadChildren: () => import('./quiensoy/quiensoy.module')
        .then((m) => m.QuiensoyModule),
    },
    {
        path: 'ahorcado',
        loadChildren: () => import('./ahorcado/ahorcado.module')
        .then((m) => m.AhorcadoModule),
    },
    {
        path: 'mayorOMenor',
        loadChildren: () => import('./mayoromenor/mayoromenor.module')
        .then((m) => m.MayoromenorModule),
    },
    {
        path: 'preguntados',
        loadChildren: () => import('./preguntados/preguntados.module')
        .then((m) => m.PreguntadosModule),
    },
    {
        path: 'word-scramble',
        loadChildren: () => import('./word-scramble/word-scramble.module')
        .then((m) => m.WordScrambleModule),
    },
    {
        path: 'login',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}