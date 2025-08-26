import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-simulacao',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMaskDirective,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatCardModule

  ],
  providers: [provideNgxMask()],
  templateUrl: './simulacao.component.html',
  styleUrl: './simulacao.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SimulacaoComponent {
  pTipo: number = 1;
  pSimula: boolean = false;
  tituloSelecionado: string =
    this.pTipo == 1
      ? 'Servidor Público Municipal'
      : 'CLT de empresa conveniada';
  tituloSelecionado2: string =
    this.pTipo == 1
      ? 'Prefeitura de Itapólis'
      : 'Outro texto';
}
