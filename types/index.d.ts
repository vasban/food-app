export interface RecipeData {
    id : number;
    title: string;
    description: string;
    ingredients: string;
  }

export interface RecipeProps {
    initialData: RecipeData;
}