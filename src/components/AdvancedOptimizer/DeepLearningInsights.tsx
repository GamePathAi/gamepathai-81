
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { toast } from "sonner";

// Import refactored components
import { LearningChart } from "./DeepLearning/LearningChart";
import { StatCardsRow } from "./DeepLearning/StatCards";
import { ActionButtons } from "./DeepLearning/ActionButtons";
import { DetailsDialog } from "./DeepLearning/dialogs/DetailsDialog";
import { AnalysisDialog } from "./DeepLearning/dialogs/AnalysisDialog";
import { SettingsDialog } from "./DeepLearning/dialogs/SettingsDialog";
import { ConfirmationDialog } from "./DeepLearning/dialogs/ConfirmationDialog";
import { performanceStages } from "./DeepLearning/data";

export const DeepLearningInsights: React.FC = () => {
  // State variables for dialogs
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [analysisDialogOpen, setAnalysisDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [settingsApplied, setSettingsApplied] = useState(false);
  
  // State variables for analysis process
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  
  // State variables for settings application
  const [applyingSettings, setApplyingSettings] = useState(false);
  const [settingsAppliedSuccess, setSettingsAppliedSuccess] = useState(false);

  // Handle view details button click
  const handleViewDetails = () => {
    setDetailsDialogOpen(true);
  };

  // Handle run analysis button click
  const handleRunAnalysis = () => {
    setAnalysisDialogOpen(true);
    setAnalysisRunning(true);
    setAnalysisComplete(false);
    setCurrentStage(0);
    setStageProgress(0);
    
    const totalDuration = 5000;
    const stages = performanceStages.length;
    const stageTime = totalDuration / stages;
    
    let currentStageIndex = 0;
    
    const progressInterval = setInterval(() => {
      setStageProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          currentStageIndex++;
          setCurrentStage(currentStageIndex);
          
          if (currentStageIndex >= stages) {
            clearInterval(progressInterval);
            setAnalysisRunning(false);
            setAnalysisComplete(true);
            return 100;
          }
          
          return 0;
        }
        return newProgress;
      });
    }, stageTime / 50);
  };

  // Handle export report button click
  const handleExportReport = () => {
    toast.success("Report exported successfully", {
      description: "Performance report has been saved to your downloads folder",
    });
  };

  // Handle apply settings button click
  const handleApplySettings = () => {
    setSettingsDialogOpen(true);
  };

  // Handle confirm apply settings button click
  const confirmApplySettings = () => {
    setSettingsDialogOpen(false);
    setConfirmationDialogOpen(true);
    setApplyingSettings(true);
    setSettingsAppliedSuccess(false);
    
    setTimeout(() => {
      setApplyingSettings(false);
      setSettingsAppliedSuccess(true);
      setSettingsApplied(true);
      
      toast.success("Optimized settings applied successfully", {
        description: "Your system is now running with AI-optimized settings",
      });
    }, 3000);
  };

  // Handle revert settings button click
  const handleRevertSettings = () => {
    setSettingsApplied(false);
    setConfirmationDialogOpen(false);
    
    toast.info("Settings reverted to default", {
      description: "Your system has been returned to previous settings",
    });
  };

  return (
    <Card className="cyber-card border-cyber-purple/30 bg-cyber-darkblue/90">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain size={20} className="text-cyber-purple" />
          <h3 className="text-xl font-tech text-cyber-purple">Deep Learning Optimization</h3>
        </div>

        <p className="text-sm text-gray-300 mb-6">
          Our AI has been studying your system behavior and game usage patterns to create a personalized optimization profile
        </p>

        <LearningChart />
        <StatCardsRow />
        
        <ActionButtons 
          onViewDetails={handleViewDetails}
          onRunAnalysis={handleRunAnalysis}
          onApplySettings={handleApplySettings}
          settingsApplied={settingsApplied}
        />
      </CardContent>

      {/* Dialogs */}
      <DetailsDialog 
        open={detailsDialogOpen} 
        onOpenChange={setDetailsDialogOpen} 
      />
      
      <AnalysisDialog 
        open={analysisDialogOpen}
        onOpenChange={setAnalysisDialogOpen}
        analysisRunning={analysisRunning}
        analysisComplete={analysisComplete}
        currentStage={currentStage}
        stageProgress={stageProgress}
        onStartAnalysis={handleRunAnalysis}
        onExportReport={handleExportReport}
        onApplySettings={handleApplySettings}
      />
      
      <SettingsDialog 
        open={settingsDialogOpen}
        onOpenChange={setSettingsDialogOpen}
        onApply={confirmApplySettings}
      />
      
      <ConfirmationDialog 
        open={confirmationDialogOpen}
        onOpenChange={setConfirmationDialogOpen}
        applying={applyingSettings}
        success={settingsAppliedSuccess}
        onRevert={handleRevertSettings}
      />
    </Card>
  );
};
