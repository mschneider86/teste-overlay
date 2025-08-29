import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessCadastroComponent } from './process/process-cadastro/process-cadastro.component';

const routes: Routes = [
  { path: '', redirectTo: '/process', pathMatch: 'full' },
  { path: 'process', component: ProcessCadastroComponent },
  { path: '**', redirectTo: '/process' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
