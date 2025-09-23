import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chat app",
  description: "Chat app",
  icons: {
    icon: "/chat-app-logo-icon.svg",
    apple: "/chat-app-logo-icon.svg",
    shortcut: "/chat-app-logo-icon.svg",
  },
  keywords: "chat app,chat application,chat,chat app,chat application,chat",
  authors: [{ name: "Ramesh" }],
  verification: {
    google: "fs3fI4RT8B2j8VUznZ2Lcuuzim3ucHDUWh0rHgeUe54",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
