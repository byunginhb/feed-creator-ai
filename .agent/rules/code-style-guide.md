---
trigger: always_on
---

# 프로젝트 개발 가이드

## 1. 코드 스타일 및 포맷팅

### 일반 규칙

- **들여쓰기**: 2칸 스페이스 사용
- **세미콜론**: 항상 사용
- **따옴표**: 작은따옴표(') 사용 (JSX에서는 큰따옴표)
- **줄 길이**: 최대 100자
- **Prettier** 및 **ESLint** 설정 준수

### 파일 구조 (FSD 아키텍처)

Feature-Sliced Design 아키텍처를 사용하여 계층적으로 구성합니다.
프로젝트 타입에 따라 구조가 다릅니다.

#### A. Next.js App Router 프로젝트

Next.js App Router는 파일 시스템 기반 라우팅을 사용하므로, `app` 디렉토리는 라우팅만 담당하고 비즈니스 로직은 `src`에 FSD로 구성합니다.

```
project-root/
  ├── app/                    # Next.js 라우팅 (파일 기반)
  │   ├── (auth)/            # 라우트 그룹
  │   │   ├── login/
  │   │   │   └── page.tsx   # /login 경로
  │   │   └── register/
  │   │       └── page.tsx   # /register 경로
  │   │
  │   ├── (dashboard)/
  │   │   ├── layout.tsx     # 대시보드 레이아웃
  │   │   ├── page.tsx       # /dashboard 경로
  │   │   └── settings/
  │   │       └── page.tsx   # /dashboard/settings 경로
  │   │
  │   ├── api/               # API Routes
  │   │   └── users/
  │   │       └── route.ts
  │   │
  │   ├── layout.tsx         # 루트 레이아웃
  │   ├── page.tsx           # 홈페이지
  │   └── providers.tsx      # 전역 프로바이더
  │
  └── src/                   # FSD 아키텍처 (비즈니스 로직)
      ├── widgets/           # 위젯 레이어 (페이지를 구성하는 큰 블록)
      │   ├── header/
      │   │   ├── ui/
      │   │   │   ├── Header.tsx
      │   │   │   └── Navigation.tsx
      │   │   └── index.ts
      │   ├── sidebar/
      │   └── footer/
      │
      ├── features/          # 기능 레이어 (사용자 시나리오)
      │   ├── auth/
      │   │   ├── ui/
      │   │   │   ├── LoginForm.tsx
      │   │   │   └── RegisterForm.tsx
      │   │   ├── model/
      │   │   │   └── useAuth.ts
      │   │   ├── api/
      │   │   │   └── authApi.ts
      │   │   └── index.ts
      │   │
      │   ├── user-profile/
      │   │   ├── ui/
      │   │   ├── model/
      │   │   └── index.ts
      │   │
      │   └── search/
      │       ├── ui/
      │       ├── model/
      │       └── index.ts
      │
      ├── entities/          # 엔티티 레이어 (비즈니스 엔티티)
      │   ├── user/
      │   │   ├── ui/
      │   │   │   └── UserCard.tsx
      │   │   ├── model/
      │   │   │   └── types.ts
      │   │   ├── api/
      │   │   │   └── userApi.ts
      │   │   └── index.ts
      │   │
      │   ├── product/
      │   └── comment/
      │
      └── shared/            # 공유 레이어
          ├── ui/            # 공통 UI 컴포넌트
          │   ├── Button/
          │   │   ├── Button.tsx
          │   │   └── index.ts
          │   ├── Input/
          │   └── Modal/
          │
          ├── lib/           # 유틸리티 함수
          │   ├── formatDate.ts
          │   └── validation.ts
          │
          ├── api/           # API 설정
          │   └── client.ts
          │
          ├── config/        # 설정
          │   └── constants.ts
          │
          └── types/         # 공통 타입
              └── common.ts
```

**Next.js App Router 사용 예시:**

```typescript
// app/dashboard/page.tsx (라우팅만 담당)
import { DashboardWidget } from '@/src/widgets/dashboard';

export default function DashboardPage() {
  return <DashboardWidget />;
}

// src/widgets/dashboard/ui/DashboardWidget.tsx (비즈니스 로직)
import { UserProfileFeature } from '@/src/features/user-profile';
import { StatsCard } from '@/src/entities/stats';

export const DashboardWidget = () => {
  return (
    <div>
      <UserProfileFeature />
      <StatsCard />
    </div>
  );
};
```

#### B. 순수 React 프로젝트 (CRA, Vite 등)

순수 React 프로젝트에서는 FSD를 완전히 적용하며, pages 레이어가 라우팅을 담당합니다.

```
src/
  ├── app/                   # 애플리케이션 레이어
  │   ├── providers/         # 전역 프로바이더
  │   │   ├── RouterProvider.tsx
  │   │   └── QueryProvider.tsx
  │   ├── routes/            # 라우팅 설정
  │   │   └── index.tsx
  │   └── App.tsx
  │
  ├── pages/                 # 페이지 레이어
  │   ├── home/
  │   │   ├── ui/
  │   │   │   └── HomePage.tsx
  │   │   └── index.ts
  │   ├── profile/
  │   └── settings/
  │
  ├── widgets/               # 위젯 레이어
  │   ├── header/
  │   ├── sidebar/
  │   └── footer/
  │
  ├── features/              # 기능 레이어
  │   ├── auth/
  │   ├── user-profile/
  │   └── search/
  │
  ├── entities/              # 엔티티 레이어
  │   ├── user/
  │   ├── product/
  │   └── comment/
  │
  └── shared/                # 공유 레이어
      ├── ui/
      ├── lib/
      ├── api/
      ├── config/
      └── types/
```

### FSD 계층 규칙

1. **상위 계층은 하위 계층만 참조 가능** (단방향 의존성)

   - **Next.js**: app (라우팅) → widgets → features → entities → shared
   - **React**: app → pages → widgets → features → entities → shared
   - 하위 계층은 상위 계층을 import 할 수 없음

2. **같은 계층의 다른 슬라이스는 직접 참조 금지**

   - features/auth에서 features/profile을 직접 import 불가
   - 같은 계층 간 통신이 필요하면 상위 계층에서 조합

3. **각 슬라이스는 공개 API를 통해서만 접근**

   - 각 슬라이스의 index.ts를 통해서만 export
   - 내부 구현은 외부에 노출하지 않음

```typescript
// ✅ Good: index.ts를 통한 export
// src/features/auth/index.ts
export { LoginForm } from './ui/LoginForm';
export { useAuth } from './model/useAuth';

// 다른 곳에서 사용
import { LoginForm, useAuth } from '@/src/features/auth';

// ❌ Bad: 직접 import
import { LoginForm } from '@/src/features/auth/ui/LoginForm';
```

4. **Next.js 특수 규칙**
   - `app` 디렉토리의 page.tsx는 가능한 얇게 유지
   - 서버 컴포넌트와 클라이언트 컴포넌트 분리
   - 비즈니스 로직은 모두 `src`의 FSD 구조로 이동

```typescript
// ✅ Good: app은 라우팅만
// app/users/[id]/page.tsx
import { UserProfileWidget } from '@/src/widgets/user-profile';

export default async function UserPage({ params }: { params: { id: string } }) {
  return <UserProfileWidget userId={params.id} />;
}

// ❌ Bad: app에서 비즈니스 로직 처리
// app/users/[id]/page.tsx
export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await fetchUser(params.id); // ❌ 비즈니스 로직
  return <div>{user.name}</div>; // ❌ UI 로직
}
```

### 컴포넌트 분리 원칙

컴포넌트는 최대한 작게 나누어 관리합니다:

1. **단일 책임**: 한 컴포넌트는 하나의 명확한 역할만 수행
2. **100줄 제한**: 컴포넌트가 100줄을 넘어가면 분리 검토
3. **재사용성**: 2번 이상 사용되는 로직은 별도 컴포넌트로 분리
4. **Presentation/Container 패턴**: UI와 로직 분리 고려

```typescript
// ❌ Bad: 하나의 큰 컴포넌트
const UserProfile = () => {
  // 200줄의 복잡한 로직과 UI
};

// ✅ Good: 작은 컴포넌트로 분리
const UserProfile = () => (
  <div>
    <UserHeader user={user} />
    <UserStats stats={stats} />
    <UserPosts posts={posts} />
    <UserActions onEdit={handleEdit} />
  </div>
);
```

## 2. 컴포넌트 작성 규칙

### 컴포넌트 구조 순서

1. Import 문
2. 타입/인터페이스 정의
3. 컴포넌트 함수
4. 스타일 정의 (styled-components 사용 시)
5. Export 문

### 예시

```typescript
// 1. Import
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/common';

// 2. 타입 정의
interface UserCardProps {
  name: string;
  email: string;
  onEdit?: () => void;
}

// 3. 컴포넌트
export const UserCard: React.FC<UserCardProps> = ({ name, email, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // 효과 로직
  }, []);

  return (
    <div onMouseEnter={() => setIsHovered(true)}>
      <h3>{name}</h3>
      <p>{email}</p>
      {onEdit && <Button onClick={onEdit}>수정</Button>}
    </div>
  );
};
```

### 컴포넌트 작성 원칙

- **함수형 컴포넌트** 사용 (클래스 컴포넌트 지양)
- **단일 책임 원칙**: 하나의 컴포넌트는 하나의 역할만
- **Props Drilling 방지**: Context API나 상태 관리 라이브러리 활용
- **조건부 렌더링**: 삼항 연산자 또는 && 연산자 사용
- **리스트 렌더링**: 항상 고유한 key prop 사용

## 3. 네이밍 컨벤션

### 파일명

- **컴포넌트**: PascalCase (예: `UserCard.tsx`)
- **훅**: camelCase with 'use' prefix (예: `useAuth.ts`)
- **유틸리티**: camelCase (예: `formatDate.ts`)
- **상수**: UPPER_SNAKE_CASE (예: `API_ENDPOINTS.ts`)

### 변수 및 함수명

- **컴포넌트**: PascalCase (예: `UserProfile`)
- **함수/변수**: camelCase (예: `handleSubmit`, `userName`)
- **상수**: UPPER_SNAKE_CASE (예: `MAX_RETRY_COUNT`)
- **Private 변수**: underscore prefix (예: `_internalState`)
- **Boolean**: is/has/should prefix (예: `isLoading`, `hasError`)

### 이벤트 핸들러

- **handle** prefix 사용 (예: `handleClick`, `handleSubmit`)
- 컴포넌트에 전달할 때는 **on** prefix (예: `onClick`, `onSubmit`)

## 4. TypeScript 사용 규칙

### 타입 정의

- **any 사용 금지**: unknown 또는 구체적인 타입 사용
- **Interface vs Type**:
  - 객체 형태는 interface 선호
  - Union, Intersection은 type 사용
- **명시적 타입 선언**: 함수 반환 타입 명시

### 예시

```typescript
// ✅ Good
interface User {
  id: number;
  name: string;
  email: string;
}

type UserRole = 'admin' | 'user' | 'guest';

function getUser(id: number): Promise<User> {
  // ...
}

// ❌ Bad
function getUser(id: any) {
  // ...
}
```

### Props 타입

```typescript
// ✅ 명시적 Props 정의
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// children이 있는 경우
interface CardProps {
  title: string;
  children: React.ReactNode;
}
```

## 5. 훅(Hooks) 사용 규칙

### 기본 원칙

- **최상위 레벨에서만 호출**: 조건문, 반복문 내부 금지
- **React 함수 내에서만 호출**: 컴포넌트나 커스텀 훅에서만
- **커스텀 훅**: 'use'로 시작하는 이름 사용

### useState

```typescript
// ✅ 초기값 명확히
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// ✅ 함수형 업데이트 (이전 상태 기반)
setCount((prev) => prev + 1);
```

### useEffect

```typescript
// ✅ 의존성 배열 정확히 명시
useEffect(() => {
  fetchData();
}, [userId]); // userId 변경 시에만 실행

// ✅ 클린업 함수 사용
useEffect(() => {
  const subscription = subscribeToData();
  return () => subscription.unsubscribe();
}, []);
```

### 커스텀 훅

```typescript
// ✅ 재사용 가능한 로직 분리
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

## 6. 상태 관리

### 로컬 상태 vs 전역 상태

- **로컬 상태**: 단일 컴포넌트에서만 사용 → useState
- **공유 상태**: 여러 컴포넌트 → Context API 또는 Zustand/Recoil
- **서버 상태**: React Query / TanStack Query 사용 권장

### Context API 사용

```typescript
// context/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## 7. 성능 최적화

### React Compiler 사용

이 프로젝트는 **React Compiler**를 사용하여 자동 최적화를 수행합니다.

```typescript
// ✅ React Compiler가 자동으로 최적화 처리
// memo, useMemo, useCallback 사용 불필요

// 일반적인 컴포넌트 작성
export const UserList = ({ users }: { users: User[] }) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

// 일반적인 값 계산
const filteredUsers = users.filter((user) => user.isActive);
const totalCount = calculateTotal(items);

// 일반적인 함수 정의
const handleClick = () => {
  doSomething();
};
```

### 최적화 원칙

1. **React Compiler에 맡기기**

   - memo, useMemo, useCallback 사용 금지
   - 컴파일러가 자동으로 필요한 부분을 최적화

2. **수동 최적화가 필요한 경우**
   - 매우 복잡한 계산은 Web Worker 사용 고려
   - 무한 스크롤은 가상화 라이브러리 사용 (react-window, @tanstack/react-virtual)

```typescript
// ❌ Bad: 불필요한 메모이제이션
const value = useMemo(() => a + b, [a, b]);
const handleClick = useCallback(() => onClick(), [onClick]);

// ✅ Good: 자연스러운 코드 작성
const value = a + b;
const handleClick = () => onClick();
```

### 동적 임포트

```typescript
// 코드 스플리팅
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false,
});
```

### 이미지 최적화

```typescript
// Next.js Image 컴포넌트 사용
import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="설명"
  width={500}
  height={300}
  priority // LCP 이미지인 경우
/>;
```

## 8. 에러 처리

### try-catch 사용

```typescript
async function fetchUserData(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error('사용자 정보를 가져올 수 없습니다');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // 또는 적절한 에러 처리
  }
}
```

### Error Boundary

```typescript
// components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error