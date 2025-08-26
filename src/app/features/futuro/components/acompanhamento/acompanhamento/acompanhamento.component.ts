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
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-acompanhamento',
  standalone: true,
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
    MatMenuModule,
    MatProgressBarModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './acompanhamento.component.html',
  styleUrl: './acompanhamento.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AcompanhamentoComponent {
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
