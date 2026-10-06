import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardExplo } from "../card-explo/card-explo";

@Component({
  selector: 'app-categorys-explo',
  imports: [CommonModule, CardExplo],
  templateUrl: './categorys-explo.html',
  styleUrl: './categorys-explo.css'
})
export class CategorysExplo {
  @Input() categoryName!: string;
  @Input() recettes: any[] = [];
}
