'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/src/shared/ui/button/Button';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  cardId?: string;
}

export const DownloadButton = ({ cardId }: DownloadButtonProps) => {
  const t = useTranslations('card');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const cardElement = document.getElementById('card-preview');
    if (!cardElement) {
      console.error('Card preview element not found');
      return;
    }

    try {
      setIsDownloading(true);
      
      const canvas = await html2canvas(cardElement, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `card-${cardId || Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      alert(t('downloadError'));
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

