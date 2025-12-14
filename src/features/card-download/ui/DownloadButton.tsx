'use client';

import type { MouseEvent } from 'react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/src/shared/ui/button/Button';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface DownloadButtonProps {
  cardId?: string;
  previewId?: string;
}

export const DownloadButton = ({ cardId, previewId }: DownloadButtonProps) => {
  const t = useTranslations('card');
  const [isDownloading, setIsDownloading] = useState(false);

  const waitForImages = async (root: HTMLElement) => {
    const images = Array.from(root.querySelectorAll('img'));
    await Promise.all(
      images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) return resolve();
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
      )
    );
  };

  const handleDownload = async (e?: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    const targetId = previewId || (cardId ? `card-preview-${cardId}` : 'card-preview');
    const cardElement = document.getElementById(targetId);
    if (!cardElement) {
      console.error('Card preview element not found:', targetId);
      toast.error(t('downloadError'));
      return;
    }

    const wrapper = cardElement.closest<HTMLElement>('[data-card-preview-wrapper]');
    const prevWrapperOpacity = wrapper?.style.opacity;
    const prevWrapperTransform = wrapper?.style.transform;
    const prevWrapperFilter = wrapper?.style.filter;
    const prevCardOpacity = (cardElement as HTMLElement).style.opacity;
    const prevCardTransform = (cardElement as HTMLElement).style.transform;
    const prevCardFilter = (cardElement as HTMLElement).style.filter;
    const prevExportMode = (cardElement as HTMLElement).getAttribute('data-export-mode');

    const restore = () => {
      if (wrapper) {
        wrapper.style.opacity = prevWrapperOpacity || '';
        wrapper.style.transform = prevWrapperTransform || '';
        wrapper.style.filter = prevWrapperFilter || '';
      }
      (cardElement as HTMLElement).style.opacity = prevCardOpacity || '';
      (cardElement as HTMLElement).style.transform = prevCardTransform || '';
      (cardElement as HTMLElement).style.filter = prevCardFilter || '';
      if (prevExportMode === null) (cardElement as HTMLElement).removeAttribute('data-export-mode');
      else (cardElement as HTMLElement).setAttribute('data-export-mode', prevExportMode);
    };

    try {
      setIsDownloading(true);
      await (document as any).fonts?.ready?.catch?.(() => undefined);
      await waitForImages(cardElement as HTMLElement);

      if (wrapper) {
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'none';
        wrapper.style.filter = 'none';
      }
      (cardElement as HTMLElement).style.opacity = '1';
      (cardElement as HTMLElement).style.transform = 'none';
      (cardElement as HTMLElement).style.filter = 'none';
      (cardElement as HTMLElement).setAttribute('data-export-mode', 'true');
      
      const canvas = await html2canvas(cardElement, {
        backgroundColor: '#05070d',
        scale: 2,
        useCORS: true,
        logging: false,
      });

      restore();

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Failed to create PNG blob'))), 'image/png');
      });
      const url = URL.createObjectURL(blob);
      try {
        const link = document.createElement('a');
        link.download = `card-${cardId || Date.now()}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } finally {
        URL.revokeObjectURL(url);
      }
      toast.success(t('downloadSuccess'));
    } catch (error) {
      restore();
      console.error('Download error:', error);
      toast.error(t('downloadError'));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      isLoading={isDownloading}
      variant="outline"
      className="w-full"
    >
      {!isDownloading && <Download className="w-4 h-4 mr-2" />}
      {isDownloading ? t('downloading') : t('downloadCard')}
    </Button>
  );
};
