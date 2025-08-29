import { Component, OnInit, OnDestroy } from '@angular/core';
import { OverlayService } from '../../shared/services/overlay.service';
import { Subject, takeUntil } from 'rxjs';
import { Tramitacao } from '../../shared/components/tramitacao-overlay/tramitacao-overlay.component';

@Component({
  selector: 'app-process-cadastro',
  templateUrl: './process-cadastro.component.html',
  styleUrls: ['./process-cadastro.component.css']
})
export class ProcessCadastroComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  tramitacoes: Tramitacao[] = [];

  constructor(
    private overlayService: OverlayService
  ) { }

  ngOnInit(): void {
    this.subscribeToTramitacoes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToTramitacoes(): void {
    this.overlayService.getTramitacoes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(tramitacoes => {
        this.tramitacoes = tramitacoes;
      });
  }

  openTramitacaoOverlay(): void {
    this.overlayService.openTramitacaoOverlay();
  }
}
