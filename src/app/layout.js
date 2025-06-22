import Header from "@/components/Header";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Blog",
  description: "A blog with comments function for TE course",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
