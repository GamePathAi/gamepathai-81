
import React from "react";
import { Cpu, RotateCcw, CheckCircle2, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applying: boolean;
  success: boolean;
  onRevert: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ 
  open, 
  onOpenChange, 
  applying, 
  success, 
  onRevert 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-cyber-darkblue border border-cyber-green/40 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-tech text-cyber-green flex items-center gap-2">
            <Cpu size={20} className="text-cyber-green" />
            {applying ? "Applying Settings" : 
             success ? "Settings Applied Successfully" : "Applying Settings"}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {applying ? "Please wait while we optimize your system..." : 
            success ? "Your system has been successfully optimized" : ""}
          </DialogDescription>
        </DialogHeader>

        {applying && (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-cyber-green border-r-transparent border-b-cyber-blue border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-cyber-green animate-pulse">Applying optimized settings...</p>
          </div>
        )}

        {success && (
          <div className="py-4 space-y-4">
            <div className="mx-auto w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center">
              <CheckCircle2 size={32} className="text-cyber-green" />
            </div>
            
            <div className="text-center">
              <p className="text-cyber-green font-tech text-lg mb-1">Settings Applied Successfully</p>
              <p className="text-gray-300 text-sm">Your system is now running with AI-optimized settings</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 bg-cyber-darkblue/50 border border-cyber-green/20 rounded-md text-center">
                <div className="text-xs text-gray-400 mb-1">Performance Gain</div>
                <div className="text-xl font-tech text-cyber-green">+23%</div>
              </div>
              <div className="p-3 bg-cyber-darkblue/50 border border-cyber-green/20 rounded-md text-center">
                <div className="text-xs text-gray-400 mb-1">Settings Changed</div>
                <div className="text-xl font-tech text-cyber-green">6</div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex sm:justify-between sm:flex-row flex-col gap-3">
          {success && (
            <>
              <Button
                variant="outline"
                className="border-cyber-orange/30 text-cyber-orange hover:bg-cyber-orange/10"
                onClick={onRevert}
              >
                <RotateCcw size={16} className="mr-1" />
                Revert Changes
              </Button>
              <DialogClose asChild>
                <Button className="bg-cyber-green text-white hover:bg-cyber-green/80">
                  <CheckCircle2 size={16} className="mr-1" />
                  Continue
                </Button>
              </DialogClose>
            </>
          )}
          
          {applying && (
            <Button
              variant="outline"
              className="border-red-500/30 text-red-500 hover:bg-red-500/10"
              disabled
            >
              <X size={16} className="mr-1" />
              Cancel
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
