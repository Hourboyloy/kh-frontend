import { AppProvider } from "@/context/GlobalContext";
import { Battambang } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import ClientWrapper from "@/components/ClientWrapper";

const battambang = Battambang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-battambang",
});

export const metadata = {
  title: process.env.NEXT_APP_NAME || "Default Title",
  description: process.env.NEXT_APP_DESCRIPTION || "Default Description",
  keywords: process.env.NEXT_APP_KEYWORDS || "default, keywords",
  icons: {
    icon: process.env.NEXT_PUBLIC_APP_ICON || "/default-icon.png",
  },
};

export default function RootLayout({ children }) {
  const appColor = "#" + (process.env.NEXT_APP_COLOR || "ffffff");
  return (
    <html suppressHydrationWarning>
      <body
        style={{ backgroundColor: appColor }}
        className={`${battambang.className} antialiased scroll-smooth`}
      >
        <AppProvider>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen"></div>
            }
          >
            <ClientWrapper>{children}</ClientWrapper>
          </Suspense>
        </AppProvider>
      </body>
    </html>
  );
}
