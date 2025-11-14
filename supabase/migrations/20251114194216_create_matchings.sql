-- Matchings 테이블 생성
-- AI 매칭 결과를 저장하는 테이블
-- 목적: 사용자 입력 정보와 AI 추천 결과를 기록
-- 영향받는 테이블: matchings (신규 생성), sessions (참조)

create table if not exists public.matchings (
    id uuid default gen_random_uuid() primary key,
    session_id uuid not null references public.sessions(id) on delete cascade,
    clerk_user_id text,
    
    -- 입력 정보
    primary_body_part varchar(50) not null,
    activities text[] not null,
    -- activities 예시: ['household', 'work', ...]
    budget_min integer not null,
    budget_max integer not null,
    
    -- 결과
    recommendations jsonb not null,
    -- recommendations: 상위 3개 상품 배열
    ai_processing_time_ms integer,
    match_accuracy_score decimal(3,1),
    
    -- 메타데이터
    device_type varchar(20),
    -- device_type: 'mobile', 'tablet', 'desktop'
    os varchar(50),
    created_at timestamp with time zone default now() not null
);

-- 테이블 소유자 설정
alter table public.matchings owner to postgres;

-- 테이블 설명 추가
comment on table public.matchings is 'AI 매칭 결과를 저장하는 테이블. 사용자 입력 정보와 추천된 상품 목록을 기록합니다.';

-- 인덱스 생성
-- 사용자별 매칭 기록 조회 최적화
create index if not exists idx_user_matchings on public.matchings(clerk_user_id);

-- 생성일 기준 조회 최적화
create index if not exists idx_created_at on public.matchings(created_at);

-- 복합 인덱스: 사용자별 최신 매칭 기록 조회 최적화
create index if not exists idx_matchings_user_date on public.matchings(clerk_user_id, created_at desc);

-- Row Level Security (RLS) 비활성화
-- 개발 단계에서는 RLS를 끄고, 프로덕션에서는 활성화하는 것을 권장합니다
alter table public.matchings disable row level security;

-- 권한 부여
grant all on table public.matchings to anon;
grant all on table public.matchings to authenticated;
grant all on table public.matchings to service_role;

