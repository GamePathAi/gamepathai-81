
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // Redirect to dashboard when landing on index
  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);
  
  return null; // No need to render anything as we're redirecting
};

export default Index;
