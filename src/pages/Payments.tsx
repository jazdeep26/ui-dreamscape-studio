import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  CreditCard, 
  Plus, 
  Search,
  Calendar,
  DollarSign,
  TrendingUp,
  Filter,
  Download,
  Receipt,
  User
} from "lucide-react";
import { mockPayments, mockClients } from "@/data/mockData";
import { Payment, Client } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaymentForm } from "@/components/PaymentForm";
import { useToast } from "@/hooks/use-toast";

export default function Payments() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethod, setFilterMethod] = useState<string>("all");
  const [payments, setPayments] = useLocalStorage<Payment[]>('clinic_payments', mockPayments);
  const [clients] = useLocalStorage<Client[]>('clinic_clients', mockClients);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getClientById = (id: string) => clients.find(c => c.id === id);
  
  const filteredPayments = payments.filter(payment => {
    const client = getClientById(payment.clientId);
    const matchesSearch = client?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         payment.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterMethod === "all" || payment.method === filterMethod;
    
    return matchesSearch && matchesFilter;
  });

  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);

  const handleAddPayment = (paymentData: Omit<Payment, 'id' | 'sessionIds'>) => {
    const newPayment: Payment = {
      id: `pay${Date.now()}`,
      ...paymentData,
      sessionIds: [],
    };
    setPayments(prev => [newPayment, ...prev]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track client payments and manage outstanding balances.
          </p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-success to-accent hover:from-success/90 hover:to-accent/90 w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-shadow border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">₹{totalPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <TrendingUp className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              ₹{mockClients.reduce((sum, client) => sum + client.balance, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From {mockClients.filter(c => c.balance > 0).length} clients
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Rate</CardTitle>
            <Receipt className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {Math.round((totalPayments / (totalPayments + mockClients.reduce((sum, client) => sum + client.balance, 0))) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Collection efficiency
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="card-shadow border-0">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search payments by client name or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 focus-ring"
              />
            </div>
            <Select value={filterMethod} onValueChange={setFilterMethod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card className="card-shadow border-0">
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>
            Payment history and transaction details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPayments.map((payment) => {
              const client = getClientById(payment.clientId);
              return (
                <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-success-soft text-success">
                      <Receipt className="h-4 w-4" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{client?.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {payment.method.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                        {payment.notes && (
                          <span>{payment.notes}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-success">
                      +₹{payment.amount.toLocaleString()}
                    </div>
                    {payment.sessionIds && (
                      <div className="text-xs text-muted-foreground">
                        {payment.sessionIds.length} session(s)
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Outstanding Balances */}
      <Card className="card-shadow border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-warning" />
            Outstanding Balances
          </CardTitle>
          <CardDescription>
            Clients with pending payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockClients
              .filter(client => client.balance > 0)
              .sort((a, b) => b.balance - a.balance)
              .map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-warning-soft text-warning">
                      <User className="h-4 w-4" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {client.totalSessions} sessions • Last payment: {
                          mockPayments.find(p => p.clientId === client.id)?.date 
                            ? new Date(mockPayments.find(p => p.clientId === client.id)!.date).toLocaleDateString()
                            : 'No payments yet'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-semibold text-warning">
                        ₹{client.balance.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Outstanding
                      </div>
                    </div>
                    <Button size="sm" className="bg-success hover:bg-success/90">
                      Record Payment
                    </Button>
                  </div>
                </div>
              ))}
            
            {mockClients.filter(client => client.balance > 0).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>All payments are up to date!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Form Dialog */}
      <PaymentForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        clients={clients}
        onSave={handleAddPayment}
      />
    </div>
  );
}