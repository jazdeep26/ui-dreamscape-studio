import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Staff } from "@/types";

interface DeleteStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: Staff | null;
  onConfirm: () => void;
}

export function DeleteStaffDialog({ open, onOpenChange, staff, onConfirm }: DeleteStaffDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Staff Member</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{staff?.name}</strong>? This action cannot be undone.
            All associated sessions and earnings data will also be removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete Staff
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}