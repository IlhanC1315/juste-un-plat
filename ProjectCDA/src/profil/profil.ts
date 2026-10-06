import { Component, ElementRef, OnInit, ViewChild, HostListener, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Header } from "../header/header";
import { Injectable } from '@angular/core';
import { Auth } from '../service/auth';
import { CommonModule } from '@angular/common';
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recette, RecetteService } from '../service/recette-service';
import { RecipeCardApi } from "../recipe-card-api/recipe-card-api";

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [Header, CommonModule, NavigationBar, RouterModule, RecipeCardApi],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil implements OnInit, OnDestroy {
  showUserMenu = false;
  @ViewChild('userSettings') userSettings?: ElementRef;
  @ViewChild('profileImage') profileImage?: ElementRef;
  user: any = {};
  selectedFile: File | null = null;
  message: string = '';
  private userSubscription?: Subscription;
  recettes: Recette[] = [];
  loadingRecettes = true

  // ✅ Stocker l'URL de l'image avec timestamp stable
  profileImageUrl: string = 'assets/images/default-profile.png';

  constructor(
    private auth: Auth,
    private eRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private recetteService: RecetteService
  ) { }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  ngOnInit() {
    // ✅ S'abonner au flux réactif des données utilisateur
    this.userSubscription = this.auth.currentUser$.subscribe(user => {
      if (user) {
        this.user = user;
        console.log('User data updated:', this.user);
        // ✅ Mettre à jour l'URL de l'image quand les données changent
        this.updateProfileImageUrl();
        this.cdr.detectChanges();
      }
    });

    // ✅ Charger le profil si pas encore chargé
    if (!this.auth.currentUserValue) {
      this.auth.getProfile().subscribe({
        next: (data: any) => {
          // Les données seront automatiquement mises à jour via le subscription
        },
        error: (err) => console.error(err)
      });
    }

    const userId = this.auth.currentUserValue?._id;
    if (userId) {
      this.loadRecettes(userId)
    }

    this.userSubscription = this.auth.currentUser$.subscribe(user => {
      if (user) {
        this.user = user;
        this.updateProfileImageUrl();
        this.cdr.detectChanges();
        this.loadRecettes(user._id);
      }
    });
  }

  loadRecettes(userId: string) {
    this.loadingRecettes = true;
    console.log("Chargement des recettes pour userId :", userId);
    this.recetteService.getRecettesByUser(userId).subscribe({
      next: (data) => {
        console.log("Recettes récupérées :", data);
        this.recettes = data;
        this.loadingRecettes = false;
      },
      error: (err) => {
        console.error("Erreur chargement recettes :", err);
        this.loadingRecettes = false;
      }
    });
  }


  ngOnDestroy() {
    // ✅ Se désabonner pour éviter les fuites mémoire
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // ✅ Méthode pour mettre à jour l'URL de l'image (appelée uniquement quand nécessaire)
  private updateProfileImageUrl(): void {
    if (this.user.profileImage) {
      const timestamp = new Date().getTime();
      const baseUrl = 'http://localhost:3000';

      if (this.user.profileImage.startsWith('/uploads/')) {
        this.profileImageUrl = `${baseUrl}${this.user.profileImage}?t=${timestamp}`;
      } else {
        this.profileImageUrl = `${baseUrl}/uploads/users/${this.user.profileImage}?t=${timestamp}`;
      }
    } else {
      this.profileImageUrl = 'assets/images/default-profile.png';
    }
  }

  // ✅ Getter simple qui retourne l'URL stockée
  getProfileImageUrl(): string {
    return this.profileImageUrl;
  }

  onUpload() {
    if (!this.selectedFile) {
      this.message = "Veuillez sélectionner une image d'abord";
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', this.selectedFile);

    if (!this.user._id) {
      this.message = "Utilisateur non défini";
      return;
    }

    this.auth.uploadProfileImage(this.user._id, formData).subscribe({
      next: (res: any) => {
        console.log('Response from backend:', res.user.profileImage);

        // ✅ Les données seront automatiquement mises à jour via le service
        // ✅ Forcer une nouvelle URL avec timestamp pour l'image uploadée
        setTimeout(() => {
          this.updateProfileImageUrl();
        }, 100);

        this.message = "Image mise à jour avec succès !";
        this.showUserMenu = false;
        this.selectedFile = null;

        // ✅ Optionnel: forcer un refresh depuis le serveur
        this.auth.refreshProfile().subscribe();
      },
      error: (err) => {
        console.error(err);
        this.message = "Erreur lors du téléchargement";
      }
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }
}