import { IngredientModel, RecipeModel } from "../features/recipeBook/RecipeBookModels";
import { v4 as uuidv4 } from 'uuid';
import bananaPancake from '../img/chad-montano-eeqbbemH9-c-unsplash.jpg';
import bluberryPancake from '../img/calum-lewis-8Nc_oQsc2qQ-unsplash.jpg';
import iceCream from '../img/ian-dooley-TLD6iCOlyb0-unsplash.jpg';
import soup from '../img/cala-w6ftFbPCs9I-unsplash.jpg';

const chickenSoupIngredients: IngredientModel[] = [
    { name: 'Chicken', amount: '1 lb' },
    { name: 'Chicken Stock', amount: '4 cups' },
    { name: 'Mixed Vegetables', amount: '1 cup' }
];

function randomImage(): string {
    const images = [bananaPancake, bluberryPancake, iceCream, soup];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

const description = `Bacon ipsum dolor amet rump burgdoggen bacon filet mignon, spare ribs ribeye ham meatball.
 Alcatra capicola landjaeger pork chop, filet mignon tenderloin chislic meatloaf spare ribs flank meatball. Corned beef chislic drumstick capicola sausage.`;
const imagesrc = 'https://www.eatwell101.com/wp-content/uploads/2020/02/chicken-soup-recipe-3.jpg';

export const chickenSoup: RecipeModel = {
    title: `Mamma's Chicken Soup`,
    description: `This comfort food classic is just as flavorful and soul-satisfying as Grandma's 
    chicken soup, but where hers took several hours-or a day-to make, ours takes under an hour. 
    Instead of long-simmered stock, we start with store-bought chicken broth and water but enrich 
    them with stock vegetables and the carcass, bones and meat of a leftover roast chicken. `,
    ingredients: chickenSoupIngredients,
    totalTime: '1h 30min',
    instructions: [`Put the bones and carcass from a leftover chicken (they can be in pieces) in a 
    large pot. Cover with the broth and 4 cups water. Bring to a boil over medium-high heat, reduce 
    to a simmer and cook for 20 minutes. Skim any foam or fat from the broth with a ladle as necessary. `,
        `Remove the bones and carcass with tongs or a slotted spoon; set aside to cool. Add the carrots, celery, 
    onion and bay leaf to the broth, bring back to a simmer and cook until the vegetables are about half cooked 
    (they will still have resistance when tested with a knife but be somewhat pliable when bent), about 10 minutes.
     Stir in the rice (to keep it from sticking to the bottom), and cook until the grains are just al dente, 10 to 12 minutes. `,
        `Meanwhile, when the carcass and bones are cool enough to handle, pick off the meat, and shred it into bite-size pieces. `,
        `When the rice is done, add the meat to the broth and simmer until warmed through, about 1 minute. Stir in the parsley,
         and season with 1/2 teaspoon salt or more to taste. Serve hot. `
    ],
    imageUrl: imagesrc,
    favorite: false,
    id: uuidv4(),
};


export default function genRecipe(ingredientQuantity: number): RecipeModel {
    const recipe: RecipeModel = {
        title: 'Recipe Title',
        description: description,
        ingredients: genIngredients(ingredientQuantity),
        totalTime: '1h 30min',
        instructions: ['First Step', 'Second Step', 'Third Step'],
        imageUrl: randomImage(),
        favorite: true,
        id: uuidv4(),
    };
    return recipe;
}
export function genChickenSoupRecipe(): RecipeModel {
    const recipe: RecipeModel = {
        title: chickenSoup.title,
        description: chickenSoup.description,
        ingredients: chickenSoup.ingredients,
        totalTime: chickenSoup.totalTime,
        instructions: chickenSoup.instructions,
        imageUrl: randomImage(),
        favorite: false,
        id: uuidv4(),
    };
    return recipe;

}

function genIngredients(ingredientQuantity: number): IngredientModel[] {
    const ingredient: IngredientModel = {
        name: 'Chicken',
        amount: '1 lb'
    };

    return Array(ingredientQuantity).fill(ingredient);

}


