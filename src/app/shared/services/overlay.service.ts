import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tramitacao } from '../components/tramitacao-overlay/tramitacao-overlay.component';

export interface OverlayState {
  isVisible: boolean;
  type: 'tramitacao' | null;
  data?: any;
  formData?: any;
}

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private overlayState$ = new BehaviorSubject<OverlayState>({
    isVisible: false,
    type: null
  });

  private tramitacoes$ = new BehaviorSubject<Tramitacao[]>([]);

  constructor() { }

  // Observables públicos
  getOverlayState(): Observable<OverlayState> {
    return this.overlayState$.asObservable();
  }

  getTramitacoes(): Observable<Tramitacao[]> {
    return this.tramitacoes$.asObservable();
  }

  // Métodos para controlar o overlay de tramitação
  openTramitacaoOverlay(): void {
    const currentState = this.overlayState$.value;
    this.overlayState$.next({
      isVisible: true,
      type: 'tramitacao',
      formData: currentState.formData // Preserva os dados do formulário
    });
  }

  closeTramitacaoOverlay(): void {
    const currentState = this.overlayState$.value;
    this.overlayState$.next({
      isVisible: false,
      type: null,
      formData: currentState.formData // Preserva os dados do formulário mesmo quando fechado
    });
  }

  // Método para salvar dados do formulário
  saveFormData(formData: any): void {
    const currentState = this.overlayState$.value;
    this.overlayState$.next({
      ...currentState,
      formData: formData
    });
  }

  // Método para limpar dados do formulário
  clearFormData(): void {
    const currentState = this.overlayState$.value;
    this.overlayState$.next({
      ...currentState,
      formData: null
    });
  }

  // Métodos para gerenciar tramitações
  addTramitacao(tramitacao: Tramitacao): void {
    const currentTramitacoes = this.tramitacoes$.value;
    this.tramitacoes$.next([...currentTramitacoes, tramitacao]);
  }

  getTramitacoesValue(): Tramitacao[] {
    return this.tramitacoes$.value;
  }

  setTramitacoes(tramitacoes: Tramitacao[]): void {
    this.tramitacoes$.next(tramitacoes);
  }
}