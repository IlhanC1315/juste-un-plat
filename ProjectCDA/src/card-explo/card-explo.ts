import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-explo',
  imports: [CommonModule],
  templateUrl: './card-explo.html',
  styleUrl: './card-explo.css'
})
export class CardExplo {
  @Input() recette: any;

  get imageUrl(): string {
    let img = this.recette?.recipeImage;

    if (!img || typeof img !== 'string' || img.trim() === '') {
      return 'assets/icones/default-recipe.png';
    }

    // Si c'est déjà une URL complète → on la garde telle quelle
    if (/^https?:\/\//i.test(img)) {
      return img;
    }

    // 🔑 Normalisation :
    // - on vire les "uploads/" en double
    // - on force le préfixe /uploads/recipes/
    img = img.replace(/^\/?uploads\/recipes\//, ''); // enlève le prefixe s'il existe
    img = img.replace(/^\/?uploads\//, '');          // enlève un éventuel "uploads/"

    return `http://localhost:3000/uploads/recipes/${img}`;
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
