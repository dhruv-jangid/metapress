export const resetPasswordText = ({ name, url }: { name: string; url: string }): string => {
  return `Hey ${name},

We received a request to reset the password for your MetaPress account.

If you made this request, you can reset your password by clicking the link below:

${url}

⚠️ This link will expire in 1 hour and can only be used once.

If you did NOT request a password reset, please ignore this email. Your account will remain secure.

For your security, do not share this email or the reset link with anyone.`;
};
