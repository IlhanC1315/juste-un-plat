import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../service/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  email = '';
  password = '';
  alias = '';
  userName = '';
  dateOfBirth = '';
  message = '';
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http : HttpClient, private auth : Auth, private router : Router) {}

  onSubmit() {
    this.auth
      .register(this.email, this.password, this.alias, this.userName, this.dateOfBirth)
      .subscribe({
        next: () => {
          this.message = 'Compte créé avec succès. Redirection...'
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (err) => {
          this.message = err.error?.message || "Erreur lors de l'inscription.";
        }
      });
  }
}
