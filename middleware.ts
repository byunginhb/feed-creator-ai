import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 다음 경로를 제외한 모든 경로명 매칭
  // - `/api`, `/trpc`, `/_next`, `/_vercel`로 시작하는 경로
  // - 점(.)을 포함하는 경로 (예: `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

