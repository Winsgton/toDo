import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,
            MatDividerModule, MatIconModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  value = 0;
  message: string = '';

  increment(): void{
    if (this.value<5){
      this.value++;
      this.message = ''
    }else{
      this.message = 'Máximo alcançado!';
    }
  }

  decrement() {
    if (this.value > 0) {
      this.value--;
      this.message = '';
    } else {
      this.message = 'Mínimo alcançado!';
    }
  }
}
