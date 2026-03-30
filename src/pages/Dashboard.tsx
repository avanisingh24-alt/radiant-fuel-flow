import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Sun, Moon, Star, Flame, Target, Heart, Sparkles,
  TrendingUp, Calendar, Dumbbell, ShoppingBag, Droplets
} from "lucide-react";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good Morning", icon: Sun, sub: "Rise with intention." };
  if (hour < 17) return { text: "Good Afternoon", icon: Star, sub: "Stay the course." };
  return { text: "Good Evening", icon: Moon, sub: "Reflect & restore." };
};

const todaySchedule = [
  { time: "6:30 AM", task: "Morning Skincare Ritual", category: "skincare", icon: Droplets },
  { time: "7:00 AM", task: "Peloton HIIT Ride — 30 min", category: "fitness", icon: Dumbbell },
  { time: "8:00 AM", task: "Meal Prep — High Protein Breakfast", category: "meals", icon: ShoppingBag },
  { time: "12:00 PM", task: "Lunch — Grilled Chicken Bowl", category: "meals", icon: ShoppingBag },
  { time: "5:30 PM", task: "Boxing Bag — 20 min", category: "fitness", icon: Dumbbell },
  { time: "9:00 PM", task: "Evening Skincare + Red Light Mask", category: "skincare", icon: Droplets },
];

const goals = [
  { label: "Fat Loss Target", progress: 45, target: "125 lbs", icon: Target },
  { label: "Weekly Workouts", progress: 66, target: "4/6 done", icon: Dumbbell },
  { label: "Skincare Streak", progress: 85, target: "12 days", icon: Sparkles },
  { label: "Meal Plan Adherence", progress: 70, target: "5/7 days", icon: Heart },
];

const habitStreaks = [
  { habit: "Morning Workout", streak: 12, best: 21, icon: Flame },
  { habit: "Skincare Routine", streak: 18, best: 18, icon: Droplets },
  { habit: "Meal Prep", streak: 5, best: 14, icon: ShoppingBag },
  { habit: "Water Intake", streak: 9, best: 30, icon: Droplets },
];

const lifeAreas = [
  { area: "Fitness", score: 75, color: "bg-primary" },
  { area: "Nutrition", score: 68, color: "bg-terracotta" },
  { area: "Skincare", score: 90, color: "bg-lavender" },
  { area: "Finance", score: 55, color: "bg-ocean" },
  { area: "Rest", score: 40, color: "bg-muted-foreground" },
];

const seasonalTips = [
  "🌸 Spring is here — increase Vitamin C serum to fight sun damage",
  "🥗 Seasonal produce: asparagus, strawberries, snap peas — add to meal plan",
  "🏃‍♀️ Longer daylight — move evening walks to 7 PM for golden hour",
];

const quotes = [
  "She remembered who she was and the game changed.",
  "Discipline is choosing between what you want now and what you want most.",
  "Your body hears everything your mind says.",
  "Small daily improvements are the key to staggering long-term results.",
];

const Dashboard = () => {
  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const categoryColor: Record<string, string> = {
    skincare: "text-lavender",
    fitness: "text-primary",
    meals: "text-terracotta",
  };

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="gothic-border rounded-lg p-6 bg-card">
        <div className="flex items-center gap-3 mb-1">
          <GreetingIcon className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-serif text-foreground">{greeting.text}</h2>
        </div>
        <p className="text-muted-foreground text-lg italic">{greeting.sub}</p>
        <p className="text-sm text-muted-foreground mt-1">{today}</p>
      </div>

      {/* Daily Inspiration */}
      <Card className="border-primary/20 bg-card">
        <CardContent className="py-4 px-5">
          <p className="text-center text-foreground italic text-lg font-serif tracking-wide">"{quote}"</p>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5 text-primary" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {todaySchedule.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                <span className="text-xs text-muted-foreground w-16 shrink-0 font-mono">{item.time}</span>
                <Icon className={`w-4 h-4 shrink-0 ${categoryColor[item.category] || "text-muted-foreground"}`} />
                <span className="text-sm text-foreground">{item.task}</span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Goal Progress */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-primary" />
            Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((goal, i) => {
            const Icon = goal.icon;
            return (
              <div key={i}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{goal.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{goal.target}</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            );
          })}
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
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {habitStreaks.map((h, i) => {
              const Icon = h.icon;
              return (
                <div key={i} className="bg-secondary rounded-lg p-3 text-center">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">{h.habit}</p>
                  <p className="text-2xl font-serif text-foreground">{h.streak}</p>
                  <p className="text-[10px] text-muted-foreground">Best: {h.best}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Life Areas Overview */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            Life Areas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {lifeAreas.map((area, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-foreground">{area.area}</span>
                <span className="text-xs text-muted-foreground">{area.score}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full ${area.color} rounded-full transition-all`} style={{ width: `${area.score}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Seasonal Suggestions */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Seasonal Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {seasonalTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5 border-b border-border/50 last:border-0">
              <span className="text-sm text-foreground">{tip}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
