import { Button } from "@/components/ui/button";
import { SignUpDialog } from "@/components/SignUpDialog";
import { MessageSquare } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold gradient-text">SpendWise</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-bold text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-bold text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-sm font-bold text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <SignUpDialog triggerLabel="Log in" size="sm" mode="login" />
            <SignUpDialog triggerLabel="Sign up" size="sm" />
          </div>
        </div>
      </div>
    </nav>
  );
};
