import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitacaoOverlayComponent } from './tramitacao-overlay.component';

describe('TramitacaoOverlayComponent', () => {
  let component: TramitacaoOverlayComponent;
  let fixture: ComponentFixture<TramitacaoOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitacaoOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramitacaoOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
