import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-comeceagora',
  imports: [
    // Módulos Angular Material
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatError,
    MatDatepickerModule,
    MatButtonToggleModule, MatCheckboxModule,
    MatSelectModule,

    // Módulos de formulários
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './comeceagora.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './comeceagora.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ComeceagoraComponent {
  subTitle1: string = 'Sua simulação em 1 minuto';
  nomeControl = new FormControl('', [Validators.required]);
  toppings = new FormControl('');
  toppingList: string[] = ['Servidor Público Federal','Servidor Forças Armadas', 'Servidor Público Estadual', 'Servidor Público Municipal','CLT em empresa conveniada'];
}
