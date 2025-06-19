import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  /* função da diretiva de autofoco */
  ngAfterViewInit(): void {
    // O foco precisa ser feito após o elemento estar no DOM
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }

}
