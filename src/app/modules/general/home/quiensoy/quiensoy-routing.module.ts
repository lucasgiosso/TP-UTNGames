import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuiensoyComponent } from "./quiensoy.component";

const routes : Routes = [
    {
        path: '',
        component: QuiensoyComponent,
    },
    // {
    //     path: 'wordscramble',
    //     loadChildren: () => import('./')
    //     .then((m) => m.WordScrambleModule),
    // },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuiensoyRoutingModule {}