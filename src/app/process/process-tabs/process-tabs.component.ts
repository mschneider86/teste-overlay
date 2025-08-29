import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Tramitacao } from '../../shared/components/tramitacao-overlay/tramitacao-overlay.component';
import { OverlayService } from '../../shared/services/overlay.service';

@Component({
  selector: 'app-process-tabs',
  templateUrl: './process-tabs.component.html',
  styleUrls: ['./process-tabs.component.css']
})
export class ProcessTabsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  tramitacoes$: Observable<Tramitacao[]>;

  constructor(private overlayService: OverlayService) {
    this.tramitacoes$ = this.overlayService.getTramitacoes();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
