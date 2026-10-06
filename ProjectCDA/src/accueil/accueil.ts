import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../service/auth';
import { HttpClient } from '@angular/common/http';
import { Header } from '../header/header';
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { RecipeCardApi } from "../recipe-card-api/recipe-card-api";
import { RecetteService } from '../service/recette-service';
import { CommonModule } from '@angular/common';
import { RecipecardAccueil } from "../recipecard-accueil/recipecard-accueil";
import { BalisePays } from "../balise-pays/balise-pays";

@Component({
  selector: 'app-accueil',
  imports: [Header, NavigationBar, RecipeCardApi, CommonModule, RecipecardAccueil, BalisePays],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil implements OnInit {
  trendingWeekly: any[] = [];
  topRecipesAllTime: any[] = [];
  loading = true; // sert a afficher un message le temps que les vrais données s'affiche suite a l'appel de ma requete http, eviter des erreurs 
 // true de base en gros ca affiche le message puis quand c'est charger il passe en false 
  constructor(private recetteService: RecetteService) {}

  ngOnInit(): void {
    this.loadHomePageData();
  }

  loadHomePageData(): void { // void indique que cette fonction fait une action mais ne renvoi pas de valeur (données) c'est du typage pour éviter des erreurs 
    this.recetteService.getHomePageData().subscribe({
      next: (res) => {
        this.trendingWeekly = res.trendingWeekly;
        this.topRecipesAllTime = res.topRecipesAllTime;
        this.loading = false; // passe en false car les données ont etait charger
      },
      error: (err) => {
        console.error("Erreur chargement HomePage", err)
        this.loading = false; // passe en false car un bug 
      }
    });
  }

}
