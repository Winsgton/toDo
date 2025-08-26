import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreConsultaComponent } from './pre-consulta.component';

describe('PreConsultaComponent', () => {
  let component: PreConsultaComponent;
  let fixture: ComponentFixture<PreConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
