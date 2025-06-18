import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskAddComponent } from '../task-add/task-add.component';
import { Task } from '../../../../core/models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,
            MatSlideToggleModule,
            MatButtonModule,
            MatDividerModule,
            MatIconModule,
            MatCardModule,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            TaskItemComponent,
            TaskAddComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

   tasks: Task[] = [
  {
    id: 1,
    title: 'Comprar leite',
    done: false,
    createDt: new Date('2025-06-01T08:00:00'),
    updateDt: new Date('2025-06-01T08:00:00')
  },
  {
    id: 2,
    title: 'Revisar pull request',
    done: true,
    createDt: new Date('2025-06-05T10:30:00'),
    updateDt: new Date('2025-06-10T12:00:00')
  },
  {
    id: 3,
    title: 'Estudar Angular Material',
    done: false,
    createDt: new Date('2025-06-12T09:15:00'),
    updateDt: new Date('2025-06-12T09:15:00')
  },
  {
    id: 4,
    title: 'Pagar contas do mês',
    done: true,
    createDt: new Date('2025-06-02T15:45:00'),
    updateDt: new Date('2025-06-02T16:00:00')
  }
];


  /* exclusão da tarefa */
  onDeleteTask(taskId: number): void {
  if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}
}
