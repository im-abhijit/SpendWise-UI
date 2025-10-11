import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SummaryCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  accent?: "emerald" | "indigo" | "violet" | "cyan";
};

export const SummaryCard = ({ title, value, subtitle, accent = "emerald" }: SummaryCardProps) => {
  const ring = {
    emerald: "ring-emerald-400/40",
    indigo: "ring-indigo-400/40",
    violet: "ring-violet-400/40",
    cyan: "ring-cyan-400/40",
  }[accent];

  return (
    <Card className={`card-glass rounded-2xl hover:shadow-lg transition-shadow ring-1 ${ring}`}>
      <CardHeader>
        <CardTitle className="text-base text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">{value}</div>
        {subtitle ? <div className="text-sm text-muted-foreground mt-2">{subtitle}</div> : null}
      </CardContent>
    </Card>
  );
};


