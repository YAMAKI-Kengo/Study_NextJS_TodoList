import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./provider";
import SupabaseListener from "@/components/supabaseListener";
import { NextImage } from "./components/NextImage";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `https://study-next-js-todo-list-gxuj.vercel.app/todo`;

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Let's Todo",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <div>
          <SupabaseListener />
        </div>
        <NextImage />
        <main className="min-h-screen flex flex-col items-center">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
