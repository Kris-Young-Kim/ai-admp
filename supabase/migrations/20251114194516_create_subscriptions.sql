-- Subscriptions 테이블 생성
-- 구독 정보를 저장하는 테이블
-- 목적: Stripe 연계 구독 관리
-- 영향받는 테이블: subscriptions (신규 생성)

create table if not exists public.subscriptions (
    id uuid default gen_random_uuid() primary key,
    clerk_user_id text not null unique,
    
    plan varchar(50),
    -- plan: 'free', 'monthly', 'annual'
    stripe_customer_id text unique,
    stripe_subscription_id text unique,
    
    started_at timestamp with time zone default now() not null,
    renewal_at timestamp with time zone,
    cancelled_at timestamp with time zone,
    
    is_active boolean default true,
    
    metadata jsonb default '{}'::jsonb
);

-- 테이블 소유자 설정
alter table public.subscriptions owner to postgres;

-- 테이블 설명 추가
comment on table public.subscriptions is '구독 정보를 저장하는 테이블. Stripe와 연동하여 사용자 구독 상태를 관리합니다.';

-- 인덱스 생성
-- 사용자별 구독 조회 최적화
create index if not exists idx_clerk_user on public.subscriptions(clerk_user_id);

-- Row Level Security (RLS) 비활성화
-- 개발 단계에서는 RLS를 끄고, 프로덕션에서는 활성화하는 것을 권장합니다
alter table public.subscriptions disable row level security;

-- 권한 부여
grant all on table public.subscriptions to anon;
grant all on table public.subscriptions to authenticated;
grant all on table public.subscriptions to service_role;

