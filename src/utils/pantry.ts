export const defaultPantryItems = new Set([
  'salt',
  'sugar',
  'pepper',
  'olive oil',
  'water',
  'oil',
]);


export const isIngredientMissing = (
  ingredientName: string,
  userIngredients: string[]
): boolean => {
  const ingName = ingredientName.toLowerCase().trim();
  if (defaultPantryItems.has(ingName)) return false;
  return !userIngredients.some((i) => i?.includes(ingName));
};