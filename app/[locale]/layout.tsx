import { Header } from '@/src/widgets/header/ui/Header';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative flex min-h-screen flex-col">
        {children}
      </main>
    </>
  );
}

