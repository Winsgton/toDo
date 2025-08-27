import {
  Component,
  ChangeDetectorRef,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
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
import { Observable, of, switchMap, take, finalize } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TaskItemComponent,
    TaskAddComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  editingTask: Task | null = null;
  tasks$: Observable<Task[]>;

  constructor(
    private cdr: ChangeDetectorRef,
    private taskService: TaskService
  ) {
    this.tasks$ = this.taskService.getTasks();
  }

  ngOnInit() {
    /* Carrega as tarefas no início da instância */
    this.tasks$ = this.taskService.getTasks();
  }

  /* exclusão da tarefa */
  onDeleteTask(taskId: number): void {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          console.log('Tarefa excluída:', taskId);
          // A lista já foi atualizada automaticamente pelo BehaviorSubject
        },
        error: (err) => console.error('Erro ao excluir:', err),
      });
    }
  }

  /* marcar/desmarcar tarefa realizada */
  onToggleComplete(taskId: number): void {
    this.taskService.updateTaskfeito(taskId).subscribe({
      next: (atualizadoEmask) => {
        console.log('Tarefa atualizada:', atualizadoEmask);
        // A lista já foi atualizada automaticamente pelo BehaviorSubject
      },
      error: (err) => console.error('Erro ao atualizar:', err),
    });
  }

  /* editar tarefa */
  onEditTask(task: Task): void {
    // apenas informa o elemento para edição  (evento para o seletor do formulário)
    this.editingTask = { ...task };
  }

  /* confirmação de tarefa (envio do formulário) */
  onTaskSubmit(submittedTask: Partial<Task>): void {
    // Se o objeto recebido tem um ID, é uma ATUALIZAÇÃO
    if (submittedTask.id) {
      this.taskService
        .getTaskById(submittedTask.id)
        .pipe(
          take(1),
          switchMap((existingTask) => {
            if (!existingTask) {
              throw new Error('Tarefa não encontrada');
            }

            // Só atualiza se o título mudou
            if (
              submittedTask.titulo &&
              submittedTask.titulo !== existingTask.titulo
            ) {
              const taskToUpdate = {
                ...existingTask,
                titulo: submittedTask.titulo,
                atualizadoEm: new Date(),
              };
              return this.taskService.updateTask(taskToUpdate);
            }
            return of(null); // Não atualiza se não houve mudanças
          }),
          finalize(() => {
            this.editingTask = null;
          })
        )
        .subscribe({
          next: (atualizadoEmask) => {
            if (atualizadoEmask) {
              console.log('Tarefa atualizada:', atualizadoEmask);
              // A lista já foi atualizada automaticamente pelo BehaviorSubject
            }
          },
          error: (err) => console.error('Erro:', err),
        });
    } else {
      // Se não tem ID, é uma ADIÇÃO de nova tarefa
      const newTask: Partial<Task> = {
        titulo: submittedTask.titulo || '',
        feito: submittedTask.feito || false,
      };

      this.taskService
        .addTask(newTask)
        .pipe(
          finalize(() => {
            this.editingTask = null;
          })
        )
        .subscribe({
          next: (newTask) => {
            console.log('Tarefa criada:', newTask);
            // Não precisa atualizar manualmente, o BehaviorSubject já cuidou disso
          },
          error: (err) => console.error('Erro ao criar tarefa:', err),
        });
    }
  }
}
