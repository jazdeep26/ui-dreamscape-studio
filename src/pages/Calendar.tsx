import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  X,
  Filter
} from "lucide-react";
import { mockSessions, mockClients, mockStaff } from "@/data/mockData";
import { Session, Client, Staff } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const getClientById = (id: string) => clients.find(c => c.id === id);
  const getStaffById = (id: string) => staff.find(s => s.id === id);

  // Get current month sessions
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const monthSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    const matchesMonth = sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
    const matchesStaff = selectedStaffIds.length === 0 || selectedStaffIds.includes(session.staffId);
    return matchesMonth && matchesStaff;
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

  const toggleStaffFilter = (staffId: string) => {
    setSelectedStaffIds(prev => 
      prev.includes(staffId) 
        ? prev.filter(id => id !== staffId)
        : [...prev, staffId]
    );
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
    <div className="space-y-4 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage sessions and appointments across your clinic.
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Popover open={showFilters} onOpenChange={setShowFilters}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter by Staff</span>
                  {selectedStaffIds.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedStaffIds.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="end">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Filter by Staff</h4>
                    <div className="space-y-2">
                      {staff.map((member) => (
                        <div key={member.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={member.id}
                            checked={selectedStaffIds.includes(member.id)}
                            onCheckedChange={() => toggleStaffFilter(member.id)}
                          />
                          <label
                            htmlFor={member.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {member.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selectedStaffIds.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedStaffIds([])}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <Select value={viewMode} onValueChange={(value: 'month' | 'week' | 'day') => setViewMode(value)}>
              <SelectTrigger className="w-28 sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Calendar Header */}
      <Card className="card-shadow border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg sm:text-xl font-semibold whitespace-nowrap">
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
        <CardContent className="p-2 sm:p-6">
          {/* Mobile: List view */}
          <div className="block sm:hidden space-y-2">
            {calendarDays
              .filter(day => day.getMonth() === currentDate.getMonth())
              .map((day, index) => {
                const isToday = day.toDateString() === new Date().toDateString();
                const daySessions = getSessionsForDay(day);
                
                if (daySessions.length === 0) return null;
                
                return (
                  <div key={index} className="border rounded-lg p-3">
                    <div className={`text-sm font-medium mb-2 ${isToday ? 'text-primary' : ''}`}>
                      {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="space-y-2">
                      {daySessions.map((session) => {
                        const client = getClientById(session.clientId);
                        const staffMember = getStaffById(session.staffId);
                        
                        return (
                          <div key={session.id} className="p-2 rounded-lg border bg-card text-xs">
                            <div className="font-medium">{client?.name}</div>
                            <div className="text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              {session.startTime} • {staffMember?.name}
                            </div>
                            <Badge 
                              variant="secondary"
                              className={`mt-2 text-xs ${
                                session.status === 'completed' ? 'status-completed' :
                                session.status === 'pending' ? 'status-pending' :
                                session.status === 'cancelled' ? 'status-cancelled' : 'status-scheduled'
                              }`}
                            >
                              {session.status}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Desktop: Calendar Grid */}
          <div className="hidden sm:grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
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
                  className={`min-h-[100px] lg:min-h-[120px] bg-card p-2 ${
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
                      const staffMember = getStaffById(session.staffId);
                      
                      return (
                        <SessionCard
                          key={session.id}
                          session={session}
                          client={client}
                          staff={staffMember}
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
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Clock className="h-5 w-5 text-primary" />
            Today's Sessions
          </CardTitle>
          <CardDescription className="text-sm">
            Sessions scheduled for {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions
              .filter(session => {
                const isToday = session.date === new Date().toISOString().split('T')[0];
                const matchesStaff = selectedStaffIds.length === 0 || selectedStaffIds.includes(session.staffId);
                return isToday && matchesStaff;
              })
              .map((session) => {
                const client = getClientById(session.clientId);
                const staffMember = getStaffById(session.staffId);
                
                return (
                  <SessionCard
                    key={session.id}
                    session={session}
                    client={client}
                    staff={staffMember}
                    isCompact={false}
                    showActions={true}
                    onUpdateStatus={handleUpdateSessionStatus}
                  />
                );
              })}
            {sessions.filter(session => {
              const isToday = session.date === new Date().toISOString().split('T')[0];
              const matchesStaff = selectedStaffIds.length === 0 || selectedStaffIds.includes(session.staffId);
              return isToday && matchesStaff;
            }).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No sessions scheduled for today</p>
              </div>
            )}
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
        <div className="text-muted-foreground truncate">{session.startTime}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors gap-4">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className={`p-2 rounded-lg shrink-0 ${
          session.type === 'online' ? 'bg-primary-soft text-primary' : 'bg-secondary-soft text-secondary'
        }`}>
          {session.type === 'online' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
        </div>
        
        <div className="space-y-1 min-w-0 flex-1">
          <div className="font-medium truncate">{client?.name}</div>
          <div className="text-sm text-muted-foreground">
            {session.startTime} - {session.duration} mins with {staff?.name}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
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
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1 sm:flex-none"
              onClick={() => onUpdateStatus(session.id, 'cancelled')}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button 
              size="sm" 
              className="bg-success hover:bg-success/90 flex-1 sm:flex-none"
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
