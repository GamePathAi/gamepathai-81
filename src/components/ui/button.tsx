
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-cyber-purple to-cyber-blue text-white hover:opacity-90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        cyber: "bg-cyber-darkblue border border-cyber-blue text-cyber-blue hover:bg-cyber-blue/20 font-tech",
        cyberOutline: "bg-transparent border border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 font-tech",
        cyberLight: "bg-white/90 border border-cyber-blue/30 text-cyber-darkblue font-medium hover:bg-white shadow-sm hover:shadow-cyber-blue/20",
        cyberGlass: "backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 font-tech",
        cyberAction: "bg-gradient-to-r from-cyber-purple to-cyber-blue text-white font-semibold hover:opacity-90 shadow-sm hover:shadow-cyber-blue/30",
        cyberSafe: "bg-gradient-to-r from-green-500 to-cyber-green text-white font-semibold hover:opacity-90 shadow-sm hover:shadow-cyber-green/30",
        cyberReset: "bg-gradient-to-r from-yellow-500 to-cyber-orange text-white font-semibold hover:opacity-90 shadow-sm hover:shadow-cyber-orange/30",
        cyberGreen: "bg-gradient-to-r from-green-600 to-green-400 text-white font-bold hover:opacity-95 shadow-sm hover:shadow-green-400/30",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
