import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "../ui/sidebar";
import { AlertProvider } from "./alert-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AlertProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </AlertProvider>
    </ThemeProvider>
  );
};
