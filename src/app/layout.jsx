import { Inter } from "next/font/google";
import "./globals.css";
import Notification from "@/components/Notification";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buon Appetito",
  description: "Italian restaurant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Notification />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
