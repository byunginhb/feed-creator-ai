'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/src/i18n/navigation';
import { useTheme } from 'next-themes';
import { useAuth } from '@/src/features/auth/model/useAuth';
import { Button } from '@/src/shared/ui/button/Button';
import { GoogleSignInButton } from '@/src/features/auth/ui/GoogleSignInButton';
import { 
  Home, 
  LayoutDashboard, 
  Palette, 
  Sun, 
  Moon, 
  Monitor,
  LogOut,
  Globe
} from 'lucide-react';
import { cn } from '@/src/shared/lib/utils';

export const Header = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchLocale = (newLocale: string) => {
    window.location.href = `/${newLocale}${pathname}`;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navItems = [
    { href: '/', label: t('common.home'), icon: Home },
    { href: '/studio', label: t('common.studio'), icon: Palette },
    { href: '/dashboard', label: t('common.dashboard'), icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-600">
            FeedCreator
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'gap-2',
                    isActive && 'bg-primary/10 text-primary'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Right side: Language, Theme, Auth */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="icon"
              className="gap-2"
              title={t('header.language')}
            >
              <Globe className="w-4 h-4" />
            </Button>
            <div className="absolute right-0 top-full mt-2 w-32 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => switchLocale('ko')}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm hover:bg-accent rounded-t-lg',
                  locale === 'ko' && 'bg-accent font-medium'
                )}
              >
                한국어
              </button>
              <button
                onClick={() => switchLocale('en')}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm hover:bg-accent rounded-b-lg',
                  locale === 'en' && 'bg-accent font-medium'
                )}
              >
                English
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <div className="relative group">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (theme === 'light') setTheme('dark');
                  else if (theme === 'dark') setTheme('system');
                  else setTheme('light');
                }}
                title={t('header.theme')}
              >
                {theme === 'light' ? (
                  <Sun className="w-4 h-4" />
                ) : theme === 'dark' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Monitor className="w-4 h-4" />
                )}
              </Button>
              <div className="absolute right-0 top-full mt-2 w-32 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => setTheme('light')}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm hover:bg-accent rounded-t-lg flex items-center gap-2',
                    theme === 'light' && 'bg-accent font-medium'
                  )}
                >
                  <Sun className="w-4 h-4" />
                  {t('header.light')}
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm hover:bg-accent flex items-center gap-2',
                    theme === 'dark' && 'bg-accent font-medium'
                  )}
                >
                  <Moon className="w-4 h-4" />
                  {t('header.dark')}
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm hover:bg-accent rounded-b-lg flex items-center gap-2',
                    theme === 'system' && 'bg-accent font-medium'
                  )}
                >
                  <Monitor className="w-4 h-4" />
                  {t('header.system')}
                </button>
              </div>
            </div>
          )}

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-muted-foreground">
                {user.displayName || user.email}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t('common.logout')}
              </Button>
            </div>
          ) : (
            <GoogleSignInButton />
          )}
        </div>
      </div>
    </header>
  );
};

