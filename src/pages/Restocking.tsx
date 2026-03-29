import { useState } from "react";
import { ShoppingCart, AlertTriangle, Check, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface RestockItem {
  id: string;
  name: string;
  category: "skincare" | "fitness" | "nutrition";
  cost: number;
  lastPurchased: string;
  estimatedLifespan: number; // days
  daysUsed: number;
}

const initialItems: RestockItem[] = [
  { id: "1", name: "AmLactin Intensive Healing Lotion", category: "skincare", cost: 16.99, lastPurchased: "2025-02-15", estimatedLifespan: 60, daysUsed: 42 },
  { id: "2", name: "Aveeno Skin Relief Body Wash", category: "skincare", cost: 9.49, lastPurchased: "2025-02-20", estimatedLifespan: 45, daysUsed: 37 },
  { id: "3", name: "Jojoba Oil (8 oz)", category: "skincare", cost: 13.99, lastPurchased: "2025-01-10", estimatedLifespan: 90, daysUsed: 78 },
  { id: "4", name: "Nature Republic Aloe Vera Gel (3pk)", category: "skincare", cost: 14.99, lastPurchased: "2025-01-25", estimatedLifespan: 75, daysUsed: 63 },
  { id: "5", name: "NIVEA Cocoa Butter Cream", category: "skincare", cost: 7.49, lastPurchased: "2025-02-01", estimatedLifespan: 60, daysUsed: 56 },
  { id: "6", name: "Naturium Bio-Lipid Body Lotion", category: "skincare", cost: 15.99, lastPurchased: "2025-02-10", estimatedLifespan: 50, daysUsed: 40 },
  { id: "7", name: "Aquaphor Healing Ointment", category: "skincare", cost: 14.49, lastPurchased: "2025-01-15", estimatedLifespan: 90, daysUsed: 73 },
  { id: "8", name: "Strawberry KP Lotion", category: "skincare", cost: 12.99, lastPurchased: "2025-02-05", estimatedLifespan: 45, daysUsed: 40 },
  { id: "9", name: "Anti-Aging Face Moisturizer (Retinol)", category: "skincare", cost: 19.99, lastPurchased: "2025-02-01", estimatedLifespan: 60, daysUsed: 56 },
  { id: "10", name: "Exfoliating Gloves (4pk)", category: "skincare", cost: 7.99, lastPurchased: "2025-01-01", estimatedLifespan: 90, daysUsed: 88 },
  { id: "11", name: "Resistance Bands Set", category: "fitness", cost: 12.99, lastPurchased: "2024-12-01", estimatedLifespan: 180, daysUsed: 118 },
  { id: "12", name: "Jump Rope", category: "fitness", cost: 9.99, lastPurchased: "2024-11-15", estimatedLifespan: 240, daysUsed: 134 },
];

const Restocking = () => {
  const [items] = useState<RestockItem[]>(initialItems);

  const getStatus = (item: RestockItem) => {
    const remaining = item.estimatedLifespan - item.daysUsed;
    const pct = (item.daysUsed / item.estimatedLifespan) * 100;
    if (remaining <= 0) return { label: "Restock Now!", color: "text-destructive", pct: 100 };
    if (remaining <= 7) return { label: `${remaining} days left`, color: "text-terracotta", pct };
    if (remaining <= 14) return { label: `${remaining} days left`, color: "text-yellow-600", pct };
    return { label: `${remaining} days left`, color: "text-wellness", pct };
  };

  const urgent = items.filter((i) => (i.estimatedLifespan - i.daysUsed) <= 7);
  const upcoming = items.filter((i) => {
    const rem = i.estimatedLifespan - i.daysUsed;
    return rem > 7 && rem <= 21;
  });
  const good = items.filter((i) => (i.estimatedLifespan - i.daysUsed) > 21);

  const totalMonthlyCost = items.reduce((sum, i) => sum + (i.cost / i.estimatedLifespan) * 30, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-2">Restocking Tracker</h2>
        <p className="text-muted-foreground">
          Track your products, estimated costs, and when to restock.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-destructive" />
            <p className="text-2xl font-serif font-bold">{urgent.length}</p>
            <p className="text-sm text-muted-foreground">Need Restocking</p>
          </CardContent>
        </Card>
        <Card className="bg-terracotta-light border-terracotta/20">
          <CardContent className="pt-6 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-terracotta" />
            <p className="text-2xl font-serif font-bold">{upcoming.length}</p>
            <p className="text-sm text-muted-foreground">Coming Up (2-3 weeks)</p>
          </CardContent>
        </Card>
        <Card className="bg-wellness-light border-wellness/20">
          <CardContent className="pt-6 text-center">
            <ShoppingCart className="w-6 h-6 mx-auto mb-2 text-wellness" />
            <p className="text-2xl font-serif font-bold">${totalMonthlyCost.toFixed(0)}/mo</p>
            <p className="text-sm text-muted-foreground">Estimated Monthly Cost</p>
          </CardContent>
        </Card>
      </div>

      {/* Urgent */}
      {urgent.length > 0 && (
        <div>
          <h3 className="text-xl font-serif mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Restock Soon
          </h3>
          <div className="space-y-3">
            {urgent.map((item) => (
              <RestockCard key={item.id} item={item} status={getStatus(item)} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div>
          <h3 className="text-xl font-serif mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-terracotta" />
            Upcoming
          </h3>
          <div className="space-y-3">
            {upcoming.map((item) => (
              <RestockCard key={item.id} item={item} status={getStatus(item)} />
            ))}
          </div>
        </div>
      )}

      {/* All Good */}
      {good.length > 0 && (
        <div>
          <h3 className="text-xl font-serif mb-3 flex items-center gap-2">
            <Check className="w-5 h-5 text-wellness" />
            Stocked Up
          </h3>
          <div className="space-y-3">
            {good.map((item) => (
              <RestockCard key={item.id} item={item} status={getStatus(item)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const RestockCard = ({
  item,
  status,
}: {
  item: RestockItem;
  status: { label: string; color: string; pct: number };
}) => (
  <Card className="card-hover">
    <CardContent className="py-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="font-medium text-sm">{item.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs capitalize">{item.category}</Badge>
            <span className="text-xs text-muted-foreground">${item.cost.toFixed(2)}</span>
          </div>
        </div>
        <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
      </div>
      <Progress value={status.pct} className="h-1.5" />
    </CardContent>
  </Card>
);

export default Restocking;
