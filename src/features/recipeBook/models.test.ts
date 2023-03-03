

import { IngredientModel, IngredientItem, RecipeModel } from "./models";

const flour = { name: 'Flour', amount: 1, measuringUnit: 'cup', cost: 1.99, unitCost: 1.99, id: '12345' };
const milk = { name: 'Milk', amount: 1, measuringUnit: 'cup', cost: 0.99, unitCost: 0.99, id: '12346' };
const egg = { name: 'Egg', amount: 1, measuringUnit: '', cost: 0.25, unitCost: 0.25, id: '12347' };
const sugar = { name: 'Sugar', amount: 2, measuringUnit: 'tbsp', cost: 0.10, unitCost: 0.05, id: '12348' };
const bakingPowder = { name: 'Baking Powder', amount: 2, measuringUnit: 'tsp', cost: 0.05, unitCost: 0.025, id: '12349' };
const salt = { name: 'Salt', amount: 1, measuringUnit: 'pinch', cost: 0.01, unitCost: 0.01, id: '12350' };
const butter = { name: 'Butter', amount: 2, measuringUnit: 'tbsp', cost: 0.50, unitCost: 0.25, id: '12351' };

describe('RecipeModel', () => {

  const ingredientItemList: IngredientItem[] = [
    new IngredientItem(flour, 1),
    new IngredientItem(milk, 1),
    new IngredientItem(egg, 1),
    new IngredientItem(sugar, 2),
    new IngredientItem(bakingPowder, 2),
    new IngredientItem(salt, 1),
    new IngredientItem(butter, 2),
  ];

  const recipe: RecipeModel = {
    title: 'Pancakes',
    description: 'A delicious breakfast treat!',
    totalTime: { hours: 0, minutes: 30 },
    ingredients: ingredientItemList,
    instructions: [
      'In a large bowl, whisk together the flour, sugar, baking powder, and salt.',
      'In a separate bowl, beat together the milk, egg, and melted butter.',
      'Pour the wet ingredients into the dry ingredients and whisk until just combined.',
      'Heat a non-stick pan over medium-high heat.',
      'Pour 1/4 cup of batter onto the pan for each pancake and cook until bubbles appear on the surface.',
      'Flip and cook until the other side is golden brown.',
      'Serve with your favorite toppings and enjoy!',
    ],
    imageUrl: 'https://www.example.com/pancakes.jpg',
    favorite: true,
    id: '12345',
    cost: 5.99,
  };

  it('should have a title', () => {
    expect(recipe.title).toBeDefined();
  });

  it('should have a description', () => {
    expect(recipe.description).toBeDefined();
  });

  it('should have a totalTime', () => {
    expect(recipe.totalTime).toBeDefined();
    expect(recipe.totalTime.hours).toBe(0);
    expect(recipe.totalTime.minutes).toBe(30);
  });

  it('should have ingredients', () => {
    expect(recipe.ingredients).toBeDefined();
    expect(recipe.ingredients.length).toBeGreaterThan(0);
    expect(recipe.ingredients[0]).toBe(ingredientItemList[0]);
  });

  it('should have instructions', () => {
    expect(recipe.instructions).toBeDefined();
    expect(recipe.instructions.length).toBeGreaterThan(0);
    expect(recipe.instructions[0]).toBeDefined();
  });

  it('should have an imageUrl', () => {
    expect(recipe.imageUrl).toBeDefined();
  });

  it('should have a favorite flag', () => {
    expect(recipe.favorite).toBeDefined();
  });

  it('should have an id', () => {
    expect(recipe.id).toBeDefined();
  });

  it('should have a cost', () => {
    expect(recipe.cost).toBeDefined();
  });
});

describe('IngredientModel', () => {

  const ingredient = flour;

  it('should have a name', () => {
    expect(ingredient.name).toBeDefined();
    expect(ingredient.name).toBe('Flour');
  });

  it('should have an amount', () => {
    expect(ingredient.amount).toBeDefined();
    expect(ingredient.amount).toBe(1);
  });

  it('should have a measuringUnit', () => {
    expect(ingredient.measuringUnit).toBeDefined();
    expect(ingredient.measuringUnit).toBe('cup');
  });

  it('should have a cost', () => {
    expect(ingredient.cost).toBeDefined();
    expect(ingredient.cost).toBe(1.99);
  });

  it('should have a unitCost', () => {
    expect(ingredient.unitCost).toBeDefined();
    expect(ingredient.unitCost).toBe(1.99);
  });

  it('should have an id', () => {
    expect(ingredient.id).toBeDefined();
    expect(ingredient.id).toBe('12345');
  });
});

describe('IngredientItem', () => {

  const ingredientItem = new IngredientItem(flour, 2);

  it('should have an ingredient', () => {
    expect(ingredientItem.ingredient).toBeDefined();
    expect(ingredientItem.ingredient).toBe(flour);
  });

  it('should have a quantity', () => {
    expect(ingredientItem.quantity).toBeDefined();
    expect(ingredientItem.quantity).toBe(2);
  });

  it('should have a cost', () => {
    expect(ingredientItem.cost).toBeDefined();
    expect(ingredientItem.cost).toBe(2*1.99);
  });
});