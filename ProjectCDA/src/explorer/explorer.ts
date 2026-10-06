import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { RecetteService } from '../service/recette-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorysExplo } from "../categorys-explo/categorys-explo";
import { of, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputSearch } from '../input-search/input-search';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-explorer',
  imports: [Header, NavigationBar, CategorysExplo, CommonModule, InputSearch],
  templateUrl: './explorer.html',
  styleUrl: './explorer.css'
})
export class Explorer implements OnInit {
  categories: { _id: string, name: string }[] = [];
  recipesByCategory: { [key: string]: any[] } = {}
  recipes: any[] = [];
  currentCategory: string = '';


  constructor(
    private recetteService: RecetteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recetteService.getCategories().subscribe(cats => {
      console.log("Catégories récupérées :", cats);
      this.categories = cats;

      const requests = cats.map(cat => {
        return this.recetteService.getRecipesByCategory(cat._id).pipe(
          catchError(err => {
            console.warn(`Pas de recettes pour ${cat.name}`, err);
            return of([]); 
          })
        );
      });

      forkJoin(requests).subscribe({
        next: (allRecipes) => {
          cats.forEach((cat, i) => {
            this.recipesByCategory[cat._id] = allRecipes[i];
            console.log("Catégorie :", cat.name, "Recettes :", allRecipes[i]);
          });
        },
        error: (err) => {
          console.error('Erreur inattendue lors du chargement des recettes', err);
        }
      });
    });
  }

  loadRecipes(catId: string) {
    this.recetteService.getRecipesByCategory(catId).subscribe((data) => {
      this.recipesByCategory[catId] = data;
    });
  }

  goToCategory(category: string) {
    this.router.navigate(['/explorer', category]);
  }
}
