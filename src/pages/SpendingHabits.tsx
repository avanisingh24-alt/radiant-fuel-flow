import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, TrendingUp, Flame, Plus, Trash2, Target, Heart } from "lucide-react";

type SpendCategory = "skincare" | "fitness" | "groceries" | "supplements" | "self-care" | "other";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: SpendCategory;
  date: string;
}

interface Habit {
  id: string;
  name: string;
  streak: number;
  best: number;
  target: number;
  unit: string;
}

const catColors: Record<SpendCategory, string> = {
  skincare: "bg-lavender",
  fitness: "bg-primary",
  groceries: "bg-terracotta",
  supplements: "bg-ocean",
  "self-care": "bg-accent",
  other: "bg-muted-foreground",
};

const catLabels: Record<SpendCategory, string> = {
  skincare: "Skincare", fitness: "Fitness", groceries: "Groceries",
  supplements: "Supplements", "self-care": "Self-Care", other: "Other",
};

const intentionalPrompts = [
  "Before buying, ask: Does this align with my goals?",
  "Will this purchase matter in 30 days?",
  "Is there a DIY or free alternative?",
  "Am I buying this out of boredom or necessity?",
  "Track every unplanned purchase this week.",
];

const initialExpenses: Expense[] = [
  { id: "e1", title: "AmLactin Body Lotion", amount: 16.99, category: "skincare", date: "2026-03-28" },
  { id: "e2", title: "Chicken & Vegetables", amount: 32.50, category: "groceries", date: "2026-03-27" },
  { id: "e3", title: "Protein Powder", amount: 29.99, category: "supplements", date: "2026-03-26" },
  { id: "e4", title: "Boxing Gloves", amount: 24.99, category: "fitness", date: "2026-03-25" },
  { id: "e5", title: "Jojoba Oil Refill", amount: 12.99, category: "skincare", date: "2026-03-24" },
  { id: "e6", title: "Weekly Groceries", amount: 65.00, category: "groceries", date: "2026-03-23" },
  { id: "e7", title: "Yoga Mat Spray", amount: 8.99, category: "fitness", date: "2026-03-22" },
  { id: "e8", title: "Face Masks", amount: 14.99, category: "self-care", date: "2026-03-21" },
];

const initialHabits: Habit[] = [
  { id: "h1", name: "Morning Workout", streak: 12, best: 21, target: 30, unit: "days" },
  { id: "h2", name: "Skincare Routine", streak: 18, best: 18, target: 30, unit: "days" },
  { id: "h3", name: "80oz Water", streak: 9, best: 30, target: 30, unit: "days" },
  { id: "h4", name: "No Late-Night Snacks", streak: 5, best: 14, target: 21, unit: "days" },
  { id: "h5", name: "Budget Check-in", streak: 3, best: 8, target: 7, unit: "days" },
];

const SpendingHabits = () => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [habits] = useState<Habit[]>(initialHabits);
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCat, setNewCat] = useState<SpendCategory>("groceries");
  const [promptIdx, setPromptIdx] = useState(0);

  const addExpense = () => {
    if (!newTitle.trim() || !newAmount) return;
    setExpenses(prev => [...prev, {
      id: Date.now().toString(),
      title: newTitle,
      amount: parseFloat(newAmount),
      category: newCat,
      date: new Date().toISOString().split("T")[0],
    }]);
    setNewTitle("");
    setNewAmount("");
  };

  const deleteExpense = (id: string) => setExpenses(prev => prev.filter(e => e.id !== id));

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const byCategory = Object.entries(catLabels).map(([key, label]) => {
    const catTotal = expenses.filter(e => e.category === key).reduce((s, e) => s + e.amount, 0);
    return { key: key as SpendCategory, label, total: catTotal, pct: total > 0 ? (catTotal / total) * 100 : 0 };
  }).filter(c => c.total > 0).sort((a, b) => b.total - a.total);

  return (
    <div className="space-y-6">
      {/* Spending Overview */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="w-5 h-5 text-primary" />
            Spending Tracker
          </CardTitle>
          <p className="text-2xl font-serif text-foreground">${total.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">This month's total</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {byCategory.map(cat => (
            <div key={cat.key}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-foreground">{cat.label}</span>
                <span className="text-sm text-muted-foreground">${cat.total.toFixed(2)}</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full ${catColors[cat.key]} rounded-full transition-all`} style={{ width: `${cat.pct}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {expenses.slice(0, 6).map(e => (
            <div key={e.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div>
                <p className="text-sm text-foreground">{e.title}</p>
                <p className="text-xs text-muted-foreground">{e.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-[10px] border-0 ${catColors[e.category]}/20 text-foreground`}>{catLabels[e.category]}</Badge>
                <span className="text-sm font-medium text-foreground">${e.amount.toFixed(2)}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => deleteExpense(e.id)}>
                  <Trash2 className="w-3 h-3 text-muted-foreground" />
                </Button>
              </div>
            </div>
          ))}
          <div className="flex gap-2 mt-3">
            <Input placeholder="Expense..." value={newTitle} onChange={e => setNewTitle(e.target.value)} className="bg-secondary border-border text-sm" />
            <Input placeholder="$" value={newAmount} onChange={e => setNewAmount(e.target.value)} className="bg-secondary border-border text-sm w-20" type="number" />
            <Select value={newCat} onValueChange={v => setNewCat(v as SpendCategory)}>
              <SelectTrigger className="w-28 bg-secondary border-border text-xs h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(catLabels).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="icon" onClick={addExpense} className="shrink-0 h-9 w-9">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Habit Streaks */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Flame className="w-5 h-5 text-primary" />
            Habit Streaks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {habits.map(h => (
            <div key={h.id}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-foreground">{h.name}</span>
                <span className="text-xs text-muted-foreground">{h.streak}/{h.target} {h.unit}</span>
              </div>
              <Progress value={(h.streak / h.target) * 100} className="h-2" />
              <p className="text-[10px] text-muted-foreground mt-0.5">Best streak: {h.best} {h.unit}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Intentional Spending */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="w-5 h-5 text-lavender" />
            Intentional Spending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-secondary rounded-lg p-4 text-center">
            <p className="text-foreground italic text-sm">"{intentionalPrompts[promptIdx]}"</p>
            <Button variant="ghost" size="sm" className="mt-2 text-xs text-muted-foreground" onClick={() => setPromptIdx((promptIdx + 1) % intentionalPrompts.length)}>
              Next Prompt →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Values-Based Planning */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-terracotta" />
            Values-Based Budget
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { value: "Health & Body", allocation: 40, spent: 35 },
            { value: "Growth & Learning", allocation: 20, spent: 12 },
            { value: "Joy & Social", allocation: 25, spent: 28 },
            { value: "Essentials", allocation: 15, spent: 15 },
          ].map((v, i) => (
            <div key={i} className="bg-secondary rounded-lg p-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-foreground">{v.value}</span>
                <span className="text-xs text-muted-foreground">{v.spent}% / {v.allocation}%</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${v.spent > v.allocation ? "bg-destructive" : "bg-primary"}`} style={{ width: `${Math.min(v.spent / v.allocation * 100, 100)}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpendingHabits;
