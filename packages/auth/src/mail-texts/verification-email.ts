export const verificationEmailText = ({ name, url }: { name: string; url: string }): string => {
  return `Hey ${name},

Welcome to MetaPress! Please verify your email address to activate your account.

Click the link below to complete your signup:

${url}

⚠️ This link will expire in 1 hour.

If you did NOT create an account with MetaPress, please ignore this email.

For your security, do not share this email or the verification link with anyone.`;
};
