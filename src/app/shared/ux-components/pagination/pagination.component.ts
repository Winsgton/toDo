import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSelectModule, MatFormFieldModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  // Inputs usando a nova sintaxe
  total = input<number>(0);
  page = input<number>(1);
  perPage = input<number>(10);

  // Outputs usando a nova sintaxe
  pageChange = output<number>();
  perPageChange = output<number>();

  // Opções de itens por página
  perPageOptions: number[] = [5, 10, 20, 50];

  // Computed signals para valores derivados
  totalPages = computed(() => Math.ceil(this.total() / this.perPage()));

  currentRange = computed(() => {
    const start = (this.page() - 1) * this.perPage() + 1;
    const end = Math.min(this.page() * this.perPage(), this.total()) ;
    return `${start}-${end} de ${this.total()}`;
  });

  pages = computed(() => {
    const pages: number[] = [];
    const totalPages = this.totalPages();
    const currentPage = this.page();

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5);
        pages.push(-1); // ellipsis
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push(-1); // ellipsis
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1); // ellipsis
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push(-1); // ellipsis
        pages.push(totalPages);
      }
    }

    if (pages.length === 0) pages.push(1);
    return pages;
  });

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.page()) {
      this.pageChange.emit(page);
    }
  }

  goToFirst(): void {
    this.goToPage(1);
  }

  goToPrevious(): void {
    this.goToPage(this.page() - 1);
  }

  goToNext(): void {
    this.goToPage(this.page() + 1);
  }

  goToLast(): void {
    this.goToPage(this.totalPages());
  }

  onPerPageChange(newPerPage: number): void {
    this.perPageChange.emit(newPerPage);
  }
}
