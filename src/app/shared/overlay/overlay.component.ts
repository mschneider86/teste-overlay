import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
  animations: [
    trigger('overlayAnimation', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
        })
      ),
      transition('void => *', [animate('300ms ease-in')]),
      transition('* => void', [animate('200ms ease-out')]),
    ]),
    trigger('contentAnimation', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'scale(0.8) translateY(-20px)',
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
          transform: 'scale(1) translateY(0)',
        })
      ),
      transition('void => *', [
        animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)'),
      ]),
      transition('* => void', [animate('200ms ease-out')]),
    ]),
  ],
})
export class OverlayComponent implements OnInit {
  @Input() title: string = '';
  @Input() showCloseButton: boolean = true;
  @Input() closeOnBackdropClick: boolean = true;
  @Input() maxWidth: string = '600px';
  @Input() maxHeight: string = '80vh';
  @Input() draggable: boolean = true;

  @Output() onClose = new EventEmitter<void>();
  @ViewChild('overlayContent', { static: false }) overlayContent!: ElementRef;

  // Propriedades para drag and drop
  isDragging: boolean = false;
  dragOffset = { x: 0, y: 0 };
  currentPosition = { x: 0, y: 0 };
  private readonly mouseMoveHandler = this.onMouseMove.bind(this);
  private readonly mouseUpHandler = this.onMouseUp.bind(this);

  constructor(private readonly elementRef: ElementRef) {}

  ngOnInit(): void {
    // Foco automático no primeiro campo de input
    setTimeout(() => {
      const firstInput = this.elementRef.nativeElement.querySelector(
        'input, textarea, select'
      );
      if (firstInput) {
        firstInput.focus();
      }

      // Posicionar overlay no centro da tela se for draggable
      if (this.draggable) {
        this.centerOverlay();
      }
    }, 150);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    this.close();
  }

  onKeyPress(event: KeyboardEvent): void {
    // Handle key press events
    console.log('Key pressed:', event.key);
  }

  onKeyDown(event: KeyboardEvent): void {
    // Handle key down events
    console.log('Key down:', event.key);
  }

  onKeyUp(event: KeyboardEvent): void {
    // Handle key up events
    console.log('Key up:', event.key);
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdropClick && event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    this.onClose.emit();
  }

  onContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  // Métodos para drag and drop
  onHeaderMouseDown(event: MouseEvent): void {
    if (!this.draggable || !this.overlayContent) return;

    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;

    // Obter posição atual do elemento
    const rect = this.overlayContent.nativeElement.getBoundingClientRect();
    this.dragOffset.x = event.clientX - rect.left;
    this.dragOffset.y = event.clientY - rect.top;

    // Remover listeners existentes antes de adicionar novos
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);

    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging || !this.overlayContent) return;

    event.preventDefault();
    event.stopPropagation();

    const newX = event.clientX - this.dragOffset.x;
    const newY = event.clientY - this.dragOffset.y;

    // Limites da tela
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementWidth = this.overlayContent.nativeElement.offsetWidth;
    const elementHeight = this.overlayContent.nativeElement.offsetHeight;

    // Garantir que o overlay não saia da tela
    this.currentPosition.x = Math.max(
      0,
      Math.min(newX, windowWidth - elementWidth)
    );
    this.currentPosition.y = Math.max(
      0,
      Math.min(newY, windowHeight - elementHeight)
    );

    this.updatePosition();
  }

  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  }

  private updatePosition(): void {
    if (this.overlayContent) {
      this.overlayContent.nativeElement.style.left = `${this.currentPosition.x}px`;
      this.overlayContent.nativeElement.style.top = `${this.currentPosition.y}px`;
      this.overlayContent.nativeElement.style.transform = 'none';
    }
  }

  resetPosition(): void {
    this.centerOverlay();
  }

  private centerOverlay(): void {
    if (!this.overlayContent) return;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementWidth = this.overlayContent.nativeElement.offsetWidth;
    const elementHeight = this.overlayContent.nativeElement.offsetHeight;

    this.currentPosition.x = (windowWidth - elementWidth) / 2;
    this.currentPosition.y = (windowHeight - elementHeight) / 2;

    this.updatePosition();
  }
}
