import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";

type SignUpDialogProps = {
  triggerLabel?: string;
  size?: "sm" | "default" | "lg";
  mode?: "signup" | "login";
};

export const SignUpDialog = ({ triggerLabel = "Sign up", size = "sm", mode = "signup" }: SignUpDialogProps) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = "https://mesothelial-sonya-deferentially.ngrok-free.dev";

  async function postJson<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as T | { error?: string };
    if (!res.ok) {
      const message = (data as { error?: string })?.error || "Request failed";
      throw new Error(message);
    }
    return data as T;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) return;
    setError(null);
    setIsVerifying(true);
    try {
      const data = await postJson<{ message: string; token: string; userId: string }>(
        "/auth/verify-otp",
        { whatsappNumber: phone, otp },
      );
      localStorage.setItem("authToken", data.token);
      // Navigate to dashboard after successful verification
      window.location.assign("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to verify OTP";
      setError(message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSendOtp = () => {
    setError(null);
    setIsSendingOtp(true);
    setOtp("");
    (async () => {
      try {
        await postJson<{ message: string; otp?: string }>("/auth/send-otp", { whatsappNumber: phone });
        setOtpSent(true);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to send OTP";
        setError(message);
      } finally {
        setIsSendingOtp(false);
      }
    })();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setPhone("");
      setOtp("");
      setOtpSent(false);
      setIsSendingOtp(false);
      setIsVerifying(false);
      setError(null);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size={size}>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "signup" ? "Sign up" : "Log in"}</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          {!otpSent && (
            <Button
              type="button"
              className="w-full"
              onClick={handleSendOtp}
              disabled={!phone.trim() || isSendingOtp}
            >
              {isSendingOtp ? "Sending..." : "Send OTP"}
            </Button>
          )}
          {otpSent && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="otp">OTP</Label>
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  containerClassName="flex w-full justify-start"
                  className="w-full"
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={otp.length !== 6 || isVerifying}>
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};


