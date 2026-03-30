import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flower2, Sun, Wind, Heart } from "lucide-react";

type Energy = "low" | "medium" | "high";
type Cost = "free" | "budget" | "splurge";
type ActivityType = "outdoor" | "indoor" | "social" | "solo" | "creative";
type Mood = "calm" | "energized" | "romantic" | "playful" | "reflective";

interface Activity {
  title: string;
  description: string;
  energy: Energy;
  cost: Cost;
  type: ActivityType;
  mood: Mood;
  emoji: string;
}

const activities: Activity[] = [
  { title: "Cherry Blossom Walk", description: "Find a local park with blooming trees. Bring a thermos of tea and just breathe.", energy: "low", cost: "free", type: "outdoor", mood: "calm", emoji: "🌸" },
  { title: "Sunrise Yoga in the Park", description: "Roll out your mat at dawn. Let the spring air and birdsong be your soundtrack.", energy: "medium", cost: "free", type: "outdoor", mood: "calm", emoji: "🧘" },
  { title: "Farmers Market Haul", description: "Explore seasonal produce — strawberries, asparagus, fresh herbs. Plan meals around what inspires you.", energy: "low", cost: "budget", type: "outdoor", mood: "playful", emoji: "🫐" },
  { title: "Spring Deep Clean Ritual", description: "Put on a playlist, open all windows, and cleanse your space. Donate what no longer serves you.", energy: "high", cost: "free", type: "indoor", mood: "energized", emoji: "✨" },
  { title: "Picnic Date", description: "Pack charcuterie, fruit, and sparkling water. Find a quiet spot and disconnect from screens.", energy: "low", cost: "budget", type: "outdoor", mood: "romantic", emoji: "🧺" },
  { title: "Plant a Window Garden", description: "Start with herbs — basil, mint, rosemary. Watch something grow alongside your goals.", energy: "medium", cost: "budget", type: "indoor", mood: "reflective", emoji: "🌱" },
  { title: "Outdoor HIIT Session", description: "Take your workout outside. Burpees, jump rope, sprints in the fresh air hit different.", energy: "high", cost: "free", type: "outdoor", mood: "energized", emoji: "🏃‍♀️" },
  { title: "Rooftop Sunset Watch", description: "Find the highest spot you can. Bring a journal. Write down what you're releasing this season.", energy: "low", cost: "free", type: "outdoor", mood: "reflective", emoji: "🌅" },
  { title: "DIY Face Mask Night", description: "Honey + oat + yogurt mask. Light candles. This is your spa.", energy: "low", cost: "free", type: "indoor", mood: "calm", emoji: "🍯" },
  { title: "Spring Fashion Capsule", description: "Audit your closet. Build 10 outfits from what you already own. Donate the rest.", energy: "medium", cost: "free", type: "indoor", mood: "playful", emoji: "👗" },
  { title: "Outdoor Painting Session", description: "Grab watercolors and paper. Paint whatever spring looks like to you — no perfection needed.", energy: "medium", cost: "budget", type: "outdoor", mood: "reflective", emoji: "🎨" },
  { title: "Group Hike + Brunch", description: "Rally friends for a morning trail. End at a café for the reward meal.", energy: "high", cost: "budget", type: "social", mood: "energized", emoji: "🥾" },
  { title: "Evening Run + Podcast", description: "Golden hour runs with your favorite podcast. The streets are your gym.", energy: "high", cost: "free", type: "outdoor", mood: "energized", emoji: "🎧" },
  { title: "Letter Writing", description: "Write a handwritten letter to someone you love. Or to your future self.", energy: "low", cost: "free", type: "indoor", mood: "reflective", emoji: "💌" },
  { title: "Dance in the Rain", description: "When the spring showers come — go outside. Let yourself be ridiculous and free.", energy: "medium", cost: "free", type: "outdoor", mood: "playful", emoji: "💃" },
  { title: "Spa Day Splurge", description: "Book a massage or facial. You've earned the reset.", energy: "low", cost: "splurge", type: "solo", mood: "calm", emoji: "🧖" },
  { title: "Cook a New Cuisine", description: "Pick a country you've never cooked from. Make it an event — music, decor, the works.", energy: "medium", cost: "budget", type: "indoor", mood: "playful", emoji: "🍜" },
  { title: "Stargazing Blanket Night", description: "Grab a blanket, drive somewhere dark. Spring constellations are spectacular.", energy: "low", cost: "free", type: "outdoor", mood: "romantic", emoji: "🌙" },
];

