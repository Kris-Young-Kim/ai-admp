"use client"

/**
 * @file app/card-test/page.tsx
 * @description Card 컴포넌트 접근성 및 기능 테스트 페이지
 *
 * 이 페이지는 Card 컴포넌트의 접근성 속성과 다양한 기능을 테스트하기 위한 예제 페이지입니다.
 *
 * 주요 테스트 항목:
 * 1. 기본 카드 (shadow, border, radius)
 * 2. 호버 애니메이션
 * 3. 반응형 레이아웃
 * 4. 슬롯 구조 (header, body, footer)
 * 5. 접근성 (시맨틱 HTML)
 */

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star, Users, TrendingUp } from "lucide-react"

export default function CardTestPage() {
  return (
    <div className="container mx-auto py-10 max-w-6xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Card 컴포넌트 테스트</h1>
          <p className="text-muted-foreground mb-4">
            Card 컴포넌트의 다양한 기능과 접근성을 테스트합니다.
          </p>
        </div>

        {/* 기본 카드 테스트 */}
        <section aria-labelledby="basic-heading">
          <h2 id="basic-heading" className="text-2xl font-semibold mb-4">
            기본 카드 테스트
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>기본 카드</CardTitle>
                <CardDescription>shadow, border, radius가 적용된 기본 카드입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">이 카드는 기본 스타일이 적용되어 있습니다.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>콘텐츠만 있는 카드</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Header와 Footer 없이 Content만 있는 카드입니다.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm">모든 슬롯을 사용하지 않고 직접 콘텐츠를 넣을 수도 있습니다.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 호버 애니메이션 테스트 */}
        <section aria-labelledby="hover-heading">
          <h2 id="hover-heading" className="text-2xl font-semibold mb-4">
            호버 애니메이션 테스트
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>호버 시 그림자 증가</CardTitle>
                <CardDescription>마우스를 올리면 그림자가 커집니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">hover:shadow-lg transition-shadow</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle>호버 시 확대</CardTitle>
                <CardDescription>마우스를 올리면 약간 확대됩니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">hover:scale-[1.02] transition-all</p>
              </CardContent>
            </Card>

            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>호버 시 테두리 색상 변경</CardTitle>
                <CardDescription>마우스를 올리면 테두리 색상이 변경됩니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">hover:border-primary transition-colors</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 슬롯 구조 테스트 */}
        <section aria-labelledby="slots-heading">
          <h2 id="slots-heading" className="text-2xl font-semibold mb-4">
            슬롯 구조 테스트 (Header, Body, Footer)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>완전한 슬롯 구조</CardTitle>
                <CardDescription>Header, Content, Footer가 모두 있는 카드입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  이 카드는 모든 슬롯을 사용합니다. Header에는 제목과 설명이,
                  Content에는 본문 내용이, Footer에는 액션 버튼이 있습니다.
                </p>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>CardHeader: 제목과 설명</li>
                  <li>CardContent: 본문 내용</li>
                  <li>CardFooter: 액션 버튼</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button>액션 버튼</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Header와 Content만</CardTitle>
                <CardDescription>Footer 없이 Header와 Content만 있는 카드입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Footer가 없는 카드도 가능합니다. 필요에 따라 슬롯을 선택적으로 사용할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 반응형 레이아웃 테스트 */}
        <section aria-labelledby="responsive-heading">
          <h2 id="responsive-heading" className="text-2xl font-semibold mb-4">
            반응형 레이아웃 테스트
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <Card key={num} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">반응형 카드 {num}</CardTitle>
                  <CardDescription>화면 크기에 따라 열 개수가 변경됩니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    모바일: 1열, 태블릿: 2열, 데스크톱: 3열, 큰 화면: 4열
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 실제 사용 예시 */}
        <section aria-labelledby="examples-heading">
          <h2 id="examples-heading" className="text-2xl font-semibold mb-4">
            실제 사용 예시
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 상품 카드 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">보조기기 A</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.5</span>
                  </div>
                </div>
                <CardDescription>시각 장애인용 스크린 리더</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  고성능 스크린 리더로 웹사이트와 앱을 자유롭게 탐색하세요.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>1,234명 사용</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>인기 상품</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-2xl font-bold">₩299,000</span>
                <Button>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  장바구니
                </Button>
              </CardFooter>
            </Card>

            {/* 통계 카드 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">사용자 통계</CardTitle>
                <CardDescription>2025년 1월 기준</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold">12,345</p>
                    <p className="text-sm text-muted-foreground">총 사용자</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">98.5%</p>
                    <p className="text-sm text-muted-foreground">만족도</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  상세 보기
                </Button>
              </CardFooter>
            </Card>

            {/* 기능 카드 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">주요 기능</CardTitle>
                <CardDescription>AI 매칭 시스템의 핵심 기능</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>개인화된 추천</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>실시간 매칭</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>전문가 상담</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">더 알아보기</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* 접근성 테스트 */}
        <section aria-labelledby="accessibility-heading">
          <h2 id="accessibility-heading" className="text-2xl font-semibold mb-4">
            접근성 테스트
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card role="article" aria-labelledby="article-title">
              <CardHeader>
                <CardTitle id="article-title">시맨틱 HTML 사용</CardTitle>
                <CardDescription>role="article"과 aria-labelledby를 사용한 카드</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  이 카드는 role="article"과 aria-labelledby를 사용하여 스크린 리더가
                  카드의 구조를 이해할 수 있도록 했습니다.
                </p>
              </CardContent>
            </Card>

            <Card role="listitem">
              <CardHeader>
                <CardTitle>카드 그룹 사용</CardTitle>
                <CardDescription>role="listitem"을 사용한 카드</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  여러 카드를 그룹으로 표시할 때는 부모에 role="list",
                  각 카드에 role="listitem"을 사용합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 접근성 가이드 */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h2 className="text-lg font-semibold mb-2">접근성 검증 체크리스트</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>✓ 시맨틱 HTML 사용 (div 대신 적절한 HTML 요소)</li>
            <li>✓ 카드 제목은 CardTitle 사용 (h2, h3 등)</li>
            <li>✓ 카드 설명은 CardDescription 사용</li>
            <li>✓ 카드 그룹은 role="list"와 role="listitem" 사용</li>
            <li>✓ 클릭 가능한 카드는 button 또는 link로 감싸기</li>
            <li>✓ 키보드 네비게이션 지원 (Tab 키로 이동 가능)</li>
            <li>✓ 포커스 인디케이터 명확히 표시</li>
            <li>✓ 색상 대비 WCAG AA 준수</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

