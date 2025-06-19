import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../../../../core/models/task.model';
import { CommonModule } from '@angular/common';
import { AutofocusDirective } from '../../../../utils/directives/autofocus.directive';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    AutofocusDirective
  ],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskAddComponent implements OnInit, OnChanges {
  @Input() task: Task | null = null;
  @Output() taskSubmit = new EventEmitter<Partial<Task>>();

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  /* inicia o formulário */
  ngOnInit(): void {
    this.initForm();
  }

  /* detecta mudança/alterações */
 ngOnChanges(changes: SimpleChanges): void {
    if (this.task && changes['task']) {
      this.taskForm.patchValue({
        title: this.task.title,
        done: this.task.done
      });
    }
  }

  /* inicia formulário reativo */
  private initForm(): void {
    this.taskForm = this.fb.group({
      title: [
        this.task?.title || '' ,
        [Validators.required, Validators.minLength(3)],
      ],
      done: [this.task?.done || false],
    });
  }

  /* envio do formulário */
  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData: Partial<Task> = {
        id: this.task?.id,
        ...this.taskForm.value
      };

      this.taskSubmit.emit(taskData);
      this.taskForm.reset({
        title: '',
        done: false
      });
    }
  }

}
