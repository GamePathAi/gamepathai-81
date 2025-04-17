
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Facebook, Loader2, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll just navigate to the dashboard
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success(`Login with ${provider} successful`);
    navigate("/dashboard");
    
    setSocialLoading(null);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-cyber-darkblue/50 border-cyber-blue/30 focus:border-cyber-blue"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a 
              href="/forgot-password"
              className="text-xs text-cyber-blue hover:text-cyber-purple transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-cyber-darkblue/50 border-cyber-blue/30 focus:border-cyber-blue"
          />
        </div>
        
        <div className="flex items-center space-x-2 pt-1">
          <Checkbox 
            id="remember" 
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)} 
            className="data-[state=checked]:bg-cyber-blue data-[state=checked]:border-cyber-blue" 
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
          >
            Remember me
          </label>
        </div>
        
        <Button 
          type="submit"
          variant="cyberAction" 
          className="w-full font-bold" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : "Sign In"}
        </Button>
      </form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-700"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-cyber-darkblue px-2 text-gray-400">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin("Google")}
          disabled={socialLoading !== null}
          className="bg-cyber-darkblue/50 border-gray-700 hover:bg-cyber-darkblue/80 hover:text-white transition-all"
        >
          {socialLoading === "Google" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <FcGoogle className="mr-2 h-4 w-4" />
              Google
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin("Facebook")}
          disabled={socialLoading !== null}
          className="bg-cyber-darkblue/50 border-gray-700 hover:bg-cyber-darkblue/80 hover:text-white transition-all"
        >
          {socialLoading === "Facebook" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Facebook className="mr-2 h-4 w-4" fill="#1877F2" color="#1877F2" />
              Facebook
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
