import ResetPassword from "../../../components/Auth/ResetPassword";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPassword />
    </Suspense>
  );
}
