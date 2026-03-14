import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/redux/feature/auth/authApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";

export default function CodeVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const otpTokenFromUrl = searchParams.get("otpToken");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const handleResend = async () => {
    if (!email) {
      ErrorToast("Email not found. Please try again.");
      return;
    }

    try {
      const result = await resendOtp({ email }).unwrap();
      if (result?.success) {
        SuccessToast("Code resent! Please check your email.");
        setError("");
        setCode("");
      }
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || error?.message || "Failed to resend code.");
    }
  };

  const handleSubmit = async () => {
    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    if (!email) {
      ErrorToast("Email not found. Please try again.");
      return;
    }

    try {
      const result = await verifyOtp({
        email,
        otp: Number(code),
        otpToken: otpTokenFromUrl,
      }).unwrap();
      if (result?.success) {
        SuccessToast("Code verified! Redirecting to reset password...");
        setTimeout(() => {
          navigate(
            `/auth/reset-password?email=${encodeURIComponent(
              email || ""
            )}&otp=${code}&otpToken=${otpTokenFromUrl}`
          );
        }, 1000);
      }
    } catch (err) {
      const error = err as TError;
      setError(error?.data?.message || "Invalid verification code.");
      ErrorToast(error?.data?.message || error?.message || "Invalid code.");
      setCode("");
    }
  };

  const isLoading = isVerifying || isResending;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
        <CardDescription className="text-center">
          We&apos;ve sent a 6-digit verification code to your email. Please enter it below to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value: string) => {
                setCode(value)
                setError("")
              }}
              disabled={isLoading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button  
            onClick={handleSubmit} 
            className="w-full" 
            loading={isVerifying}
            loadingText="Verifying..."
            disabled={isVerifying || code.length !== 6}
          >
            Verify Code
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Didn&apos;t receive the code?
            </p>
            <Button
              variant="link"
              onClick={handleResend}
              loading={isResending}
              loadingText="Resending..."
              className="p-0 h-auto font-normal"
            >
              Resend Code
            </Button>
          </div>

          <Link to="/auth/forgot-password">
            <Button variant="ghost" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Forgot Password
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
