-- Sessions 테이블 생성
-- Clerk 인증과 연동되는 사용자 세션 정보를 저장하는 테이블
-- 목적: 사용자 세션 관리 및 메타데이터 저장
-- 영향받는 테이블: sessions (신규 생성)

create table if not exists public.sessions (
    id uuid default gen_random_uuid() primary key,
    clerk_user_id text not null unique,
    email text not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    metadata jsonb default '{}'::jsonb
    -- metadata 예시: { "referral_code": "ABC123", "device": "mobile" }
);

-- 테이블 소유자 설정
alter table public.sessions owner to postgres;

-- 테이블 설명 추가
comment on table public.sessions is '사용자 세션 정보를 저장하는 테이블. Clerk 인증과 연동되며 세션별 메타데이터를 관리합니다.';

-- Row Level Security (RLS) 비활성화
-- 개발 단계에서는 RLS를 끄고, 프로덕션에서는 활성화하는 것을 권장합니다
alter table public.sessions disable row level security;

-- 권한 부여
grant all on table public.sessions to anon;
grant all on table public.sessions to authenticated;
grant all on table public.sessions to service_role;

