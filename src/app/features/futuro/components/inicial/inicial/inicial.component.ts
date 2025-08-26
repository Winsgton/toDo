import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-inicial',
  imports: [MatCardModule, MatButtonModule],
  standalone: true,
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.css'
})
export class InicialComponent {

  title1: string = 'SEU CONSIGNADO';
  title2: string = 'com as melhores taxas, direto na folha!';
  title3: string = 'Servidor público ou CLT conveniado?';
}
