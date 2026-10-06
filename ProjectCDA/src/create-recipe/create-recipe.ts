import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecetteService } from '../service/recette-service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.css'
})
export class CreateRecipe implements OnInit {
  recetteForm: FormGroup;
  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;

  //mes enum
  difficultyList: any[] = [];
  estimatedCostList: any[] = [];
  categoryList: any[] = [];
  dietList: any[] = [];
  originList: any[] = [];
  mainIngredientList: any[] = [];
  cookingMethodList: any[] = [];
  requiredToolsList: any[] = [];
  occasionList: any[] = [];
  seasonList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private recetteService: RecetteService,
    private location: Location
  ) {
    this.recetteForm = this.fb.group({
      recipeName: [''],
      prep_time: [''],
      cook_time: [''],
      servings: [''],
      description: [''],
      difficulty: [''],
      estimated_cost: [''],
      category: [''],
      diet: [''],
      origin: [''],
      mainIngredient: [[]],
      cookingMethod: [[]],
      required_tools: [[]],
      occasion: [[]],
      season: [[]],
      chefTips: [''],
      ingredientEtapes: this.fb.array([]),
      prepEtape: this.fb.array([])
    });
  }
  ngOnInit(): void {
    this.loadEnums();
    this.addIngredientEtape();
    this.addIngredient(0);
    this.addPrepEtape();
  }
  loadEnums() {
    this.recetteService.getDifficulties().subscribe(r => this.difficultyList = r);
    this.recetteService.getEstimatedCosts().subscribe(r => this.estimatedCostList = r);
    this.recetteService.getCategories().subscribe(r => this.categoryList = r);
    this.recetteService.getDiets().subscribe(r => this.dietList = r);
    this.recetteService.getOrigins().subscribe(r => this.originList = r);
    this.recetteService.getMainIngredients().subscribe(r => this.mainIngredientList = r);
    this.recetteService.getCookingMethods().subscribe(r => this.cookingMethodList = r);
    this.recetteService.getTools().subscribe(r => this.requiredToolsList = r);
    this.recetteService.getOccasions().subscribe(r => this.occasionList = r);
    this.recetteService.getSeasons().subscribe(r => this.seasonList = r);
  }

  get ingredientEtapes(): FormArray {
    return this.recetteForm.get('ingredientEtapes') as FormArray;
  }

  get prepEtape(): FormArray {
    return this.recetteForm.get('prepEtape') as FormArray;
  }

  ingredient(i: number): FormArray {
    return this.ingredientEtapes.at(i).get('ingredient') as FormArray;
  }

  addIngredientEtape() {
    this.ingredientEtapes.push(this.fb.group({
      nameEtape: [''],
      ingredient: this.fb.array([])
    }));
  }

  addIngredient(etapeIndex: number) {
    this.ingredient(etapeIndex).push(
      this.fb.group({
        ingredientName: [''],
        measurementUnit: [''],
        quantity: ['']
      })
    );
  }

  removeIngredient(etapeIndex: number, ingrIndex: number) {
    this.ingredient(etapeIndex).removeAt(ingrIndex);
  }

  addPrepEtape() {
    this.prepEtape.push(
      this.fb.group({
        namePrepEtape: [''],
        numberEtape: [''],
        instruction: ['']
      })
    );
  }

  removePrepEtape(index: number) {
    this.prepEtape.removeAt(index);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => this.preview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.recetteForm.invalid) {
      console.log("Formulaire invalide");
      return;
    }
    const value = this.recetteForm.value;
    const formData = new FormData();
    [
      'recipeName', 'description', 'prep_time', 'cook_time', 'servings',
      'chefTips', 'difficulty', 'estimated_cost', 'category', 'diet', 'origin'
    ].forEach(key => {
      if (value[key]) formData.append(key, value[key]);
    });
    if (this.selectedFile) {
      formData.append("recipeImage", this.selectedFile);
    }
    ['occasion', 'season', 'mainIngredient', 'cookingMethod', 'required_tools']
      .forEach(key => {
        const arr = value[key];
        if (Array.isArray(arr)) {
          arr.forEach((id: string) => formData.append(key, id));
        }
      });
    const ingredientEtapes = value.ingredientEtapes.map((e: any) => ({
      nameEtape: e.nameEtape,
      ingredient: e.ingredient
        .filter((i: any) => i.ingredientName?.trim())
        .map((i: any) => ({
          ingredientName: i.ingredientName.trim(),
          measurementUnit: i.measurementUnit || '',
          quantity: Number(i.quantity) || 0
        }))
    }));
    const prepEtape = value.prepEtape
      .filter((p: any) => p.instruction?.trim())
      .map((p: any) => ({
        namePrepEtape: p.namePrepEtape || '',
        numberEtape: Number(p.numberEtape) || 0,
        instruction: p.instruction
      }));
    formData.append("ingredientEtapes", JSON.stringify(ingredientEtapes));
    formData.append("prepEtape", JSON.stringify(prepEtape));
    this.recetteService.createRecette(formData).subscribe({
      next: (res) => {
        console.log("Recette créée", res);
        this.location.back();
      },
      error: (err) => console.error("Erreur création", err)
    });
  }

  goBack() {
    this.location.back();
  }
}
