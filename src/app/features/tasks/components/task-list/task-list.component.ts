import {
  Component,
  ChangeDetectorRef,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
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
import { PaginatedResponse } from '../../../../shared/models/paginated-response.model';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { Observable, of, switchMap, take, finalize, Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { PaginationComponent } from '../../../../shared/ux-components/pagination/pagination.component';

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
    PaginationComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, OnDestroy {
  editingTask: Task | null = null;
  tasksPaginated$: Observable<PaginatedResponse<Task>>;
  currentPage: number = 1;
  perPage: number = 5;
  searchFilter: string = '';
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(
    private cdr: ChangeDetectorRef,
    private taskService: TaskService
  ) {
    this.tasksPaginated$ = this.taskService.getTasksPaginated(this.currentPage, this.perPage, this.searchFilter);
  }

  ngOnInit() {
    // Escuta mudanças nas tarefas - o tasksSubject é atualizado em todas as operações CRUD
    this.taskService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadTasks();
        this.cdr.markForCheck();
      });

    // Configura debounce para a busca (aguarda 300ms após parar de digitar)
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((searchTerm) => {
        this.searchFilter = searchTerm;
        this.currentPage = 1; // Reset para primeira página quando buscar
        this.loadTasks();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadTasks() {
    this.tasksPaginated$ = this.taskService.getTasksPaginated(this.currentPage, this.perPage, this.searchFilter);
    this.cdr.markForCheck(); // Força change detection
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadTasks();
  }

  onPerPageChange(perPage: number) {
    this.perPage = perPage;
    this.currentPage = 1; // Reset to first page when changing perPage
    this.loadTasks();
  }

  onSearch(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  onClearSearch() {
    this.searchFilter = '';
    this.searchSubject.next('');
  }

  /* exclusão da tarefa */
  onDeleteTask(taskId: number): void {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          console.log('Tarefa excluída:', taskId);
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
          },
          error: (err) => console.error('Erro ao criar tarefa:', err),
        });
    }
  }
}

