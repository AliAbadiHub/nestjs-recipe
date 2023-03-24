import { Unit } from '../dto/recipe.dto';

export class Recipe {
  id: string;
  description: string;
  ingredients: Ingredient[];
}

export class Ingredient {
  name: string;
  unit: Unit;
  quantity: number;
}
