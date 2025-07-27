import { Inter, Outfit} from "next/font/google";
import './globals.css';
import { AuthProvider } from "@/lib/auth-context";
import { Metadata } from "next";
const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Content Generator",
  description: "Generate AI-powered content with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}