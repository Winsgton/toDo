import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() { }

  /* Carrega tarefas iniciais */
  loadInitialTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
  }

  /* Adiciona ou atualiza uma tarefa */
  saveTask(task: Task) {
    const currentTasks = this.tasksSubject.getValue();
    const existingTaskIndex = currentTasks.findIndex(t => t.id === task.id);

    if (existingTaskIndex >= 0) {
      // Atualiza tarefa existente
      const updatedTasks = [...currentTasks];
      updatedTasks[existingTaskIndex] = {
        ...task,
        updateDt: new Date()
      };
      this.tasksSubject.next(updatedTasks);
    } else {
      // Adiciona nova tarefa
      const newTask: Task = {
        ...task,
        id: Date.now(),
        createDt: new Date(),
        updateDt: new Date()
      };
      this.tasksSubject.next([...currentTasks, newTask]);
    }
  }

}
