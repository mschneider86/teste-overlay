import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OverlayService, OverlayState } from '../../services/overlay.service';
import { Tramitacao } from '../tramitacao-overlay/tramitacao-overlay.component';

@Component({
  selector: 'app-global-overlay',
  templateUrl: './global-overlay.component.html',
  styleUrls: ['./global-overlay.component.css']
})
export class GlobalOverlayComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  overlayState: OverlayState = { isVisible: false, type: null };

  constructor(private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.overlayService.getOverlayState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.overlayState = state;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTramitacaoClose(): void {
    this.overlayService.closeTramitacaoOverlay();
  }

  onTramitacaoSave(event: any): void {
    const tramitacao = event as Tramitacao;
    this.overlayService.addTramitacao(tramitacao);
    this.overlayService.clearFormData(); // Limpa os dados do formulário após salvar
    this.overlayService.closeTramitacaoOverlay();
  }
}