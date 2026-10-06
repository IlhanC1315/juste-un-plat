import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  _id: string;
  name: string;
}

export interface Recette {
  _id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private apiUrl = 'http://localhost:3000/api/recettes';

  constructor(private http: HttpClient) { }

  createRecette(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data)
  }

  getRecettes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getMostViewedRecettes() {
    return this.http.get<any[]>(`${this.apiUrl}/most-viewed`);
  }

  getDifficulties(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/difficulties`);
  }

  getEstimatedCosts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/estimatedCosts`);
  }

  getOccasions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/occasions`);
  }

  getSeasons(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/seasons`);
  }

  getMainIngredients(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/mainIngredients`);
  }

  getCookingMethods(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cookingMethods`);
  }

  getTools(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tools`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getDiets(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/diets`);
  }

  getOrigins(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/origins`);
  }

  getRecipesByCategory(categoryId: string): Observable<any[]> {
    console.log("Requête envoyée avec categoryId :", categoryId);
    return this.http.get<any[]>(`${this.apiUrl}/category/id/${categoryId}`);
  }

  getRecettesByUser(userId: string, page: number = 1, limit: number = 10): Observable<Recette[]> {
    return this.http.get<Recette[]>(`${this.apiUrl}/user/${userId}?page=${page}&limit=${limit}`);
  }

  getHomePageData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/homepage`)
  }
  
}
