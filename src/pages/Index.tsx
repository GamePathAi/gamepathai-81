
import React from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">GamePath AI Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate("/download")}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Download App
          </Button>
        </div>
        <Dashboard />
      </div>
    </Layout>
  );
};

export default Index;
