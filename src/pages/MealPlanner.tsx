import { useState } from "react";
import { Plus, X, ChefHat, Clock, Flame, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servings: number;
  prepTime: string;
  ingredients: string[];
  tags: string[];
  instructions?: string[];
}

const sampleRecipes: Recipe[] = [
  {
    id: "1", name: "Grilled Chicken & Veggie Bowl", calories: 420, protein: 38, carbs: 35, fat: 14, servings: 2, prepTime: "25 min",
    ingredients: ["chicken breast", "rice", "broccoli", "bell pepper", "olive oil"], tags: ["High Protein", "Meal Prep"],
  },
  {
    id: "2", name: "Salmon Avocado Salad", calories: 380, protein: 32, carbs: 12, fat: 22, servings: 1, prepTime: "15 min",
    ingredients: ["salmon", "avocado", "mixed greens", "lemon", "olive oil"], tags: ["Omega-3", "Low Carb"],
  },
  {
    id: "3", name: "Turkey & Sweet Potato Skillet", calories: 450, protein: 35, carbs: 42, fat: 12, servings: 3, prepTime: "30 min",
    ingredients: ["ground turkey", "sweet potato", "spinach", "garlic", "onion"], tags: ["High Protein", "Balanced"],
  },
  {
    id: "4", name: "Greek Yogurt Protein Bowl", calories: 310, protein: 28, carbs: 38, fat: 8, servings: 1, prepTime: "5 min",
    ingredients: ["greek yogurt", "berries", "granola", "honey", "chia seeds"], tags: ["Quick", "Breakfast"],
  },
  {
    id: "5", name: "Shrimp Stir-Fry", calories: 340, protein: 30, carbs: 28, fat: 10, servings: 2, prepTime: "20 min",
    ingredients: ["shrimp", "broccoli", "bell pepper", "soy sauce", "rice"], tags: ["Quick", "High Protein"],
  },
  {
    id: "6", name: "Egg & Veggie Wrap", calories: 290, protein: 18, carbs: 30, fat: 12, servings: 1, prepTime: "10 min",
    ingredients: ["eggs", "tortilla", "spinach", "tomato", "cheese"], tags: ["Quick", "Breakfast"],
  },
];

const MealPlanner = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRecipes, setShowRecipes] = useState(false);
  const { toast } = useToast();

  const addIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim().toLowerCase())) {
      setIngredients([...ingredients, inputValue.trim().toLowerCase()]);
      setInputValue("");
    }
  };

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter((i) => i !== ing));
  };

  const generateAIRecipes = async () => {
    if (ingredients.length === 0) return;
    setIsGenerating(true);
    setShowRecipes(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-recipes", {
        body: { ingredients },
      });

      if (error) throw error;

      if (data?.recipes) {
        setRecipes(data.recipes.map((r: any, i: number) => ({ ...r, id: `ai-${i}` })));
      }
    } catch (err: any) {
      console.error("AI recipe generation failed:", err);
      toast({
        title: "AI generation unavailable",
        description: "Showing matched recipes from our collection instead.",
        variant: "destructive",
      });
      // Fallback to local matching
      const matched = sampleRecipes.filter((r) =>
        r.ingredients.some((ri) => ingredients.some((ui) => ri.includes(ui) || ui.includes(ri)))
      );
      setRecipes(matched.length > 0 ? matched : sampleRecipes);
    } finally {
      setIsGenerating(false);
    }
  };

  const displayRecipes = showRecipes ? recipes : sampleRecipes;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-2 tracking-wider">Meal Planner</h2>
        <p className="text-muted-foreground">
          Add your ingredients and let AI conjure recipes from your pantry.
        </p>
      </div>

      {/* Ingredient Input */}
      <Card className="gothic-border">
        <CardContent className="pt-6">
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add an ingredient (e.g. chicken, rice, broccoli)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addIngredient()}
              className="flex-1"
            />
            <Button onClick={addIngredient} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing) => (
                <Badge
                  key={ing}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  onClick={() => removeIngredient(ing)}
                >
                  {ing} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}
          {ingredients.length > 0 && (
            <Button className="mt-4" onClick={generateAIRecipes} disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {isGenerating ? "Conjuring Recipes..." : "AI Generate Recipes"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Recipe Results */}
      <div>
        <h3 className="text-xl font-serif mb-4 tracking-wider">
          {showRecipes ? `${displayRecipes.length} recipes summoned` : "Suggested Recipes for the Week"}
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayRecipes.map((recipe) => (
            <Card key={recipe.id} className="card-hover overflow-hidden gothic-border">
              <div className="h-1.5 wellness-gradient" />
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-serif tracking-wide">{recipe.name}</CardTitle>
                <div className="flex gap-2 flex-wrap">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 rounded-md bg-wellness-light">
                    <Flame className="w-4 h-4 mx-auto mb-1 text-wellness" />
                    <p className="text-xs text-muted-foreground">Cal</p>
                    <p className="font-semibold text-sm">{recipe.calories}</p>
                  </div>
                  <div className="text-center p-2 rounded-md bg-terracotta-light">
                    <p className="text-xs text-muted-foreground">Protein</p>
                    <p className="font-semibold text-sm">{recipe.protein}g</p>
                  </div>
                  <div className="text-center p-2 rounded-md bg-ocean-light">
                    <p className="text-xs text-muted-foreground">Carbs</p>
                    <p className="font-semibold text-sm">{recipe.carbs}g</p>
                  </div>
                </div>
                {recipe.instructions && (
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground font-medium mb-1">Steps:</p>
                    <ol className="text-xs space-y-1 text-muted-foreground">
                      {recipe.instructions.slice(0, 3).map((s, i) => (
                        <li key={i}>{i + 1}. {s}</li>
                      ))}
                    </ol>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {recipe.prepTime}
                  </span>
                  <span>{recipe.servings} serving{recipe.servings > 1 ? "s" : ""}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
