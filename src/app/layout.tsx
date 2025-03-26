export const dynamic = "force-static";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Northwest Arkansas Trail Homes",
  description: "Your site description here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/globals.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="global-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
