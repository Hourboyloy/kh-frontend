"use client";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default function HomeLayout({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`min-h-screen flex flex-col`}>
      <div className="hidden lg:block sticky top-0 z-10">
        <Header />
      </div>

      <div className="mb-auto">{children}</div>
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
}
