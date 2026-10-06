import { Component, inject, signal } from '@angular/core';
import { Auth } from '../service/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router);
  private authService = inject(Auth);

  email = '';
  password = '';
  loading = signal(false)
  errorMessage = signal('');

  onSubmit() {
    if(!this.email || !this.password) return;
    this.loading.set(true)
    this.errorMessage.set('')
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/accueil'])
        alert('Connecté')
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Échec de la connexion. Vérifie ton email et mot de passe.')
      }
    });
  }
}
