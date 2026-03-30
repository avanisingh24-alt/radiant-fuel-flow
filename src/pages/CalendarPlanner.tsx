import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, Trash2, ChevronLeft, ChevronRight, List, Grid3X3 } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay, isSameMonth, getDay } from "date-fns";

type EventCategory = "fitness" | "skincare" | "meals" | "social" | "self-care" | "errands";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  category: EventCategory;
}

const categoryStyles: Record<EventCategory, { bg: string; text: string; label: string }> = {
  fitness: { bg: "bg-primary/20", text: "text-primary", label: "Fitness" },
  skincare: { bg: "bg-lavender/20", text: "text-lavender", label: "Skincare" },
  meals: { bg: "bg-terracotta/20", text: "text-terracotta", label: "Meals" },
  social: { bg: "bg-ocean/20", text: "text-ocean", label: "Social" },
  "self-care": { bg: "bg-accent/20", text: "text-accent-foreground", label: "Self-Care" },
  errands: { bg: "bg-muted", text: "text-muted-foreground", label: "Errands" },
};

const bestWeekTemplate: Omit<CalendarEvent, "id" | "date">[] = [
  { title: "Morning HIIT", time: "6:30 AM", category: "fitness" },
  { title: "Meal Prep", time: "8:00 AM", category: "meals" },
  { title: "Skincare Ritual", time: "9:00 PM", category: "skincare" },
  { title: "Self-Care Sunday", time: "10:00 AM", category: "self-care" },
  { title: "Grocery Run", time: "11:00 AM", category: "errands" },
  { title: "Boxing Session", time: "5:30 PM", category: "fitness" },
  { title: "Friend Catch-up", time: "7:00 PM", category: "social" },
];

const CalendarPlanner = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: "1", title: "Peloton Ride", date: new Date(), time: "7:00 AM", category: "fitness" },
    { id: "2", title: "Red Light Mask", date: new Date(), time: "9:00 PM", category: "skincare" },
    { id: "3", title: "Meal Prep", date: new Date(), time: "10:00 AM", category: "meals" },
  ]);
  const [view, setView] = useState<"calendar" | "agenda">("calendar");
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newCategory, setNewCategory] = useState<EventCategory>("fitness");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = getDay(monthStart);

  const addEvent = () => {
    if (!newTitle.trim()) return;
    setEvents(prev => [...prev, {
      id: Date.now().toString(),
      title: newTitle,
      date: selectedDate,
      time: newTime || "12:00 PM",
      category: newCategory,
    }]);
    setNewTitle("");
    setNewTime("");
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const loadBestWeek = () => {
    const today = new Date();
    const weekEvents = bestWeekTemplate.map((t, i) => ({
      ...t,
      id: `best-${Date.now()}-${i}`,
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
    }));
    setEvents(prev => [...prev, ...weekEvents]);
  };

  const eventsForDay = (day: Date) => events.filter(e => isSameDay(e.date, day));
  const monthEvents = events.filter(e => isSameMonth(e.date, currentMonth)).sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-serif text-foreground">{format(currentMonth, "MMMM yyyy")}</h2>
          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant={view === "calendar" ? "default" : "outline"} size="sm" onClick={() => setView("calendar")}>
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant={view === "agenda" ? "default" : "outline"} size="sm" onClick={() => setView("agenda")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Category Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(categoryStyles).map(([key, style]) => (
          <Badge key={key} variant="outline" className={`${style.bg} ${style.text} border-0 text-xs`}>
            {style.label}
          </Badge>
        ))}
      </div>

      {/* Calendar Grid */}
      {view === "calendar" && (
        <Card className="bg-card gothic-border">
          <CardContent className="p-3">
            <div className="grid grid-cols-7 gap-px">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d} className="text-center text-xs text-muted-foreground py-2 font-serif">{d}</div>
              ))}
              {Array.from({ length: startPadding }).map((_, i) => (
                <div key={`pad-${i}`} className="min-h-[60px]" />
              ))}
              {days.map(day => {
                const dayEvents = eventsForDay(day);
                const isSelected = isSameDay(day, selectedDate);
                const isToday = isSameDay(day, new Date());
                return (
                  <div
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`min-h-[60px] p-1 rounded cursor-pointer transition-colors ${
                      isSelected ? "bg-primary/10 ring-1 ring-primary" : "hover:bg-secondary"
                    } ${isToday ? "border border-primary/30" : ""}`}
                  >
                    <span className={`text-xs ${isToday ? "text-primary font-bold" : "text-foreground"}`}>
                      {format(day, "d")}
                    </span>
                    <div className="space-y-0.5 mt-0.5">
                      {dayEvents.slice(0, 2).map(e => (
                        <div key={e.id} className={`text-[9px] px-1 rounded truncate ${categoryStyles[e.category].bg} ${categoryStyles[e.category].text}`}>
                          {e.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-[9px] text-muted-foreground">+{dayEvents.length - 2}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agenda View */}
      {view === "agenda" && (
        <Card className="bg-card gothic-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Agenda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {monthEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No events this month</p>
            ) : (
              monthEvents.map(e => (
                <div key={e.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${categoryStyles[e.category].bg.replace("/20", "")}`} style={{ backgroundColor: `hsl(var(--${e.category === "fitness" ? "primary" : e.category === "skincare" ? "lavender" : e.category === "meals" ? "terracotta" : e.category === "social" ? "ocean" : "accent"}))` }} />
                    <div>
                      <p className="text-sm text-foreground">{e.title}</p>
                      <p className="text-xs text-muted-foreground">{format(e.date, "MMM d")} · {e.time}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteEvent(e.id)} className="h-7 w-7">
                    <Trash2 className="w-3 h-3 text-muted-foreground" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Event */}
      <Card className="bg-card gothic-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            Add Event — {format(selectedDate, "MMM d")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Event title..." value={newTitle} onChange={e => setNewTitle(e.target.value)} className="bg-secondary border-border" />
          <div className="flex gap-2">
            <Input placeholder="Time (e.g. 7:00 AM)" value={newTime} onChange={e => setNewTime(e.target.value)} className="bg-secondary border-border flex-1" />
            <Select value={newCategory} onValueChange={v => setNewCategory(v as EventCategory)}>
              <SelectTrigger className="w-32 bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryStyles).map(([key, style]) => (
                  <SelectItem key={key} value={key}>{style.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addEvent} className="w-full">Add Event</Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={loadBestWeek} className="flex-1 text-sm">
          ✨ Load "Best Week" Template
        </Button>
        <Button variant="outline" className="flex-1 text-sm opacity-50" disabled>
          📅 Sync Calendar (Coming Soon)
        </Button>
      </div>
    </div>
  );
};

export default CalendarPlanner;
