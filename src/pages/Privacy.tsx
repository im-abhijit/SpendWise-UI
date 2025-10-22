import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-1">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6 max-w-3xl">
          We value your privacy. This policy explains what data we collect, how we use it, and your rights.
        </p>
        <section className="space-y-6 max-w-3xl">
          <div>
            <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
            <p className="text-sm text-muted-foreground">
              Basic account details, messages sent to the bot for expense tracking, and technical logs required to run the service.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">How We Use Information</h2>
            <p className="text-sm text-muted-foreground">
              To provide expense tracking, generate summaries, improve features, and secure the platform. We do not sell your data.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Data Retention</h2>
            <p className="text-sm text-muted-foreground">
              We keep data only as long as necessary to deliver the service and comply with legal obligations.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
            <p className="text-sm text-muted-foreground">
              You may request access, correction, or deletion of your data. Contact us to exercise these rights.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p className="text-sm text-muted-foreground">
              For privacy questions, please email support@spendwise.app.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;


