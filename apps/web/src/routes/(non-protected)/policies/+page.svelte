<script lang="ts">
  import { Separator } from "$lib/components/ui/separator";
</script>

<svelte:head>
  <title>Policies</title>
</svelte:head>

<div class="container mx-auto">
  <div class="my-16 flex min-h-dvh flex-col gap-16 2xl:gap-24">
    <div class="space-y-4">
      <div class="text-primary text-sm">LEGAL POLICIES</div>
      <div class="text-3xl tracking-tighter lg:text-4xl xl:text-5xl">
        Our commitment to transparency and user rights
      </div>
    </div>

    <div class="max-w-4xl space-y-12">
      <div class="space-y-6" id="terms">
        <h2 class="text-2xl font-semibold tracking-tighter lg:text-3xl">Terms of Service</h2>
        <div class="text-muted-foreground space-y-4 leading-relaxed">
          <p>
            Welcome to MetaPress. By accessing or using our platform, you agree to be bound by these
            Terms of Service. If you disagree with any part of these terms, please do not use our
            service.
          </p>
          <h3 class="text-foreground text-lg font-medium">User Accounts</h3>
          <p>
            When you create an account with us, you must provide information that is accurate,
            complete, and current at all times. You are responsible for safeguarding the password
            and for all activities that occur under your account.
          </p>
          <h3 class="text-foreground text-lg font-medium">Content</h3>
          <p>
            Our platform allows you to post, link, store, share and otherwise make available certain
            information, text, graphics, or other material. You are responsible for content that you
            post to the service, including its legality, reliability, and appropriateness.
          </p>
          <h3 class="text-foreground text-lg font-medium">Prohibited Uses</h3>
          <p>
            You may not use our service for any illegal or unauthorized purpose. You agree to comply
            with all applicable laws and regulations.
          </p>
        </div>
      </div>

      <Separator />

      <div class="space-y-6" id="privacy">
        <h2 class="text-2xl font-semibold tracking-tighter lg:text-3xl">Privacy Policy</h2>
        <div class="text-muted-foreground space-y-4 leading-relaxed">
          <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you use our platform.
          </p>
          <h3 class="text-foreground text-lg font-medium">Information We Collect</h3>
          <p>
            We collect information you provide directly to us, such as when you create an account,
            post content, or contact us. We also automatically collect certain information about
            your device and usage of our service.
          </p>
          <h3 class="text-foreground text-lg font-medium">How We Use Your Information</h3>
          <p>
            We use the information we collect to provide, maintain, and improve our services,
            process transactions, send communications, and comply with legal obligations.
          </p>
          <h3 class="text-foreground text-lg font-medium">Information Sharing</h3>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties
            without your consent, except as described in this policy.
          </p>
        </div>
      </div>

      <Separator />

      <div class="space-y-6">
        <h2 class="text-2xl font-semibold tracking-tighter lg:text-3xl">Cookie Policy</h2>
        <div class="text-muted-foreground space-y-4 leading-relaxed">
          <p>
            We use cookies and similar technologies to enhance your experience on our platform. This
            Cookie Policy explains how we use cookies and your choices regarding them.
          </p>
          <h3 class="text-foreground text-lg font-medium">What Are Cookies</h3>
          <p>
            Cookies are small text files that are stored on your device when you visit our website.
            They help us provide you with a better browsing experience.
          </p>
          <h3 class="text-foreground text-lg font-medium">How We Use Cookies</h3>
          <p>
            We use cookies for authentication, security, preferences, analytics, and advertising
            purposes.
          </p>
          <h3 class="text-foreground text-lg font-medium">Managing Cookies</h3>
          <p>
            You can control and manage cookies through your browser settings. However, disabling
            certain cookies may affect the functionality of our service.
          </p>
        </div>
      </div>

      <Separator />

      <div class="space-y-6">
        <h2 class="text-2xl font-semibold tracking-tighter lg:text-3xl">DMCA Policy</h2>
        <div class="text-muted-foreground space-y-4 leading-relaxed">
          <p>
            MetaPress respects the intellectual property rights of others and expects our users to
            do the same. We respond to notices of alleged copyright infringement.
          </p>
          <h3 class="text-foreground text-lg font-medium">Copyright Infringement</h3>
          <p>
            If you believe that your work has been copied in a way that constitutes copyright
            infringement, please provide us with the following information in writing.
          </p>
          <h3 class="text-foreground text-lg font-medium">Counter-Notification</h3>
          <p>
            If you believe that your content was removed or access was disabled by mistake or
            misidentification, you may file a counter-notification.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
