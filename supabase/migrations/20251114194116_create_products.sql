-- Products 테이블 생성
-- 보조기기 제품 정보를 저장하는 테이블
-- 목적: 보조기기 제품 데이터베이스 (주기적 동기화)
-- 영향받는 테이블: products (신규 생성)

create table if not exists public.products (
    id uuid default gen_random_uuid() primary key,
    product_id varchar(100) not null unique,
    name varchar(500) not null,
    description text,
    category varchar(100),
    price_range_min integer,
    price_range_max integer,
    body_parts text[] not null,
    suitable_activities text[] not null,
    image_url text,
    average_rating decimal(3,2),
    review_count integer default 0,
    ai_tags jsonb,
    -- ai_tags: NLP 분석 결과
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

-- 테이블 소유자 설정
alter table public.products owner to postgres;

-- 테이블 설명 추가
comment on table public.products is '보조기기 제품 정보를 저장하는 테이블. 제품의 신체 부위, 활동, 가격 범위 등의 정보를 포함합니다.';

-- 인덱스 생성
-- 카테고리별 검색 최적화
create index if not exists idx_category on public.products(category);

-- 배열 컬럼 검색 최적화 (GIN 인덱스)
create index if not exists idx_body_parts on public.products using gin(body_parts);

-- Row Level Security (RLS) 비활성화
-- 개발 단계에서는 RLS를 끄고, 프로덕션에서는 활성화하는 것을 권장합니다
alter table public.products disable row level security;

-- 권한 부여
grant all on table public.products to anon;
grant all on table public.products to authenticated;
grant all on table public.products to service_role;

