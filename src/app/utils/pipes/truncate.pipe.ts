import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  /* função para agir na interpolação de variáveis | pipe */
  transform(value: string, limit: number = 100, suffix = '...'): string {
    if (!value) return '';

    if (value.length <= limit){
      return value;
    }

    // corta espaço no início e final
    return value.substring(0, limit).trim() + suffix;
  }

}
