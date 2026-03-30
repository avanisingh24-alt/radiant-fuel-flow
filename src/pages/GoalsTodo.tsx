import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, ListTodo, RotateCcw, Heart, Plus, Trash2, Sparkles } from "lucide-react";

type Priority = "high" | "medium" | "low";
type Category = "fitness" | "skincare" | "nutrition" | "finance" | "self-care" | "errands";

interface Goal {
  id: string;
  title: string;
  steps: { label: string; done: boolean }[];
  type: "monthly" | "weekly";
}

interface Todo {
  id: string;
  title: string;
  done: boolean;
  category: Category;
  priority: Priority;
}

const priorityColors: Record<Priority, string> = {
  high: "bg-primary/20 text-primary",
  medium: "bg-terracotta/20 text-terracotta",
  low: "bg-ocean/20 text-ocean",
};

const categoryLabels: Record<Category, string> = {
  fitness: "Fitness", skincare: "Skincare", nutrition: "Nutrition",
  finance: "Finance", "self-care": "Self-Care", errands: "Errands",
};

const selfCareIdeas = [
  "Take a 20-minute bath with Epsom salts",
  "Do a 10-minute guided meditation",
  "Journal 3 things you're grateful for",
  "Make your favorite comfort tea",
  "Go for a sunset walk — no phone",
  "Apply a hair mask and read for 30 min",
  "Stretch for 15 minutes with calming music",
  "Organize one drawer or shelf — small wins",
];

const initialGoals: Goal[] = [
  {
    id: "g1", title: "Reach 125 lbs", type: "monthly",
    steps: [
      { label: "Track calories daily", done: true },
      { label: "Hit protein goal 5x/week", done: true },
      { label: "Complete all 6 workouts", done: false },
      { label: "No sugar after 7 PM", done: false },
    ],
  },
  {
    id: "g2", title: "Clear skin by month end", type: "monthly",
    steps: [
      { label: "Red light mask 5x/week", done: true },
      { label: "Consistent PM routine", done: true },
      { label: "Drink 80oz water daily", done: false },
    ],
  },
  {
    id: "g3", title: "Weekly Meal Prep", type: "weekly",
    steps: [
      { label: "Plan 5 recipes", done: true },
      { label: "Grocery shop Sunday", done: false },
      { label: "Prep lunches for M-F", done: false },
    ],
  },
];

const initialTodos: Todo[] = [
  { id: "t1", title: "Restock AmLactin lotion", done: false, category: "skincare", priority: "high" },
  { id: "t2", title: "Buy chicken breast & broccoli", done: false, category: "nutrition", priority: "high" },
  { id: "t3", title: "Schedule boxing gym visit", done: false, category: "fitness", priority: "medium" },
  { id: "t4", title: "Update monthly budget", done: false, category: "finance", priority: "medium" },
  { id: "t5", title: "Exfoliate with gloves", done: true, category: "skincare", priority: "low" },
  { id: "t6", title: "Order new resistance bands", done: false, category: "fitness", priority: "low" },
];