const energyColors: Record<Energy, string> = { low: "bg-ocean/20 text-ocean", medium: "bg-terracotta/20 text-terracotta", high: "bg-primary/20 text-primary" };
const costColors: Record<Cost, string> = { free: "bg-green-900/30 text-green-400", budget: "bg-terracotta/20 text-terracotta", splurge: "bg-lavender/20 text-lavender" };
const moodEmoji: Record<Mood, string> = { calm: "🕊️", energized: "⚡", romantic: "💕", playful: "🎉", reflective: "🪞" };

const SeasonalIdeas = () => {
  const [energy, setEnergy] = useState("all");
  const [cost, setCost] = useState("all");
  const [type, setType] = useState("all");
  const [mood, setMood] = useState("all");

  const filtered = activities.filter(a =>
    (energy === "all" || a.energy === energy) &&
    (cost === "all" || a.cost === cost) &&
    (type === "all" || a.type === type) &&
    (mood === "all" || a.mood === mood)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flower2 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-serif text-foreground">Spring Awakening</h2>
          <Flower2 className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground italic">Curated activities for your season of growth</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-2">
        <Select value={energy} onValueChange={setEnergy}>
          <SelectTrigger className="bg-secondary border-border text-xs h-9">
            <SelectValue placeholder="Energy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Energy</SelectItem>
            <SelectItem value="low">Low Energy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High Energy</SelectItem>
          </SelectContent>
        </Select>
        <Select value={cost} onValueChange={setCost}>
          <SelectTrigger className="bg-secondary border-border text-xs h-9">
            <SelectValue placeholder="Cost" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Costs</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="splurge">Splurge</SelectItem>
          </SelectContent>
        </Select>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="bg-secondary border-border text-xs h-9">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
            <SelectItem value="indoor">Indoor</SelectItem>
            <SelectItem value="social">Social</SelectItem>
            <SelectItem value="solo">Solo</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
          </SelectContent>
        </Select>
        <Select value={mood} onValueChange={setMood}>
          <SelectTrigger className="bg-secondary border-border text-xs h-9">
            <SelectValue placeholder="Mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Moods</SelectItem>
            <SelectItem value="calm">🕊️ Calm</SelectItem>
            <SelectItem value="energized">⚡ Energized</SelectItem>
            <SelectItem value="romantic">💕 Romantic</SelectItem>
            <SelectItem value="playful">🎉 Playful</SelectItem>
            <SelectItem value="reflective">🪞 Reflective</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-xs text-muted-foreground text-center">{filtered.length} activities found</p>

      {/* Activity Cards */}
      <div className="space-y-4">
        {filtered.map((activity, i) => (
          <Card key={i} className="bg-card gothic-border card-hover overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{activity.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-serif text-foreground text-base mb-1">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{activity.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <Badge variant="outline" className={`text-[10px] border-0 ${energyColors[activity.energy]}`}>
                      {activity.energy} energy
                    </Badge>
                    <Badge variant="outline" className={`text-[10px] border-0 ${costColors[activity.cost]}`}>
                      {activity.cost}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] border-0 bg-secondary text-secondary-foreground">
                      {activity.type}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] border-0 bg-secondary text-secondary-foreground">
                      {moodEmoji[activity.mood]} {activity.mood}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10">
          <Wind className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No activities match your filters. Try adjusting.</p>
        </div>
      )}
    </div>
  );
};

export default SeasonalIdeas;
