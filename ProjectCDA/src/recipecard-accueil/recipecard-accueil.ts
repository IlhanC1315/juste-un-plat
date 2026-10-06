import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipecard-accueil',
  imports: [CommonModule],
  templateUrl: './recipecard-accueil.html',
  styleUrl: './recipecard-accueil.css'
})
export class RecipecardAccueil {
  @Input() recette: any;

  get imageUrl(): string {
    //si recipeImage existe alors il retourne le chemin complet 
      return `http://localhost:3000/uploads/${this.recette.recipeImage}`
  }

  formatTime(totalMinutes: number | null | undefined): string {
    if (!totalMinutes || totalMinutes <= 0) return '0 min';

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    } else {
      return `${minutes}min`;
    }
  }

}
