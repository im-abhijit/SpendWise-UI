import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

type WhatsAppQRDialogProps = {
  phone: string; // e.g., 1234567890
  text?: string; // optional prefill text
  triggerLabel?: string;
  triggerVariant?: "default" | "outline" | "secondary" | "destructive" | "link" | "cta" | "hero";
  size?: "sm" | "default" | "lg";
};

export const WhatsAppQRDialog = ({
  phone,
  text,
  triggerLabel = "Open WhatsApp",
  triggerVariant = "default",
  size = "default",
}: WhatsAppQRDialogProps) => {
  const waLink = useMemo(() => {
    const base = `https://wa.me/${phone}`;
    if (!text) return base;
    const params = new URLSearchParams({ text });
    return `${base}?${params.toString()}`;
  }, [phone, text]);

  const qrApiSrc = useMemo(() => {
    // Using a local, no-network QR placeholder would be ideal; for now, generate via chart API alternative-free QR using data URI approach
    // We'll encode the waLink in a simple QR via third-party-less approach is non-trivial.
    // Use a lightweight open QR endpoint on api.qrserver.com which doesn't require keys.
    const encoded = encodeURIComponent(waLink);
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`;
  }, [waLink]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size={size}>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan to chat on WhatsApp</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <img src={qrApiSrc} alt="WhatsApp chat QR" className="rounded-lg shadow-md" />
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            Or tap to open WhatsApp
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};


