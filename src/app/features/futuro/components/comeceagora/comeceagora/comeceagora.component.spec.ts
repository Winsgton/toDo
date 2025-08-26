import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComeceagoraComponent } from './comeceagora.component';

describe('ComeceagoraComponent', () => {
  let component: ComeceagoraComponent;
  let fixture: ComponentFixture<ComeceagoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComeceagoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComeceagoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
