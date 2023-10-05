import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WordScrambleComponent } from "./word-scramble.component";

const routes : Routes = [
    {
        path: '',
        component: WordScrambleComponent,
    },
    {
        path: 'word-scramble',
        loadChildren: () => import('./word-scramble.module')
        .then((m) => m.WordScrambleModule),
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WordScrambleRoutingModule {}