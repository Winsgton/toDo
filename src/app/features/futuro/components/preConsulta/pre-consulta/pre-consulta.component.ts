import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

interface Option {
  id: number;
  name: string;
}

@Component({
  selector: 'app-pre-consulta',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './pre-consulta.component.html',
  styleUrl: './pre-consulta.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PreConsultaComponent implements OnInit {
  pTipo: number = 2;
  tituloSelecionado: string = (this.pTipo==1)?'Servidor Público Municipal':' CLT de empresa conveniada';
  perguntaServidor: string = (this.pTipo==1)?'Qual órgão municipal?':'Qual o CNPJ da empresa?';
  myControl = new FormControl('');
  searchControl = new FormControl('');
  options: Option[] = [
    { id: 1, name: 'Prefeitura de Itapira' },
    { id: 2, name: 'Prefeitura de Itapetininga' },
    { id: 3, name: 'Prefeitura de Itapeva' },
    { id: 4, name: 'Prefeitura de Itapolis' },
  ];
  filteredOptions!: Observable<Option[]>;

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
