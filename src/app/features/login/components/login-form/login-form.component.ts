import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatFormFieldModule,
            MatInputModule,
            MatCardModule,
            MatButtonModule, MatDividerModule, MatIconModule,
            ReactiveFormsModule,
            RouterModule,
            CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService){
  }

  ngOnInit(){
      this.loginForm = this.fb.group({
        user: ['', [Validators.required]],
        password: ['', Validators.required]
      });
  }

  onSubmit(): void{
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    const { user, password } = this.loginForm.value;

    // busca no service para saber se tá certo.
    if (user === '123' && password === '123'){
      this.auth.login('fake-token');
      this.router.navigate(['']);
    }else{
      alert('erro');
    }
  }

}
