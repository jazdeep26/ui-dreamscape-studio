import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  UserCheck, 
  Plus, 
  Search,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  Edit,
  MoreVertical,
  TrendingUp,
  Percent
} from "lucide-react";
import { mockStaff } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState("");
  const staff = mockStaff.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
          <p className="text-muted-foreground">
            Manage your clinic staff and track their performance.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="card-shadow border-0">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 focus-ring"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {staff.map((member) => (
          <Card key={member.id} className="card-shadow border-0 hover:card-elevated transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {member.sessionsCount} sessions completed
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover border">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Staff
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      View Schedule
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Performance Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{member.phone}</span>
                </div>
              </div>

              {/* Compensation Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent-soft border border-accent/20">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">Compensation</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-accent">
                      {member.compensationType === 'percentage' 
                        ? `${member.compensationRate}%` 
                        : `₹${member.compensationRate}`}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {member.compensationType === 'percentage' ? 'per session' : 'fixed rate'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-success-soft border border-success/20">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium">Total Earnings</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-success">
                      ₹{member.totalEarnings.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      this month
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <div className="text-lg font-bold text-primary">{member.sessionsCount}</div>
                  <div className="text-xs text-muted-foreground">Sessions</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <div className="text-lg font-bold text-secondary">
                    ₹{Math.round(member.totalEarnings / member.sessionsCount)}
                  </div>
                  <div className="text-xs text-muted-foreground">Avg/Session</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Schedule
                </Button>
                <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90">
                  Performance
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {staff.length === 0 && (
        <Card className="card-shadow border-0">
          <CardContent className="text-center py-12">
            <UserCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">No staff members found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first staff member.'}
            </p>
            {!searchTerm && (
              <Button className="bg-gradient-to-r from-secondary to-accent">
                <Plus className="mr-2 h-4 w-4" />
                Add Staff Member
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}