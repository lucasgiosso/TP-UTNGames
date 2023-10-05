import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AhorcadoComponent } from "./ahorcado.component";

const routes : Routes = [
    {
        path: '',
        component: AhorcadoComponent,
    },
    {
        path: 'ahorcado',
        loadChildren: () => import('./ahorcado.module')
        .then((m) => m.AhorcadoModule),
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AhorcadoRoutingModule {}