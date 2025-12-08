import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // 지원하는 모든 로케일 목록
  locales: ['ko', 'en'],

  // 로케일이 일치하지 않을 때 사용되는 기본 로케일
  defaultLocale: 'ko'
});

