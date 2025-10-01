import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  Video,
  User,
  CheckCircle,
  X
} from "lucide-react";
import { mockSessions, mockClients, mockStaff } from "@/data/mockData";
import { Session, Client, Staff } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CalendarView() {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [sessions, setSessions] = useLocalStorage<Session[]>('clinic_sessions', mockSessions);
  const [clients] = useLocalStorage<Client[]>('clinic_clients', mockClients);
  const [staff] = useLocalStorage<Staff[]>('clinic_staff', mockStaff);

  const getClientById = (id: string) => clients.find(c => c.id === id);
  const getStaffById = (id: string) => staff.find(s => s.id === id);

  // Get current month sessions
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const monthSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
  });

  const handleUpdateSessionStatus = (sessionId: string, status: 'completed' | 'cancelled') => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status }
        : session
    ));
    toast({
      title: `Session ${status}`,
      description: `The session has been marked as ${status}.`,
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const getSessionsForDay = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return monthSessions.filter(session => session.date === dateString);
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage sessions and appointments across your clinic.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={viewMode} onValueChange={(value: 'month' | 'week' | 'day') => setViewMode(value)}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <NewSessionDialog />
        </div>
      </div>

      {/* Calendar Header */}
      <Card className="card-shadow border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="bg-muted p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = day.toDateString() === new Date().toDateString();
              const daySessions = getSessionsForDay(day);
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] bg-card p-2 ${
                    !isCurrentMonth ? 'opacity-30' : ''
                  } ${isToday ? 'bg-primary/5 border-2 border-primary/20' : 'border border-transparent'}`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    isToday ? 'text-primary' : isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {day.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {daySessions.slice(0, 3).map((session) => {
                      const client = getClientById(session.clientId);
                      const staff = getStaffById(session.staffId);
                      
                      return (
                        <SessionCard
                          key={session.id}
                          session={session}
                          client={client}
                          staff={staff}
                          isCompact={true}
                        />
                      );
                    })}
                    {daySessions.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center py-1">
                        +{daySessions.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Today's Sessions */}
      <Card className="card-shadow border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Today's Sessions
          </CardTitle>
          <CardDescription>
            Sessions scheduled for {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions
              .filter(session => session.date === new Date().toISOString().split('T')[0])
              .map((session) => {
                const client = getClientById(session.clientId);
                const staff = getStaffById(session.staffId);
                
                return (
                  <SessionCard
                    key={session.id}
                    session={session}
                    client={client}
                    staff={staff}
                    isCompact={false}
                    showActions={true}
                    onUpdateStatus={handleUpdateSessionStatus}
                  />
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Session Card Component
function SessionCard({ 
  session, 
  client, 
  staff, 
  isCompact = false, 
  showActions = false,
  onUpdateStatus 
}: {
  session: any;
  client: any;
  staff: any;
  isCompact?: boolean;
  showActions?: boolean;
  onUpdateStatus?: (sessionId: string, status: 'completed' | 'cancelled') => void;
}) {
  if (isCompact) {
    return (
      <div className={`p-2 rounded text-xs border ${
        session.type === 'online' ? 'bg-primary-soft border-primary/20' : 'bg-secondary-soft border-secondary/20'
      }`}>
        <div className="font-medium truncate">{client?.name}</div>
        <div className="text-muted-foreground">{session.startTime}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${
          session.type === 'online' ? 'bg-primary-soft text-primary' : 'bg-secondary-soft text-secondary'
        }`}>
          {session.type === 'online' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
        </div>
        
        <div className="space-y-1">
          <div className="font-medium">{client?.name}</div>
          <div className="text-sm text-muted-foreground">
            {session.startTime} - {session.duration} mins with {staff?.name}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Badge 
          variant="secondary"
          className={
            session.status === 'completed' ? 'status-completed' :
            session.status === 'pending' ? 'status-pending' :
            session.status === 'cancelled' ? 'status-cancelled' : 'status-scheduled'
          }
        >
          {session.status}
        </Badge>
        
        {showActions && session.status !== 'completed' && session.status !== 'cancelled' && onUpdateStatus && (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onUpdateStatus(session.id, 'cancelled')}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button 
              size="sm" 
              className="bg-success hover:bg-success/90"
              onClick={() => onUpdateStatus(session.id, 'completed')}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// New Session Dialog
function NewSessionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule New Session</DialogTitle>
          <DialogDescription>
            Add a new therapy session to the calendar.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="client">Client</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="c1">John Smith</SelectItem>
                <SelectItem value="c2">Emily Johnson</SelectItem>
                <SelectItem value="c3">Michael Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="staff">Staff</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="s1">Dr. Brown</SelectItem>
                <SelectItem value="s2">Dr. Smith</SelectItem>
                <SelectItem value="s3">Therapist Angela</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input type="time" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label>Duration</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="40">40 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-gradient-to-r from-primary to-accent">
            Schedule Session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}