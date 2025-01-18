import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import "./globals.css";
import Navbar from "./components/Navbar";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html >
      {
      }
      <head />
      <body>
      <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <Navbar />
        {children}
        <Toaster richColors theme="light" closeButton/>
      </body>
    </html>
  );
}
