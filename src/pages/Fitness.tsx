import { useState } from "react";
import { Bike, Dumbbell, Timer, Flame, ChevronLeft, ChevronRight, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Exercise {
  name: string;
  sets?: string;
  reps?: string;
  duration?: string;
  equipment: string;
  notes?: string;
}

interface DayPlan {
  day: string;
  focus: string;
  type: string;
  caloriesBurned: number;
  exercises: Exercise[];
}

const weeklyPlans: DayPlan[][] = [
  // Week 1
  [
    {
      day: "Monday",
      focus: "Upper Body Strength",
      type: "Strength",
      caloriesBurned: 350,
      exercises: [
        { name: "Dumbbell Bench Press", sets: "4", reps: "10", equipment: "Dumbbells" },
        { name: "Dumbbell Rows", sets: "4", reps: "12 each", equipment: "Dumbbells" },
        { name: "Shoulder Press", sets: "3", reps: "12", equipment: "Dumbbells" },
        { name: "Bicep Curls", sets: "3", reps: "15", equipment: "Dumbbells" },
        { name: "Tricep Kickbacks", sets: "3", reps: "12", equipment: "Dumbbells" },
        { name: "Resistance Band Pull-Aparts", sets: "3", reps: "20", equipment: "Bands" },
      ],
    },
    {
      day: "Tuesday",
      focus: "Peloton HIIT Ride + Core",
      type: "Cardio + Core",
      caloriesBurned: 450,
      exercises: [
        { name: "Peloton HIIT & Hills Ride", duration: "30 min", equipment: "Peloton" },
        { name: "Plank Hold", sets: "3", duration: "45 sec", equipment: "Bodyweight" },
        { name: "Bicycle Crunches", sets: "3", reps: "20", equipment: "Bodyweight" },
        { name: "Dead Bug", sets: "3", reps: "12 each side", equipment: "Bodyweight" },
        { name: "Mountain Climbers", sets: "3", duration: "30 sec", equipment: "Bodyweight" },
      ],
    },
    {
      day: "Wednesday",
      focus: "Lower Body Strength",
      type: "Strength",
      caloriesBurned: 380,
      exercises: [
        { name: "Goblet Squats", sets: "4", reps: "12", equipment: "Dumbbells" },
        { name: "Romanian Deadlifts", sets: "4", reps: "10", equipment: "Dumbbells" },
        { name: "Walking Lunges", sets: "3", reps: "12 each", equipment: "Dumbbells", notes: "Wear ankle weights" },
        { name: "Banded Glute Bridges", sets: "4", reps: "15", equipment: "Bands" },
        { name: "Calf Raises", sets: "3", reps: "20", equipment: "Dumbbells" },
        { name: "Banded Lateral Walks", sets: "3", reps: "15 each", equipment: "Bands" },
      ],
    },
    {
      day: "Thursday",
      focus: "Boxing + Jump Rope",
      type: "Cardio",
      caloriesBurned: 500,
      exercises: [
        { name: "Jump Rope Warm-Up", duration: "5 min", equipment: "Jump Rope" },
        { name: "Heavy Bag Combos", duration: "3 min rounds x 6", equipment: "Boxing Bag", notes: "1 min rest between rounds" },
        { name: "Jump Rope Intervals", duration: "30 sec on / 15 sec off x 8", equipment: "Jump Rope" },
        { name: "Shadow Boxing", duration: "5 min", equipment: "Bodyweight" },
        { name: "Cool Down Walk", duration: "10 min", equipment: "Outdoor" },
      ],
    },
    {
      day: "Friday",
      focus: "Full Body Strength",
      type: "Strength",
      caloriesBurned: 400,
      exercises: [
        { name: "Dumbbell Thrusters", sets: "4", reps: "10", equipment: "Dumbbells" },
        { name: "Renegade Rows", sets: "3", reps: "10 each", equipment: "Dumbbells" },
        { name: "Sumo Squats", sets: "4", reps: "12", equipment: "Dumbbells" },
        { name: "Push-Ups", sets: "3", reps: "15", equipment: "Bodyweight" },
        { name: "Weighted Vest Walk", duration: "20 min", equipment: "Weighted Vest", notes: "8 lb vest, brisk pace" },
      ],
    },
    {
      day: "Saturday",
      focus: "Active Recovery + Yoga",
      type: "Recovery",
      caloriesBurned: 200,
      exercises: [
        { name: "Peloton Low-Impact Ride", duration: "20 min", equipment: "Peloton" },
        { name: "Yoga Flow", duration: "30 min", equipment: "Yoga Block", notes: "Focus on hip openers and stretching" },
        { name: "Foam Rolling", duration: "10 min", equipment: "Bodyweight" },
        { name: "Outdoor Walk", duration: "20 min", equipment: "Outdoor" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      type: "Rest",
      caloriesBurned: 100,
      exercises: [
        { name: "Light Walk", duration: "20-30 min", equipment: "Outdoor", notes: "Easy pace, active recovery" },
        { name: "Gentle Stretching", duration: "15 min", equipment: "Bodyweight" },
      ],
    },
  ],
  // Week 2
  [
    {
      day: "Monday",
      focus: "Push Day (Chest/Shoulders/Triceps)",
      type: "Strength",
      caloriesBurned: 370,
      exercises: [
        { name: "Dumbbell Floor Press", sets: "4", reps: "12", equipment: "Dumbbells" },
        { name: "Arnold Press", sets: "3", reps: "10", equipment: "Dumbbells" },
        { name: "Lateral Raises", sets: "3", reps: "15", equipment: "Dumbbells" },
        { name: "Diamond Push-Ups", sets: "3", reps: "12", equipment: "Bodyweight" },
        { name: "Overhead Tricep Extension", sets: "3", reps: "12", equipment: "Dumbbells" },
        { name: "Band Face Pulls", sets: "3", reps: "20", equipment: "Bands" },
      ],
    },
    {
      day: "Tuesday",
      focus: "Peloton Power Zone + Abs",
      type: "Cardio + Core",
      caloriesBurned: 420,
      exercises: [
        { name: "Peloton Power Zone Ride", duration: "30 min", equipment: "Peloton" },
        { name: "Hanging Knee Raises (or lying)", sets: "3", reps: "15", equipment: "Bodyweight" },
        { name: "Russian Twists", sets: "3", reps: "20", equipment: "Dumbbells", notes: "Light dumbbell" },
        { name: "Plank to Push-Up", sets: "3", reps: "10", equipment: "Bodyweight" },
        { name: "Flutter Kicks", sets: "3", duration: "30 sec", equipment: "Bodyweight" },
      ],
    },
    {
      day: "Wednesday",
      focus: "Pull Day (Back/Biceps)",
      type: "Strength",
      caloriesBurned: 360,
      exercises: [
        { name: "Dumbbell Bent-Over Rows", sets: "4", reps: "10", equipment: "Dumbbells" },
        { name: "Single Arm Rows", sets: "3", reps: "12 each", equipment: "Dumbbells" },
        { name: "Reverse Flyes", sets: "3", reps: "15", equipment: "Dumbbells" },
        { name: "Hammer Curls", sets: "3", reps: "12", equipment: "Dumbbells" },
        { name: "Concentration Curls", sets: "3", reps: "10 each", equipment: "Dumbbells" },
        { name: "Band Pull-Aparts", sets: "3", reps: "20", equipment: "Bands" },
      ],
    },
    {
      day: "Thursday",
      focus: "Boxing + Outdoor Run",
      type: "Cardio",
      caloriesBurned: 550,
      exercises: [
        { name: "Outdoor Run", duration: "20 min", equipment: "Outdoor", notes: "Moderate pace" },
        { name: "Heavy Bag Rounds", duration: "3 min x 5", equipment: "Boxing Bag", notes: "Focus on combos & footwork" },
        { name: "Speed Bag or Shadow Box", duration: "3 min x 3", equipment: "Boxing Bag" },
        { name: "Jump Rope Finisher", duration: "5 min", equipment: "Jump Rope" },
        { name: "Cool Down Stretch", duration: "5 min", equipment: "Bodyweight" },
      ],
    },
    {
      day: "Friday",
      focus: "Leg Day + Glutes",
      type: "Strength",
      caloriesBurned: 400,
      exercises: [
        { name: "Bulgarian Split Squats", sets: "3", reps: "10 each", equipment: "Dumbbells" },
        { name: "Stiff-Leg Deadlifts", sets: "4", reps: "12", equipment: "Dumbbells" },
        { name: "Banded Hip Thrusts", sets: "4", reps: "15", equipment: "Bands" },
        { name: "Step-Ups", sets: "3", reps: "12 each", equipment: "Dumbbells", notes: "Ankle weights on" },
        { name: "Weighted Vest Walk", duration: "25 min", equipment: "Weighted Vest" },
      ],
    },
    {
      day: "Saturday",
      focus: "Peloton Endurance + Mobility",
      type: "Cardio + Recovery",
      caloriesBurned: 280,
      exercises: [
        { name: "Peloton Endurance Ride", duration: "45 min", equipment: "Peloton" },
        { name: "Yoga for Recovery", duration: "20 min", equipment: "Yoga Block" },
        { name: "Foam Rolling", duration: "10 min", equipment: "Bodyweight" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      type: "Rest",
      caloriesBurned: 100,
      exercises: [
        { name: "Nature Walk", duration: "30 min", equipment: "Outdoor" },
        { name: "Gentle Stretching", duration: "15 min", equipment: "Bodyweight" },
      ],
    },
  ],
];

const typeColors: Record<string, string> = {
  Strength: "bg-terracotta-light text-terracotta",
  Cardio: "bg-ocean-light text-ocean",
  "Cardio + Core": "bg-ocean-light text-ocean",
  "Cardio + Recovery": "bg-lavender-light text-lavender",
  Recovery: "bg-lavender-light text-lavender",
  Rest: "bg-wellness-light text-wellness",
};

const Fitness = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const plan = weeklyPlans[currentWeek];
  const totalCalories = plan.reduce((sum, d) => sum + d.caloriesBurned, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-2">Fitness Plan</h2>
        <p className="text-muted-foreground">
          6-day split for fat loss at 130 lbs / 5'5" — cycles weekly.
        </p>
      </div>

      {/* Week Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
              disabled={currentWeek === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="text-center">
              <h3 className="font-serif text-xl">Week {currentWeek + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Est. {totalCalories.toLocaleString()} calories burned
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentWeek(Math.min(weeklyPlans.length - 1, currentWeek + 1))}
              disabled={currentWeek === weeklyPlans.length - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-4">
            <div className="text-center p-3 rounded-lg bg-wellness-light">
              <Target className="w-4 h-4 mx-auto mb-1 text-wellness" />
              <p className="text-xs text-muted-foreground">Goal</p>
              <p className="font-semibold text-sm">Fat Loss</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-terracotta-light">
              <Dumbbell className="w-4 h-4 mx-auto mb-1 text-terracotta" />
              <p className="text-xs text-muted-foreground">Strength</p>
              <p className="font-semibold text-sm">{plan.filter((d) => d.type === "Strength").length}x</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-ocean-light">
              <Bike className="w-4 h-4 mx-auto mb-1 text-ocean" />
              <p className="text-xs text-muted-foreground">Cardio</p>
              <p className="font-semibold text-sm">{plan.filter((d) => d.type.includes("Cardio")).length}x</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-lavender-light">
              <Timer className="w-4 h-4 mx-auto mb-1 text-lavender" />
              <p className="text-xs text-muted-foreground">Recovery</p>
              <p className="font-semibold text-sm">{plan.filter((d) => d.type.includes("Recovery") || d.type === "Rest").length}x</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Plans */}
      <div className="space-y-4">
        {plan.map((day) => (
          <Card key={day.day} className="card-hover overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-serif">{day.day}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{day.focus}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={typeColors[day.type] || "bg-muted text-muted-foreground"}>
                    {day.type}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Flame className="w-3.5 h-3.5 text-terracotta" />
                    {day.caloriesBurned}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {day.exercises.map((ex, i) => (
                  <div key={i} className="flex items-start justify-between text-sm py-2 border-b last:border-0 border-border">
                    <div className="flex-1">
                      <span className="font-medium">{ex.name}</span>
                      {ex.notes && <p className="text-xs text-muted-foreground mt-0.5">{ex.notes}</p>}
                    </div>
                    <div className="text-right text-muted-foreground text-xs ml-4">
                      {ex.sets && ex.reps && <span>{ex.sets} × {ex.reps}</span>}
                      {ex.duration && !ex.sets && <span>{ex.duration}</span>}
                      {ex.sets && ex.duration && <span>{ex.sets} × {ex.duration}</span>}
                      <p className="text-muted-foreground/60">{ex.equipment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Fitness;
