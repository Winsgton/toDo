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
        titulo: 'Tarefa 1',
        feito: false,
        criadoEm: new Date('2024-01-15'),
        atualizadoEm: new Date('2024-01-15'),
      },
      {
        id: 2,
        titulo: 'Tarefa 2',
        feito: true,
        criadoEm: new Date('2024-01-14'),
        atualizadoEm: new Date('2024-01-16'),
      },
    ];
    return { tasks };
  }

  /* Gera IDs únicos para novas tarefas */
  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
  }
}
