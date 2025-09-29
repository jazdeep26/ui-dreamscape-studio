import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Staff } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const staffSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number must be less than 20 characters"),
  compensationRate: z.number().min(0, "Compensation rate cannot be negative"),
  compensationType: z.union([z.literal("percentage"), z.literal("fixed")]).refine((val) => val !== undefined, {
    message: "Please select a compensation type",
  }),
});

type StaffFormData = z.infer<typeof staffSchema>;

interface StaffFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff?: Staff;
  onSave: (staff: Omit<Staff, 'id' | 'totalEarnings' | 'sessionsCount'>) => void;
}

export function StaffForm({ open, onOpenChange, staff, onSave }: StaffFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: staff?.name || "",
      email: staff?.email || "",
      phone: staff?.phone || "",
      compensationRate: staff?.compensationRate || 0,
      compensationType: staff?.compensationType || "percentage",
    },
  });

  const onSubmit = async (data: StaffFormData) => {
    setIsSubmitting(true);
    try {
      onSave(data as Omit<Staff, 'id' | 'totalEarnings' | 'sessionsCount'>);
      toast({
        title: staff ? "Staff updated" : "Staff member added",
        description: staff ? "Staff information has been updated successfully." : "New staff member has been added successfully.",
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save staff member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{staff ? "Edit Staff Member" : "Add New Staff Member"}</DialogTitle>
          <DialogDescription>
            {staff ? "Update staff member information below." : "Fill in the details to add a new staff member."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter staff member's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="compensationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select compensation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="compensationRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Compensation Rate {form.watch("compensationType") === "percentage" ? "(%)" : "(₹)"}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step={form.watch("compensationType") === "percentage" ? "1" : "0.01"}
                      min="0"
                      max={form.watch("compensationType") === "percentage" ? "100" : undefined}
                      placeholder={form.watch("compensationType") === "percentage" ? "e.g., 70" : "e.g., 500.00"} 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : staff ? "Update Staff" : "Add Staff"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}