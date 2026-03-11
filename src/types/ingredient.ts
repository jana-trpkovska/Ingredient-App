export enum IngredientCategory {
    PRODUCE = 'Produce',
    PROTEIN = 'Protein',
    DAIRY = 'Dairy',
    GRAINS = 'Grains',
    SWEETS = 'Sweets',
    OTHER = 'Other',
}

export enum IngredientUnit {
    PIECES = 'pcs',
    GRAMS = 'g',
    KILOGRAMS = 'kg',
    LITERS = 'l',
    MILLILITERS = 'ml',
}

export interface Ingredient {
  id: string;
  userId: string;
  name: string;
  image?: string;
  category: IngredientCategory;
  quantity?: number;
  unit?: IngredientUnit;
}
