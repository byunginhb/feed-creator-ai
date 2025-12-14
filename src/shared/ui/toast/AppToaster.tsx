'use client';

import { Toaster } from 'sonner';
import { useTheme } from 'next-themes';

export const AppToaster = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      toastOptions={{
        classNames: {
          toast: 'bg-card text-foreground border border-border shadow-lg',
          title: 'text-sm font-medium',
          description: 'text-sm text-muted-foreground',
          actionButton:
            'bg-primary text-primary-foreground hover:bg-primary/90',
          cancelButton:
            'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          closeButton:
            'bg-background text-foreground border border-border hover:bg-accent',
        },
      }}
    />
  );
};

