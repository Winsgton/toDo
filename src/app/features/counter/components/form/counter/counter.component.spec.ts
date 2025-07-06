import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';

fdescribe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve incrementar e decrementar o valor', () => {
    const comp = fixture.componentInstance;

    comp.increment();
    expect(comp.value).toBe(1);

    comp.decrement();
    expect(comp.value).toBe(0);
  });

  it('deve exibir valor no template', () => {
    fixture.detectChanges();
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    console.log(h1)
    expect(h1.textContent).toBe('0');
  });

  it('não deve cair abaixo de 0 e mostra mensagem', () => {
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#decrement')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe(0);
    const p = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.textContent).toContain('Mínimo');
  });

  it('não deve ultrapassar 5 e mostra mensagem', () => {
    const comp = fixture.componentInstance;
    comp.value = 5;
    fixture.detectChanges();

    fixture.debugElement.query(By.css('#increment')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(comp.value).toBe(5);
    const p = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.textContent).toContain('Máximo');
  });

});
