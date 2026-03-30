import { useState } from "react";
import { ShoppingBag, Plus, X, Check, Skull } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  checked: boolean;
}

const defaultGroceries: GroceryItem[] = [
  { id: "1", name: "Chicken Breast", category: "Protein", quantity: "2 lbs", checked: false },
  { id: "2", name: "Salmon Fillets", category: "Protein", quantity: "1 lb", checked: false },
  { id: "3", name: "Ground Turkey", category: "Protein", quantity: "1 lb", checked: false },
  { id: "4", name: "Shrimp", category: "Protein", quantity: "1 lb", checked: false },
  { id: "5", name: "Eggs (dozen)", category: "Protein", quantity: "1", checked: false },
  { id: "6", name: "Greek Yogurt", category: "Dairy", quantity: "32 oz", checked: false },
  { id: "7", name: "Broccoli", category: "Vegetables", quantity: "2 heads", checked: false },
  { id: "8", name: "Bell Peppers", category: "Vegetables", quantity: "4", checked: false },
  { id: "9", name: "Sweet Potatoes", category: "Vegetables", quantity: "3", checked: false },
  { id: "10", name: "Spinach", category: "Vegetables", quantity: "1 bag", checked: false },
  { id: "11", name: "Mixed Greens", category: "Vegetables", quantity: "1 bag", checked: false },
  { id: "12", name: "Avocados", category: "Produce", quantity: "3", checked: false },
  { id: "13", name: "Lemons", category: "Produce", quantity: "4", checked: false },
  { id: "14", name: "Berries (mixed)", category: "Produce", quantity: "2 pints", checked: false },
  { id: "15", name: "Rice", category: "Grains", quantity: "2 lbs", checked: false },
  { id: "16", name: "Tortillas", category: "Grains", quantity: "1 pack", checked: false },
  { id: "17", name: "Granola", category: "Grains", quantity: "1 bag", checked: false },
  { id: "18", name: "Olive Oil", category: "Pantry", quantity: "1 bottle", checked: false },
  { id: "19", name: "Soy Sauce", category: "Pantry", quantity: "1 bottle", checked: false },
  { id: "20", name: "Honey", category: "Pantry", quantity: "1 jar", checked: false },
  { id: "21", name: "Chia Seeds", category: "Pantry", quantity: "1 bag", checked: false },
  { id: "22", name: "Garlic", category: "Produce", quantity: "1 head", checked: false },
  { id: "23", name: "Onions", category: "Produce", quantity: "3", checked: false },
  { id: "24", name: "Tomatoes", category: "Produce", quantity: "4", checked: false },
  { id: "25", name: "Cheese (shredded)", category: "Dairy", quantity: "8 oz", checked: false },
];

const GroceryList = () => {
  const [items, setItems] = useState<GroceryItem[]>(defaultGroceries);
  const [newItem, setNewItem] = useState("");
  const [newCategory, setNewCategory] = useState("Pantry");

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        name: newItem.trim(),
        category: newCategory,
        quantity: "1",
        checked: false,
      },
    ]);
    setNewItem("");
  };

  const toggleItem = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  };

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const categories = [...new Set(items.map((i) => i.category))];
  const checkedCount = items.filter((i) => i.checked).length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-2 tracking-wider">Grocery List</h2>
        <p className="text-muted-foreground">
          Weekly grocery list based on your meal plan — {checkedCount}/{items.length} items checked off.
        </p>
      </div>

      {/* Add Item */}
      <Card className="gothic-border">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Add custom item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              className="flex-1"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-3 py-2 rounded-md bg-secondary text-secondary-foreground text-sm border border-border"
            >
              {["Protein", "Vegetables", "Produce", "Dairy", "Grains", "Pantry"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <Button onClick={addItem} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${items.length ? (checkedCount / items.length) * 100 : 0}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground font-medium">
          {Math.round(items.length ? (checkedCount / items.length) * 100 : 0)}%
        </span>
      </div>

      {/* Categories */}
      {categories.map((cat) => {
        const catItems = items.filter((i) => i.category === cat);
        return (
          <Card key={cat} className="gothic-border overflow-hidden">
            <div className="h-1 wellness-gradient" />
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-serif tracking-wider flex items-center gap-2">
                <Skull className="w-4 h-4 text-primary" />
                {cat}
                <Badge variant="secondary" className="ml-auto text-xs">
                  {catItems.filter((i) => i.checked).length}/{catItems.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {catItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 py-2 px-3 rounded-md transition-all ${
                      item.checked ? "opacity-40" : "hover:bg-secondary"
                    }`}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => toggleItem(item.id)}
                    />
                    <span className={`flex-1 text-sm ${item.checked ? "line-through" : ""}`}>
                      {item.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.quantity}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default GroceryList;
