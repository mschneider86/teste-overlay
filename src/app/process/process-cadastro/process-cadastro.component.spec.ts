import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCadastroComponent } from './process-cadastro.component';

describe('ProcessCadastroComponent', () => {
  let component: ProcessCadastroComponent;
  let fixture: ComponentFixture<ProcessCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
