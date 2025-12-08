import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // 미들웨어에서 설정한 로케일을 사용하거나 기본 로케일 사용
  let locale = await requestLocale;

  // 유효하지 않은 로케일인 경우 기본 로케일 사용
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

