import { Inter } from "next/font/google";
import "./globals.css";
import Notification from "@/components/Notification";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { QueryProvider } from "@/components/QueryProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buon Appetito",
  description: "Italian restaurant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <AuthProvider>
          <QueryProvider>
            <Notification />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ToastContainer position="bottom-right" theme="dark" autoClose={3000}/>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
