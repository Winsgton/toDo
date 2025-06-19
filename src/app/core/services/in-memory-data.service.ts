import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  /* cria o mock de dados para a aplicação */
  createDb() {
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Tarefa 1',
        done: false,
        createDt: new Date('2024-01-15'),
        updateDt: new Date('2024-01-15'),
      },
      {
        id: 2,
        title: 'Tarefa 2',
        done: true,
        createDt: new Date('2024-01-14'),
        updateDt: new Date('2024-01-16'),
      },
    ];
    return { tasks };
  }

  /* Gera IDs únicos para novas tarefas */
  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
  }
}
