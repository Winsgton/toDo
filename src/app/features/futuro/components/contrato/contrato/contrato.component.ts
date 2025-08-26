import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-contrato',
  imports: [
    // Módulos Angular Material
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonToggleModule, MatCheckboxModule,
    MatSelectModule,

    // Módulos de formulários
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './contrato.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './contrato.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ContratoComponent {
  subTitle1: string = 'Sua simulação em 1 minuto';
  nomeControl = new FormControl('', [Validators.required]);
  toppings = new FormControl('');
  toppingList: string[] = ['Servidor Público Federal','Servidor Forças Armadas', 'Servidor Público Estadual', 'Servidor Público Municipal','CLT em empresa conveniada'];
}
