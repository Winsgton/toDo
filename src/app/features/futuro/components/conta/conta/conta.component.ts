import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Observable, startWith, map } from 'rxjs';

interface Option {
  id: number;
  name: string;
}

@Component({
  selector: 'app-conta',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
    MatButtonModule, MatDividerModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ContaComponent implements OnInit {
  pTipo: number = 1;
  tituloSelecionado: string = (this.pTipo==1)?'Servidor Público Municipal':' CLT de empresa conveniada';
  perguntaServidor: string = (this.pTipo==1)?'Em qual conta quer receber?':'';
  myControl = new FormControl('');
  searchControl = new FormControl('');
  options: Option[] = [
    { id: 1, name: 'Banco do Brasil' },
    { id: 2, name: 'Banco Itaú' }
  ];
  filteredOptions!: Observable<Option[]>;
  tituloSelecionado2: string =
    this.pTipo == 1
      ? 'Prefeitura de Itapólis'
      : 'Outro texto';

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Option[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(option: Option): string {
    return option ? option.name : '';
  }
}
