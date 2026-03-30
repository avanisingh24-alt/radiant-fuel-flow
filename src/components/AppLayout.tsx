import { useState } from "react";
import { UtensilsCrossed, Sparkles, Dumbbell, ShoppingCart, ShoppingBag } from "lucide-react";
import MealPlanner from "@/pages/MealPlanner";
import Skincare from "@/pages/Skincare";
import Fitness from "@/pages/Fitness";
import Restocking from "@/pages/Restocking";
import GroceryList from "@/pages/GroceryList";

const tabs = [
  { id: "meals", label: "Meals", icon: UtensilsCrossed },
  { id: "grocery", label: "Grocery", icon: ShoppingBag },
  { id: "skincare", label: "Skincare", icon: Sparkles },
  { id: "fitness", label: "Fitness", icon: Dumbbell },
  { id: "restock", label: "Restock", icon: ShoppingCart },
] as const;

type TabId = (typeof tabs)[number]["id"];

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState<TabId>("meals");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-serif text-foreground tracking-widest">
              GLOW<span className="text-primary gothic-glow">HUB</span>
            </h1>
          </div>
          <nav className="flex gap-1 pb-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap tracking-wider uppercase ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_-4px_hsl(var(--crimson)/0.5)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "meals" && <MealPlanner />}
        {activeTab === "grocery" && <GroceryList />}
        {activeTab === "skincare" && <Skincare />}
        {activeTab === "fitness" && <Fitness />}
        {activeTab === "restock" && <Restocking />}
      </main>
    </div>
  );
};

export default AppLayout;
