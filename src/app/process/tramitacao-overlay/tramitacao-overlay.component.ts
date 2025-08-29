import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tramitacao } from '../../shared/components/tramitacao-overlay/tramitacao-overlay.component';

@Component({
  selector: 'app-tramitacao-overlay',
  templateUrl: './tramitacao-overlay.component.html',
  styleUrls: ['./tramitacao-overlay.component.css']
})
export class TramitacaoOverlayComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Tramitacao>();

  tramitacaoForm: FormGroup;
  isSubmitting = false;
  tiposMovimentacao = [
    { value: 'audiencia', label: 'Audiência' },
    { value: 'sentenca', label: 'Sentença' },
    { value: 'despacho', label: 'Despacho' },
    { value: 'peticao', label: 'Petição' },
    { value: 'recurso', label: 'Recurso' },
    { value: 'intimacao', label: 'Intimação' },
    { value: 'juntada', label: 'Juntada de Documento' },
    { value: 'outros', label: 'Outros' }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.tramitacaoForm = this.formBuilder.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      responsavel: ['', [Validators.required]],
      observacoes: ['']
    });
  }

  ngOnInit(): void {
    // Define a data atual como padrão
    this.tramitacaoForm.patchValue({
      data: new Date()
    });
  }

  onSubmit(): void {
    if (this.tramitacaoForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const tramitacao: Tramitacao = {
        id: this.generateId(),
        data: this.tramitacaoForm.value.data,
        tipo: this.tramitacaoForm.value.tipo,
        descricao: this.tramitacaoForm.value.descricao,
        responsavel: this.tramitacaoForm.value.responsavel,
        observacoes: this.tramitacaoForm.value.observacoes
      };

      // Simula um pequeno delay para melhor UX
      setTimeout(() => {
        this.onSave.emit(tramitacao);
        this.isSubmitting = false;
      }, 500);
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.onClose.emit();
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.tramitacaoForm.controls).forEach(key => {
      const control = this.tramitacaoForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.tramitacaoForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} é obrigatório`;
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength']?.requiredLength;
      return `${this.getFieldLabel(fieldName)} deve ter pelo menos ${minLength} caracteres`;
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      data: 'Data da Tramitação',
      tipo: 'Tipo de Movimentação',
      descricao: 'Descrição',
      responsavel: 'Responsável'
    };
    return labels[fieldName] || fieldName;
  }
}
