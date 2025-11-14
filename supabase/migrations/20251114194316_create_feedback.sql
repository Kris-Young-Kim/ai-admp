-- Feedback 테이블 생성
-- 사용자 피드백을 저장하는 테이블
-- 목적: 추천 결과에 대한 사용자 평가 및 피드백 수집
-- 영향받는 테이블: feedback (신규 생성), matchings (참조)

create table if not exists public.feedback (
    id uuid default gen_random_uuid() primary key,
    matching_id uuid not null references public.matchings(id) on delete cascade,
    product_id varchar(100) not null,
    
    useful boolean not null,
    rating integer check (rating >= 1 and rating <= 5),
    comment text,
    
    created_at timestamp with time zone default now() not null
);

-- 테이블 소유자 설정
alter table public.feedback owner to postgres;

-- 테이블 설명 추가
comment on table public.feedback is '사용자 피드백을 저장하는 테이블. 추천된 상품에 대한 평가와 의견을 기록합니다.';

-- 인덱스 생성
-- 제품별 피드백 조회 최적화
create index if not exists idx_product_feedback on public.feedback(product_id);

-- Row Level Security (RLS) 비활성화
-- 개발 단계에서는 RLS를 끄고, 프로덕션에서는 활성화하는 것을 권장합니다
alter table public.feedback disable row level security;

-- 권한 부여
grant all on table public.feedback to anon;
grant all on table public.feedback to authenticated;
grant all on table public.feedback to service_role;

