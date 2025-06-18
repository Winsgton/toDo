import { Component, Input, OnInit } from '@angular/core';
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
  ],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css',
})
export class TaskAddComponent implements OnInit {
  @Input() task: Task | null = null;

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  /*inicia formulário*/
  private initForm(): void {
    this.taskForm = this.fb.group({
      title: [
        this.task?.title || '',
        [Validators.required, Validators.minLength(3)],
      ],
      done: [this.task?.done || false],
    });
  }

  /*envio do formulário*/
  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      this.taskForm.reset();
    } else {
    }
  }
}