const GoalsTodo = () => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("medium");
  const [newCat, setNewCat] = useState<Category>("errands");
  const [showSelfCare, setShowSelfCare] = useState(false);

  const toggleGoalStep = (goalId: string, stepIdx: number) => {
    setGoals(prev => prev.map(g => g.id === goalId ? {
      ...g, steps: g.steps.map((s, i) => i === stepIdx ? { ...s, done: !s.done } : s)
    } : g));
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos(prev => [...prev, { id: Date.now().toString(), title: newTodo, done: false, category: newCat, priority: newPriority }]);
    setNewTodo("");
  };

  const deleteTodo = (id: string) => setTodos(prev => prev.filter(t => t.id !== id));

  const resetWeek = () => {
    setTodos(prev => prev.map(t => ({ ...t, done: false })));
    setGoals(prev => prev.filter(g => g.type === "monthly").map(g => ({
      ...g, steps: g.steps.map(s => ({ ...s, done: false }))
    })));
  };

  const filtered = todos.filter(t =>
    (filterCategory === "all" || t.category === filterCategory) &&
    (filterPriority === "all" || t.priority === filterPriority)
  );

  return (
    <div className="space-y-6">
      {/* Monthly Goals */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-primary" />
            Monthly Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.filter(g => g.type === "monthly").map(goal => {
            const done = goal.steps.filter(s => s.done).length;
            const pct = Math.round((done / goal.steps.length) * 100);
            return (
              <div key={goal.id} className="bg-secondary rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-serif text-foreground">{goal.title}</h3>
                  <span className="text-xs text-muted-foreground">{pct}%</span>
                </div>
                <Progress value={pct} className="h-2 mb-3" />
                <div className="space-y-1.5">
                  {goal.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Checkbox checked={step.done} onCheckedChange={() => toggleGoalStep(goal.id, i)} />
                      <span className={`text-sm ${step.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListTodo className="w-5 h-5 text-terracotta" />
              Weekly Goals
            </CardTitle>
            <Button variant="outline" size="sm" onClick={resetWeek} className="text-xs">
              <RotateCcw className="w-3 h-3 mr-1" /> Reset Week
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.filter(g => g.type === "weekly").map(goal => {
            const done = goal.steps.filter(s => s.done).length;
            const pct = Math.round((done / goal.steps.length) * 100);
            return (
              <div key={goal.id} className="bg-secondary rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-serif text-foreground">{goal.title}</h3>
                  <span className="text-xs text-muted-foreground">{done}/{goal.steps.length}</span>
                </div>
                <Progress value={pct} className="h-2 mb-3" />
                <div className="space-y-1.5">
                  {goal.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Checkbox checked={step.done} onCheckedChange={() => toggleGoalStep(goal.id, i)} />
                      <span className={`text-sm ${step.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* To-Do List */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">To-Do List</CardTitle>
          <div className="flex gap-2 mt-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="bg-secondary border-border text-xs h-8 w-28">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {Object.entries(categoryLabels).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="bg-secondary border-border text-xs h-8 w-24">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {filtered.map(todo => (
            <div key={todo.id} className="flex items-center gap-2 py-2 border-b border-border/50 last:border-0">
              <Checkbox checked={todo.done} onCheckedChange={() => toggleTodo(todo.id)} />
              <span className={`text-sm flex-1 ${todo.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{todo.title}</span>
              <Badge variant="outline" className={`text-[10px] ${priorityColors[todo.priority]} border-0`}>{todo.priority}</Badge>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => deleteTodo(todo.id)}>
                <Trash2 className="w-3 h-3 text-muted-foreground" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2 mt-3">
            <Input placeholder="New task..." value={newTodo} onChange={e => setNewTodo(e.target.value)} className="bg-secondary border-border text-sm" onKeyDown={e => e.key === "Enter" && addTodo()} />
            <Select value={newPriority} onValueChange={v => setNewPriority(v as Priority)}>
              <SelectTrigger className="w-24 bg-secondary border-border text-xs h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button size="icon" onClick={addTodo} className="shrink-0 h-9 w-9">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Self-Care Ideas */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-2">
          <Button variant="ghost" className="w-full justify-between" onClick={() => setShowSelfCare(!showSelfCare)}>
            <span className="flex items-center gap-2 font-serif text-lg">
              <Heart className="w-5 h-5 text-lavender" />
              Self-Care Ideas
            </span>
            <Sparkles className="w-4 h-4 text-lavender" />
          </Button>
        </CardHeader>
        {showSelfCare && (
          <CardContent className="space-y-2">
            {selfCareIdeas.map((idea, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 border-b border-border/50 last:border-0">
                <span className="text-sm text-foreground">💜 {idea}</span>
              </div>
            ))}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default GoalsTodo;
