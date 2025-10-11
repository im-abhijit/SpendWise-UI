import { MessageCircle, PlusCircle, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Start a Chat on WhatsApp",
    description: "Open WhatsApp and message SpendWise. No registration needed.",
  },
  {
    icon: PlusCircle,
    title: "Add Expenses Like 'Lunch ₹250'",
    description: "Simply type your expense naturally. We understand context automatically.",
  },
  {
    icon: BarChart3,
    title: "Get Instant Summaries",
    description: "Ask for reports anytime. View spending patterns and insights in seconds.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(199,93%,60%,0.1)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Simple</span> as 1-2-3
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in under a minute. No downloads, no setup.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start gap-6 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg glow-effect">
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-primary/30">0{index + 1}</span>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
