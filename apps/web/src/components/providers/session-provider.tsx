import { createContext, useContext } from "react";

const SessionContext = createContext<UserSession | null>(null);

export function SessionProvider({
  user,
  children,
}: {
  user: UserSession | null;
  children: React.ReactNode;
}) {
  return <SessionContext.Provider value={user}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}
