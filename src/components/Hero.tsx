import { Button } from "@/components/ui/button";
import { WhatsAppQRDialog } from "@/components/WhatsAppQRDialog";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(162,100%,50%,0.15)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Track your expenses.{" "}
              <span className="gradient-text">Right inside WhatsApp.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl">
              No new app. No hassle. Just chat with SpendWise to manage your money effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <WhatsAppQRDialog
                phone="1234567890"
                text="Hi SpendWise! I'd like to get started."
                triggerLabel="Get Started on WhatsApp"
                triggerVariant="cta"
                size="lg"
              />
              <Button variant="outline" size="lg" asChild>
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="animate-slide-up lg:animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
              <img
                src={`${import.meta.env.BASE_URL}hero.png`}
                alt="WhatsApp chat showing SpendWise bot tracking expenses with real conversations"
                className="relative rounded-2xl shadow-2xl w-full mx-auto max-h-[70vh] object-contain sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


