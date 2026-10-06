import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:3000/api';
  private router = inject(Router);
  private http = inject(HttpClient);

  // Signal qui stocke l'état de connexion
  isLoggedIn = signal(this.hasValidToken());

  // Ajout du BehaviorSubject pour gérer les données utilisateur
  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  // Getter pour l'utilisateur actuel
  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  constructor() {
    // Charger les données utilisateur au démarrage si connecté
    if (this.hasValidToken() && !this.currentUserSubject.value) {
      this.loadUserProfile();
    }
  }

  // Méthode pour récupérer l'utilisateur du localStorage
  private getUserFromStorage(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  // Méthode pour sauvegarder l'utilisateur
  private saveUserToStorage(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Charger le profil utilisateur
  private loadUserProfile(): void {
    this.getProfile().subscribe({
      next: (data: any) => {
        this.updateUserData(data.user);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil:', err);
      }
    });
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string, user: any }>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          // Stocke le JWT et les données utilisateur
          localStorage.setItem('token', response.token);
          this.isLoggedIn.set(true);

          // Si le backend renvoie les données utilisateur
          if (response.user) {
            this.updateUserData(response.user);
          } else {
            // Sinon, charger le profil
            this.loadUserProfile();
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Supprimer aussi les données utilisateur
    this.isLoggedIn.set(false);
    this.currentUserSubject.next(null); // Réinitialiser le subject
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  register(email: string, password: string, alias: string, userName: string, dateOfBirth: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, {
      email,
      password,
      alias,
      userName,
      dateOfBirth,
    });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/me`).pipe(
      tap((response: any) => {
        // Mettre à jour automatiquement les données utilisateur
        if (response.user) {
          this.updateUserData(response.user);
        }
      })
    );
  }

  uploadProfileImage(userId: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/upload-profile/${userId}`, formData).pipe(
      tap((response: any) => {
        // Mettre à jour automatiquement après upload
        if (response.user) {
          this.updateUserData(response.user);
        }
      })
    );
  }

  // Méthode corrigée pour mettre à jour les données utilisateur
  updateUserData(userData: any): void {
    // Mettre à jour le BehaviorSubject
    this.currentUserSubject.next(userData);
    // Sauvegarder dans le localStorage
    this.saveUserToStorage(userData);
  }

  // Méthode pour forcer le rechargement du profil
  refreshProfile(): Observable<any> {
    return this.getProfile();
  }
}

