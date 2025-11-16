-- Leads 테이블 생성
-- 랜딩 페이지에서 수집한 사용자 정보를 저장하는 테이블

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 테이블 소유자 설정
ALTER TABLE public.leads OWNER TO postgres;

-- 테이블 설명 추가
COMMENT ON TABLE public.leads IS '랜딩 페이지에서 수집한 사용자 정보를 저장하는 테이블';

-- Row Level Security (RLS) 비활성화
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;

-- 권한 부여
GRANT ALL ON TABLE public.leads TO anon;
GRANT ALL ON TABLE public.leads TO authenticated;
GRANT ALL ON TABLE public.leads TO service_role;

