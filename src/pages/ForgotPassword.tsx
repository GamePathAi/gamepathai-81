
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GamePathLogo } from "@/components/GamePathLogo";
import { Mail, AlertCircle, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Email is required");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email address is invalid");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This is a mock API call - in a real app, you would call your password reset API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast.success("Reset link sent", {
        description: "Check your email for password reset instructions"
      });
    } catch (error) {
      toast.error("Failed to send reset link", {
        description: "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-black p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <GamePathLogo className="h-12" />
        </div>
        
        <Card className="border-cyber-blue/30 bg-cyber-darkblue shadow-lg">
          <CardHeader className="space-y-1 pb-3">
            <CardTitle className="text-2xl font-bold text-white text-center">
              {isSubmitted ? "Check Your Email" : "Reset Your Password"}
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              {isSubmitted 
                ? "We've sent you a password reset link" 
                : "Enter your email address to receive a reset link"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="mx-auto my-6 flex h-14 w-14 items-center justify-center rounded-full bg-cyber-blue/20">
                  <Mail className="h-7 w-7 text-cyber-blue" />
                </div>
                
                <p className="text-sm text-gray-300">
                  We've sent instructions to <span className="font-medium text-white">{email}</span>. 
                  Check your email to reset your password.
                </p>
                
                <p className="text-xs text-gray-400 mt-4">
                  Didn't receive an email? Check your spam folder or try again.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className={`pl-10 ${error ? 'border-cyber-red' : ''}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <p className="text-cyber-red text-xs flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" /> {error}
                    </p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  variant="cyberAction"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                      Sending reset link...
                    </>
                  ) : (
                    <>Send Reset Link</>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-3 pt-0 border-t border-cyber-blue/20 mt-3">
            <div className="text-center text-sm text-gray-400">
              <a href="/login" className="text-cyber-blue hover:underline inline-flex items-center">
                <ArrowLeft className="mr-1 h-3 w-3" />
                Back to login
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
