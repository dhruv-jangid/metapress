import { createFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [{ title: "Policies" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-16 2xl:gap-24 m-4 xl:m-8 p-8 pt-24 xl:pt-32 min-h-[96dvh] xl:min-h-[94dvh]">
      <div className="space-y-4">
        <div className="text-sm text-primary">LEGAL POLICIES</div>
        <div className="text-3xl lg:text-4xl xl:text-5xl tracking-tighter w-xs lg:w-sm xl:w-md">
          Our commitment to transparency and user rights
        </div>
      </div>

      <div className="space-y-12 max-w-4xl">
        <div className="space-y-6" id="terms">
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tighter">
            Terms of Service
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Welcome to MetaPress. By accessing or using our platform, you
              agree to be bound by these Terms of Service. If you disagree with
              any part of these terms, please do not use our service.
            </p>
            <h3 className="text-lg font-medium text-foreground">
              User Accounts
            </h3>
            <p>
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. You are
              responsible for safeguarding the password and for all activities
              that occur under your account.
            </p>
            <h3 className="text-lg font-medium text-foreground">Content</h3>
            <p>
              Our platform allows you to post, link, store, share and otherwise
              make available certain information, text, graphics, or other
              material. You are responsible for content that you post to the
              service, including its legality, reliability, and appropriateness.
            </p>
            <h3 className="text-lg font-medium text-foreground">
              Prohibited Uses
            </h3>
            <p>
              You may not use our service for any illegal or unauthorized
              purpose. You agree to comply with all applicable laws and
              regulations.
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-6" id="privacy">
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tighter">
            Privacy Policy
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Your privacy is important to us. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when you
              use our platform.
            </p>
            <h3 className="text-lg font-medium text-foreground">
              Information We Collect
            </h3>
            <p>
              We collect information you provide directly to us, such as when
              you create an account, post content, or contact us. We also
              automatically collect certain information about your device and
              usage of our service.
            </p>
            <h3 className="text-lg font-medium text-foreground">
              How We Use Your Information
            </h3>
            <p>
              We use the information we collect to provide, maintain, and
              improve our services, process transactions, send communications,
              and comply with legal obligations.
            </p>
            <h3 className="text-lg font-medium text-foreground">
              Information Sharing
            </h3>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy.
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-6">
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tighter">
            Cookie Policy
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              We use cookies and similar technologies to enhance your experience
              on our platform. This Cookie Policy explains how we use cookies
              and your choices regarding them.
            </p>
            <h3 className="text-lg font-medium text-foreground">
              What Are Cookies
            </h3>
            <p>
              Cookies are small text files that are stored on your device when
              you visit our website. They help us provide you with a better
              browsing experience.
            </p>
            <h3 className="text-lg font-medium text-foreground">
              How We Use Cookies
            </h3>
            <p>
              We use cookies for authentication, security, preferences,
              analytics, and advertising purposes.
            </p>
            <h3 className="text-lg font-medium text-foreground">
              Managing Cookies
            </h3>
            <p>
              You can control and manage cookies through your browser settings.
              However, disabling certain cookies may affect the functionality of
              our service.
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-6">
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tighter">
            DMCA Policy
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              MetaPress respects the intellectual property rights of others and
              expects our users to do the same. We respond to notices of alleged
              copyright infringement.
            </p>
            <h3 className="text-lg font-medium text-foreground">
              Copyright Infringement
            </h3>
            <p>
              If you believe that your work has been copied in a way that
              constitutes copyright infringement, please provide us with the
              following information in writing.
            </p>
            <h3 className="text-lg font-medium text-foreground">
              Counter-Notification
            </h3>
            <p>
              If you believe that your content was removed or access was
              disabled by mistake or misidentification, you may file a
              counter-notification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
