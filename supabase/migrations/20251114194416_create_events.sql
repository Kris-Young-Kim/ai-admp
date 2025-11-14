-- Events 테이블 생성
-- 분석 이벤트를 저장하는 테이블
-- 목적: 사용자 행동 분석 및 Google Analytics 동기화
-- 영향받는 테이블: events (신규 생성), sessions (참조)

create table if not exists public.events (
    id uuid default gen_random_uuid() primary key,
    session_id uuid references public.sessions(id) on delete cascade,
    event_name varchar(100) not null,
    
    event_data jsonb,
    -- event_data 예시: { "cta_location": "hero", "element_id": "btn_1" }
    
    user_agent text,
    ip_address inet,
    
    created_at timestamp with time zone default now() not null
);

-- 테이블 소유자 설정
alter table public.events owner to postgres;

-- 테이블 설명 추가
comment on table public.events is '분석 이벤트를 저장하는 테이블. 사용자 행동 추적 및 Google Analytics 동기화에 사용됩니다.';

-- 인덱스 생성
-- 이벤트 이름별 조회 최적화
create index if not exists idx_event_name on public.events(event_name);

-- 생성일 기준 조회 최적화
create index if not exists idx_created_at on public.events(created_at);

-- 복합 인덱스: 세션별 시간순 이벤트 조회 최적화
create index if not exists idx_events_session_time on public.events(session_id, created_at desc);

-- Row Level Security (RLS) 비활성화
-- 개발 단계에서는 RLS를 끄고, 프로덕션에서는 활성화하는 것을 권장합니다
alter table public.events disable row level security;

-- 권한 부여
grant all on table public.events to anon;
grant all on table public.events to authenticated;
grant all on table public.events to service_role;

