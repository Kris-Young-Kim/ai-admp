-- Experts 테이블 생성
-- 전문가 프로필을 저장하는 테이블
-- 목적: 보조공학사, 작업치료사 등 전문가 정보 관리
-- 영향받는 테이블: experts (신규 생성)

create table if not exists public.experts (
    id uuid default gen_random_uuid() primary key,
    clerk_user_id text not null unique,
    
    name varchar(100) not null,
    specialties text[] not null,
    -- specialties 예시: ['upper_limb', 'elderly', ...]
    experience_years integer,
    bio text,
    profile_image_url text,
    
    -- 연계
    verified boolean default false,
    certification_number varchar(100),
    
    availability_json jsonb,
    -- availability_json 예시: { "mon": "09:00-18:00", ... }
    
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

-- 테이블 소유자 설정
alter table public.experts owner to postgres;

-- 테이블 설명 추가
comment on table public.experts is '전문가 프로필을 저장하는 테이블. 보조공학사, 작업치료사 등의 전문가 정보와 상담 가능 시간을 관리합니다.';

-- 인덱스 생성
-- 인증된 전문가 조회 최적화
create index if not exists idx_verified on public.experts(verified);

-- Row Level Security (RLS) 비활성화
-- 개발 단계에서는 RLS를 끄고, 프로덕션에서는 활성화하는 것을 권장합니다
alter table public.experts disable row level security;

-- 권한 부여
grant all on table public.experts to anon;
grant all on table public.experts to authenticated;
grant all on table public.experts to service_role;

