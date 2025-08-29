import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { ProcessCadastroComponent } from './process-cadastro/process-cadastro.component';
import { ProcessTabsComponent } from './process-tabs/process-tabs.component';
import { TramitacaoOverlayComponent } from './tramitacao-overlay/tramitacao-overlay.component';

@NgModule({
  declarations: [
    ProcessCadastroComponent,
    ProcessTabsComponent,
    TramitacaoOverlayComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule
  ],
  exports: [
    ProcessCadastroComponent,
    TramitacaoOverlayComponent
  ]
})
export class ProcessModule { }
