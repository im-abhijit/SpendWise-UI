import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta?: string;
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "Free",
    description: "For trying out SpendWise with basic tracking",
    features: [
      "Up to 100 entries/month",
      "Basic summaries",
      "WhatsApp chat commands",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "₹199/mo",
    description: "For power users who want deeper insights",
    features: [
      "Unlimited entries",
      "Weekly & monthly reports",
      "Categorization & trends",
      "CSV export",
    ],
    cta: "Start Pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: "₹499/mo",
    description: "For families or small teams managing budgets",
    features: [
      "Unlimited entries",
      "Shared categories",
      "Multi-user access",
      "Priority support",
    ],
    cta: "Contact Sales",
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple pricing, <span className="gradient-text">clear value</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a plan that fits your needs. Upgrade or cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <Card
              key={plan.name}
              className={`card-glass p-6 flex flex-col justify-between ${
                plan.highlighted ? "ring-2 ring-primary" : ""
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Button className="w-full" variant={plan.highlighted ? "cta" : "default"}>
                  {plan.cta ?? "Choose"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};


