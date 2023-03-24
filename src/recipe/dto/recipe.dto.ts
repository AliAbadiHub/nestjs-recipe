export class RecipeDto {
  description: string;
  ingredients: IngredientDto[];
}

export class IngredientDto {
  name: string;
  unit: Unit;
  quantity: number;
}

export enum Unit {
  MILILITERS = 'mililiters',
  LITERS = 'LITERS',
  GRAMS = 'grams',
  KILOGRAMS = 'kilograms',
  SPOONS = 'spoons',
  CUPS = 'cups',
  PIECES = 'pieces',
}
