import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { TaskListComponent } from './features/tasks/components/task-list/task-list.component';
//import { LoginFormComponent } from './features/login/components/login-form/login-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
           // TaskListComponent
          ]
            ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'toDo';
}
