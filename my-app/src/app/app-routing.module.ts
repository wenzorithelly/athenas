import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaManagerComponent } from "./pessoa-manager/pessoa-manager.component";

const routes: Routes = [
  { path: 'pessoa-manager', component: PessoaManagerComponent },
  { path: '', redirectTo: '/pessoa-manager', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
