import { MessageSquarePlus, History, TrendingUp, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: MessageSquarePlus,
    title: "Add Expenses Instantly",
    description: "Just type 'Lunch ₹250' and we'll track it. No forms, no friction.",
  },
  {
    icon: History,
    title: "View Spending in Chat",
    description: "Ask 'Show my spending this week' and get instant insights right in WhatsApp.",
  },
  {
    icon: TrendingUp,
    title: "Smart Summaries",
    description: "Get automated weekly reports and spending patterns delivered to your chat.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Bank-level encryption. Your data stays private and secure, always.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Powerful Features,{" "}
            <span className="gradient-text">Zero Complexity</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to track expenses, nothing you don't.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="card-glass p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -inset-2 bg-primary/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
