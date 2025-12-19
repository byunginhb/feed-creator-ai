# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 코드를 다룰 때 참고하는 가이드입니다.

## 빌드 및 개발 명령어

```bash
pnpm dev          # 개발 서버 시작
pnpm build        # 프로덕션 빌드
pnpm start        # 프로덕션 서버 시작
pnpm lint         # ESLint 실행
```

## 아키텍처 개요

이 프로젝트는 Google의 Gemini AI와 Imagen을 사용하여 URL에서 콘텐츠를 추출하고 이미지를 생성하여 소셜 미디어 요약 카드를 만드는 Next.js 16 애플리케이션입니다.

### Feature Slice Design (FSD) 구조

코드베이스는 `src/` 아래에서 FSD 아키텍처를 따릅니다:

- **entities/** - 핵심 도메인 모델 및 API 클라이언트
  - `card/` - 카드 데이터 타입, `/api/generate` API 호출, CardPreview 컴포넌트
  - `user/` - 사용자 타입 정의

- **features/** - 사용자 대면 기능
  - `card-create/` - URL로 카드를 생성하는 UrlInputForm
  - `card-save/` - SaveCardButton, Firebase 영속성 API
  - `card-download/` - html2canvas를 사용한 DownloadButton
  - `auth/` - Google 로그인, useAuth 훅

- **widgets/** - 페이지 수준 복합 컴포넌트
  - `studio/` - StudioLayout (메인 카드 생성 작업 공간)
  - `landing/` - Hero, Features, HowItWorks, ExampleCards, CTA
  - `dashboard/` - 저장된 카드 목록 CardList
  - `header/` - 사이트 헤더

- **shared/** - 공통 관심사
  - `lib/` - utils.ts (cn 헬퍼), firebase.ts 클라이언트 설정
  - `ui/` - Button, Input, AppToaster 컴포넌트
  - `config/` - 상수

### 주요 데이터 흐름

1. **카드 생성**: UrlInputForm → `/api/generate` (route.ts) → Cheerio 스크래핑 → Gemini 콘텐츠 생성 → Imagen 배경 이미지 → Card 타입 반환

2. **카드 저장**: SaveCardButton → cardSaveApi → Firebase Firestore

3. **카드 내보내기**: DownloadButton → html2canvas → PNG 다운로드

### 국제화 (i18n)

- `next-intl`을 사용한 로케일 라우팅 (`/[locale]/...`)
- 지원 로케일: `ko` (기본값), `en`
- 번역 파일: `messages/ko.json`, `messages/en.json`
- 설정: `src/i18n/routing.ts`, `src/i18n/request.ts`

### 백엔드 서비스

- **Firebase**: Auth (Google 로그인), Firestore (cards 컬렉션), Storage
- **Google AI**: 텍스트 요약을 위한 Gemini, 배경 이미지를 위한 Imagen
- 환경 변수는 `NEXT_PUBLIC_FIREBASE_*` 및 `NEXT_PUBLIC_GOOGLE_AI_STUDIO_API_KEY` 접두사 사용

### 테마

`next-themes`를 사용한 라이트/다크 모드 지원. CSS 변수는 `globals.css`에 정의되어 있습니다.
