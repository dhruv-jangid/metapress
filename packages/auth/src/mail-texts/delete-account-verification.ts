export const deleteAccountVerificationText = ({
  name,
  url,
}: {
  name: string;
  url: string;
}): string => {
  return `Hey ${name},

We received a request to permanently delete your MetaPress account.

If you made this request, please confirm by clicking the link below:

${url}

⚠️ This link will expire in 1 hour. Once your account is deleted, all associated data will be permanently erased and cannot be recovered.

If you did NOT request this, please ignore this email. No further action is needed.

For your security, do not share this email or the confirmation link with anyone.`;
};
