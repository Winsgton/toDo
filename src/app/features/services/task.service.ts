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
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  tasksUrl = 'api/tasks';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  /* Obtém todas as tarefas 'via api' do mock */
  private loadTasks(): void {
    this.http
      .get<Task[]>(this.tasksUrl)
      .pipe(
        tap((tasks) =>
          console.log('Tarefas carregadas:', tasks)
      ),
        catchError(this.handleError<Task[]>('loadTasks', []))
      )
      .subscribe({
        next: (tasks) => this.tasksSubject.next(tasks),
        error: (err) => console.error('Erro ao carregar tarefas:', err),
      });
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
  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    // console.log('estou no service');
    // console.log(task);

    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
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
    const url = `${this.tasksUrl}/${task.id}`;

    return this.http.put<Task>(url, task, this.httpOptions).pipe(
      tap((updatedTask) => {
        // Se a resposta for null, usa o próprio objeto enviado:
        const newTask = updatedTask || task;
        const currentTasks = this.tasksSubject.value;
        const updatedTasks = currentTasks.map((t) =>
          t.id === task.id ? newTask : t
        );
        this.tasksSubject.next(updatedTasks);
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
  updateTaskDone(id: number): Observable<Task> {
    return this.getTaskById(id).pipe(
      take(1),
      switchMap((task) => {
        if (!task) throw new Error('Tarefa não encontrada');
        const updatedTask: Task = {
          ...task,
          done: !task.done,
          updateDt: new Date(),
        };
        return this.updateTask(updatedTask);
      }),
      catchError(this.handleError<Task>('toggleTaskCompletion'))
    );
  }

  /* exclui tarefa */
  deleteTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;

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
