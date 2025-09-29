import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Plus, 
  Search,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  Edit,
  MoreVertical,
  Trash2,
  Filter,
  ChevronDown
} from "lucide-react";
import { mockClients } from "@/data/mockData";
import { Client } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClientForm } from "@/components/ClientForm";
import { DeleteClientDialog } from "@/components/DeleteClientDialog";
import { useToast } from "@/hooks/use-toast";

export default function Clients() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [timelineFilter, setTimelineFilter] = useState("current-month");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | undefined>();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);

  // Generate timeline options
  const getTimelineOptions = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    const options = [
      { value: "all-time", label: "All Time" },
      { value: "current-month", label: `Current Month (${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})` },
    ];

    // Add last 6 months
    for (let i = 1; i <= 6; i++) {
      const date = new Date(currentYear, currentMonth - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      options.push({ value, label });
    }

    return options;
  };

  // Filter clients based on timeline
  const getFilteredClients = () => {
    let filtered = clients;

    // Apply timeline filter
    if (timelineFilter !== "all-time") {
      const now = new Date();
      if (timelineFilter === "current-month") {
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        filtered = filtered.filter(client => {
          const clientDate = new Date(client.createdAt);
          return clientDate.getFullYear() === currentYear && clientDate.getMonth() === currentMonth;
        });
      } else {
        // Format: YYYY-MM
        const [year, month] = timelineFilter.split('-').map(Number);
        filtered = filtered.filter(client => {
          const clientDate = new Date(client.createdAt);
          return clientDate.getFullYear() === year && clientDate.getMonth() === month - 1;
        });
      }
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const handleAddClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'totalSessions'>) => {
    const newClient: Client = {
      id: `c${Date.now()}`,
      ...clientData,
      createdAt: new Date().toISOString().split('T')[0],
      totalSessions: 0,
    };
    setClients(prev => [...prev, newClient]);
  };

  const handleEditClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'totalSessions'>) => {
    if (!editingClient) return;
    
    setClients(prev => prev.map(client => 
      client.id === editingClient.id 
        ? { ...client, ...clientData }
        : client
    ));
    setEditingClient(undefined);
  };

  const handleDeleteClient = () => {
    if (!deletingClient) return;
    
    setClients(prev => prev.filter(client => client.id !== deletingClient.id));
    toast({
      title: "Client deleted",
      description: `${deletingClient.name} has been removed successfully.`,
    });
    setDeletingClient(null);
    setIsDeleteOpen(false);
  };

  const openEditDialog = (client: Client) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (client: Client) => {
    setDeletingClient(client);
    setIsDeleteOpen(true);
  };

  const filteredClients = getFilteredClients();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Manage your clinic clients and track their balances.
          </p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="card-shadow border-0">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 focus-ring"
              />
            </div>
            <div className="flex gap-2">
              <Select value={timelineFilter} onValueChange={setTimelineFilter}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                  <ChevronDown className="ml-2 h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  {getTimelineOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="card-shadow border-0 hover:card-elevated transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {client.totalSessions} sessions
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover border">
                    <DropdownMenuItem onClick={() => openEditDialog(client)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Client
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      View Sessions
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Record Payment
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => openDeleteDialog(client)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Client
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
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
              </div>

              {/* Balance */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm font-medium">Outstanding Balance</span>
                <Badge 
                  variant="secondary"
                  className={client.balance > 0 ? 'status-pending' : 'status-completed'}
                >
                  ₹{client.balance.toFixed(2)}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View History
                </Button>
                {client.balance > 0 && (
                  <Button size="sm" className="flex-1 bg-success hover:bg-success/90">
                    Record Payment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <Card className="card-shadow border-0">
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">No clients found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first client.'}
            </p>
            {!searchTerm && timelineFilter === "all-time" && (
              <Button 
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <ClientForm
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingClient(undefined);
        }}
        client={editingClient}
        onSave={editingClient ? handleEditClient : handleAddClient}
      />

      <DeleteClientDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        client={deletingClient}
        onConfirm={handleDeleteClient}
      />
    </div>
  );
}