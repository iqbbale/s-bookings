import { CardLoadingLogin } from "@/modules/auth/card-loading";

export default function LoginLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <CardLoadingLogin />
    </div>
  );
}
