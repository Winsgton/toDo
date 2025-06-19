import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../core/models/task.model';
import { TruncatePipe } from '../../../../utils/pipes/truncate.pipe';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TruncatePipe
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();
  @Output() toggleComplete = new EventEmitter<number>();


  /* aciona evento de saída: exclusão */
  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  /* aciona o evento de saída: tarefa feita [done] */
  onToggleComplete(): void {
    console.log('1');
    this.toggleComplete.emit(this.task.id);
  }

  /* aciona o evento de saída: edição */
  onEdit(): void {
    this.edit.emit(this.task);
  }
}
