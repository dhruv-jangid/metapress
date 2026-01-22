import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/callback/oauth")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data } = await authClient.getSession();

        if (data?.user && window.opener) {
          window.opener.postMessage({ type: "oauth-success" }, window.location.origin);
        } else if (window.opener) {
          window.opener.postMessage(
            { type: "oauth-error", message: "Authentication failed" },
            window.location.origin,
          );
        } else {
          navigate({ to: "/browse", replace: true });
        }
      } catch {
        if (window.opener) {
          window.opener.postMessage(
            { type: "oauth-error", message: "Something went wrong" },
            window.location.origin,
          );
        } else {
          navigate({ to: "/sign-in", replace: true });
        }
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex h-dvh items-center justify-center w-full bg-white font-mono">
      <p>Just a moment...</p>
    </div>
  );
}
