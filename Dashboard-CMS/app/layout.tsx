// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

import { ApolloClientProvider } from "./providers/ApolloProvider";
import Link from "next/link";
import ViewSelector from "./components/ViewSelector";

export const metadata = {
  title: "Dashboard",
  description: "Your CMS UI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <nav className="p-4 space-y-2">
          <Link
            href="/gallery"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <span>Gallery</span>
          </Link>
        </nav>
      </head>
      <body>
        <main className="max-w-7xl mx-auto p-8">
          {/* ← insert the view tabs */}
          <ViewSelector />
          {/* Wrap your children in the Client Component */}
          <ApolloClientProvider>{children}</ApolloClientProvider>
        </main>
      </body>
    </html>
  );
}
