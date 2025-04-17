
import React from "react";
import { AlertCircle } from "lucide-react";
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

interface ResetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const ResetDialog: React.FC<ResetDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-cyber-darkblue border-cyber-red/50">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-cyber-red flex items-center gap-2">
            <AlertCircle size={18} />
            Reset All Settings
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            This will reset all settings to their default values. This action cannot be undone.
            Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent text-gray-300 border-gray-700 hover:bg-gray-800">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-cyber-red border-cyber-red/50 hover:bg-cyber-red/80">
            Reset Settings
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetDialog;
