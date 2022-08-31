

export interface RecipeModel {


    title: string;
    description: string;
    totalTime: string;
    ingredients: IngredientModel[];
    instructions: string[];
    imageUrl: string;
    favorite: boolean;
    id: string;
    cost: number;
}

export interface IngredientModel {
    name: string;
    amount: string;
}