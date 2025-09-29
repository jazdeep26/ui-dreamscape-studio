import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Users, 
  Clock, 
  DollarSign, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Plus
} from "lucide-react";
import { mockDashboardStats, mockSessions, getTodaySessions, getClientById, getStaffById } from "@/data/mockData";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = mockDashboardStats;
  const todaySessions = getTodaySessions();
  const recentSessions = mockSessions.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your clinic overview for today.
          </p>
        </div>
        <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
          <Link to="/calendar">
            <Plus className="mr-2 h-4 w-4" />
            New Session
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-shadow border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.todaySessions}</div>
            <p className="text-xs text-muted-foreground">
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Sessions</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pendingSessions}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">₹{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">₹{stats.outstandingBalance}</div>
            <p className="text-xs text-muted-foreground">
              From 5 clients
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Sessions */}
        <Card className="card-shadow border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Today's Sessions
                </CardTitle>
                <CardDescription>
                  Sessions scheduled for today
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/calendar">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySessions.length > 0 ? (
              todaySessions.map((session) => {
                const client = getClientById(session.clientId);
                const staff = getStaffById(session.staffId);
                return (
                  <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                    <div className="space-y-1">
                      <p className="font-medium">{client?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.startTime} • {session.duration}min • {staff?.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary"
                        className={session.type === 'online' ? 'session-online' : 'session-offline'}
                      >
                        {session.type}
                      </Badge>
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
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No sessions scheduled for today</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-shadow border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest sessions and updates
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSessions.map((session) => {
              const client = getClientById(session.clientId);
              const staff = getStaffById(session.staffId);
              return (
                <div key={session.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className={`p-1 rounded-full ${
                    session.status === 'completed' ? 'bg-success/20 text-success' :
                    session.status === 'pending' ? 'bg-warning/20 text-warning' :
                    'bg-primary/20 text-primary'
                  }`}>
                    {session.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      {session.status === 'completed' ? 'Session completed' : 
                       session.status === 'pending' ? 'Session pending' : 
                       'Session scheduled'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {client?.name} with {staff?.name} • {session.date} at {session.startTime}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-success">₹{session.fee}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}