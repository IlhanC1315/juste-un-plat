import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recipe {
  _id: string;
  recipeImage?: string;
  recipeName: string;
  prep_time: number;
  cook_time: number;
  difficulty?: any;
  servings?: number;
  estimated_cost?: any;
  occasion?: any[];
  season?: any[];
  mainIngredient?: any[];
  cookingMethod?: any[];
  required_tools?: any[];
  description: string;
  ingredientEtapes?: any[];
  prepEtape?: any[];
  chefTips?: string;
  nutritionValues?: any[];
  category?: any;
  diet?: any;
  origin?: any;
  userCreated?: any;
}


@Injectable({
  providedIn: 'root'
})
export class BackEnd {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  postAdminData(playload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/recettes`, playload);
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`);
  }

  getAdminData(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
