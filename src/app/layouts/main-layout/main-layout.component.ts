import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../core/services/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,
            MatToolbarModule, MatButtonModule, MatIconModule,
            MatSidenavModule, MatListModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})

export class MainLayoutComponent {

  menuAberto = false;

  constructor(private authService: AuthService, private router: Router){}

  logout(): void {
    console.log('fui acionado');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  routerCounter(): void{
    this.router.navigate(['/counter']);

  }

}
