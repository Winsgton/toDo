import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Task } from '../../core/models/task.model';
import { PaginatedResponse } from '../../shared/models/paginated-response.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  tasksUrlBase = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  /* Obtém todas as tarefas 'via api' do mock */
  private loadTasks(): void {
    this.getTasksPaginated(1, 10).subscribe({
      next: (response) => {
        // Se o backend retornar um objeto paginado, pegue os dados
        const tasks = Array.isArray(response) ? response : response?.data || [];
        this.tasksSubject.next(tasks);
        console.log('Tarefas carregadas:', tasks);
      },
      error: (err) => console.error('Erro ao carregar tarefas:', err),
    });
  }

  /** Busca tarefas paginadas via API */
  getTasksPaginated(page: number, perPage: number): Observable<PaginatedResponse<Task>> {
    const params = new HttpParams()
      .set('page', page)
      .set('per_page', perPage);
    return this.http
      .get<PaginatedResponse<Task>>(`${this.tasksUrlBase}/task/listar`, { params })
      .pipe(
        // NÃO atualiza o tasksSubject aqui para evitar ciclo infinito
        catchError(this.handleError<PaginatedResponse<Task>>('getTasksPaginated', { data: [], total: 0, page, perPage }))
      );
  }

  /* Obtém todas as tarefas */
  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /* Adiciona uma tarefa */
  addTask(task: Partial<Task>): Observable<Task> {
    return this.http
      .post<Task>(`${this.tasksUrlBase}/task`, task, this.httpOptions)
      .pipe(
        tap((newTask) => {
          console.log('Tarefa adicionada com sucesso:', newTask);
          // Atualiza a lista de tarefas com a nova tarefa
          const currentTasks = this.tasksSubject.value;
          this.tasksSubject.next([...currentTasks, newTask]);
        }),
        catchError(this.handleError<Task>('addTask'))
      );
  }

  /* atualiza tarefa */
  updateTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrlBase}/task/${task.id}`;

    return this.http.patch<Task>(url, task, this.httpOptions).pipe(
      tap((atualizadoEmask) => {
        // Se a resposta for null, usa o próprio objeto enviado:
        const newTask = atualizadoEmask || task;
        const currentTasks = this.tasksSubject.value;
        const atualizadoEmasks = currentTasks.map((t) =>
          t.id === task.id ? newTask : t
        );
        this.tasksSubject.next(atualizadoEmasks);
      }),
      catchError(this.handleError<Task>('updateTask'))
    );
  }

  /* obtém tarefa por id*/
  getTaskById(id: number): Observable<Task | undefined> {
    return this.tasks$.pipe(
      map((tasks: any[]) => tasks.find((task) => task.id === id))
    );
  }

  /* atualiza conclusão/reversão de conclusão da tarefa */
  updateTaskfeito(id: number): Observable<Task> {
    return this.getTaskById(id).pipe(
      take(1),
      switchMap((task) => {
        if (!task) throw new Error('Tarefa não encontrada');
        const atualizadoEmask: Task = {
          ...task,
          feito: !task.feito,
          atualizadoEm: new Date(),
        };
        return this.updateTask(atualizadoEmask);
      }),
      catchError(this.handleError<Task>('toggleTaskCompletion'))
    );
  }

  /* exclui tarefa */
  deleteTask(id: number): Observable<Task> {
    const url = `${this.tasksUrlBase}/task/${id}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(() => {
        console.log('Tarefa deletada:', id);
        const currentTasks = this.tasksSubject.value;
        const filteredTasks = currentTasks.filter((task) => task.id !== id);
        this.tasksSubject.next(filteredTasks);
      }),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }
}

