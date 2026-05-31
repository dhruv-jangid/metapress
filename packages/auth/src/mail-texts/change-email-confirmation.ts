export const changeEmailConfirmationText = ({
  name,
  newEmail,
  url,
}: {
  name: string;
  newEmail: string;
  url: string;
}): string => {
  return `Hi ${name},

We received a request to change the primary email address on your MetaPress account to: ${newEmail}

If you made this change, please verify your new email address by clicking the link below:

${url}

⚠️ This link will expire in 1 hour.

If you did NOT request this change, please ignore this email. No action will be taken.

For your security, do not share this email or the verification link with anyone.`;
};
