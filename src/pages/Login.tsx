
import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GamePathLogo } from "@/components/GamePathLogo";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-black p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <GamePathLogo className="h-12" />
        </div>
        
        <Card className="border-cyber-blue/30 bg-cyber-darkblue shadow-lg">
          <CardHeader className="space-y-1 pb-3">
            <CardTitle className="text-2xl font-bold text-white text-center">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Sign in to access your GamePath account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <LoginForm />
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-3 pt-0 border-t border-cyber-blue/20 mt-3">
            <div className="text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-cyber-blue hover:underline">
                Create an account
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-500 max-w-md">
        <p>
          &copy; {new Date().getFullYear()} GamePath AI. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
