import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-autenticacao',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    NgxMaskDirective

  ],
  providers: [provideNgxMask()],
  templateUrl: './autenticacao.component.html',
  styleUrl: './autenticacao.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AutenticacaoComponent {
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

  textoAuxiliar: string = 'Informe o código enviado para o e-mail joao.silva@email.com.br';


}
