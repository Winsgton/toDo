import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
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
import { TaskService } from '../../../services/task.service';
import { BehaviorSubject } from 'rxjs';

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
export class TaskListComponent implements OnInit {

  editingTask: Task | null = null;
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

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

  

  constructor(private cdr: ChangeDetectorRef, private taskService: TaskService) { 
    
  }

   ngOnInit() {
    this.taskService.loadInitialTasks(this.tasks);

    /* Assina as atualizações do estado */
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });

    this.tasks$ = this.taskService.tasks$;
   }
  

  /* exclusão da tarefa */
  onDeleteTask(taskId: number): void {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
  }
  /* marcar/desmarcar tarefa realizada */
  onToggleComplete(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.done = !task.done;  
      task.updateDt = new Date(); 
    }
  }

  /* editar tarefa */
  onEditTask(task: Task): void {
    console.log('edição no list')
    console.log(task)

    this.editingTask = { ...task };

  }

  /* confirmação de tarefa (envio) */
  onTaskSubmit(submittedTask: Partial<Task>): void {
    // Se o objeto recebido tem um ID, é uma ATUALIZAÇÃO
    if (submittedTask.id) {
      const index = this.tasks.findIndex(t => t.id === submittedTask.id);
      if (index !== -1) {
        // Atualiza a tarefa na lista
        this.tasks[index] = {
          ...this.tasks[index],   // Mantém propriedades originais como createDt
          ...submittedTask,       // Sobrescreve com os dados do formulário (title, done)
          updateDt: new Date()    // Atualiza a data de modificação
        };
      }
    } else {
      // Se não tem ID, é uma ADIÇÃO de nova tarefa
      const newId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
      const newTask: Task = {
        id: newId,
        title: submittedTask.title || '',
        done: submittedTask.done || false,
        createDt: new Date(),
        updateDt: new Date()
      };
      this.tasks.push(newTask);
    }

    this.editingTask = null;
    this.cdr.detectChanges();

  }



}
