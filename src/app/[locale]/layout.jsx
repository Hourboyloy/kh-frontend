import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ClientWrapper from "@/components/ClientWrapper";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }
  return (
    <NextIntlClientProvider>
      <ClientWrapper>{children}</ClientWrapper>
    </NextIntlClientProvider>
  );
}
