
import { useState } from "react";
import { Facebook, Mail, Lock, AlertCircle, Check, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    let isValid = true;
    
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // This is a mock login - in a real app, you would call your authentication API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Login successful", {
        description: "Welcome back to GamePath AI"
      });
      
      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed", {
        description: "Please check your credentials and try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    
    try {
      // Mock social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`${provider} login successful`, {
        description: "Welcome back to GamePath AI"
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast.error(`${provider} login failed`, {
        description: "Please try again or use another login method"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Social login options */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Button 
          type="button"
          variant="cyberOutline"
          className="w-full"
          disabled={isLoading}
          onClick={() => handleSocialLogin("Google")}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>
        <Button 
          type="button" 
          variant="cyberOutline"
          className="w-full"
          disabled={isLoading}
          onClick={() => handleSocialLogin("Facebook")}
        >
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
      </div>
      
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-x-0 border-t border-cyber-blue/20"></div>
        <div className="relative bg-cyber-darkblue px-3">
          <span className="text-sm text-gray-400">or continue with</span>
        </div>
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className={`pl-10 ${errors.email ? 'border-cyber-red' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="text-cyber-red text-xs flex items-center mt-1">
              <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a
              href="/forgot-password"
              className="text-xs text-cyber-blue hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`pl-10 ${errors.password ? 'border-cyber-red' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {errors.password && (
            <p className="text-cyber-red text-xs flex items-center mt-1">
              <AlertCircle className="h-3 w-3 mr-1" /> {errors.password}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
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
          className="w-full"
          variant="cyberAction"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              Signing in...
            </>
          ) : (
            <>Sign in</>
          )}
        </Button>
      </form>
    </div>
  );
}
