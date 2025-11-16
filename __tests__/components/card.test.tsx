import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

/**
 * Card 컴포넌트 테스트
 * 
 * @file __tests__/components/card.test.tsx
 */

describe("Card", () => {
  it("기본 카드를 렌더링해야 함", () => {
    render(<Card>카드 내용</Card>);
    const card = screen.getByText("카드 내용");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("rounded-lg", "border", "bg-card");
  });

  it("CardHeader, CardTitle, CardDescription이 정상적으로 렌더링되어야 함", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>카드 제목</CardTitle>
          <CardDescription>카드 설명</CardDescription>
        </CardHeader>
      </Card>
    );

    expect(screen.getByRole("heading", { name: "카드 제목" })).toBeInTheDocument();
    expect(screen.getByText("카드 설명")).toBeInTheDocument();
  });

  it("CardContent가 정상적으로 렌더링되어야 함", () => {
    render(
      <Card>
        <CardContent>
          <p>카드 본문 내용</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText("카드 본문 내용")).toBeInTheDocument();
  });

  it("CardFooter가 정상적으로 렌더링되어야 함", () => {
    render(
      <Card>
        <CardFooter>
          <button>액션 버튼</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByRole("button", { name: "액션 버튼" })).toBeInTheDocument();
  });

  it("전체 카드 구조가 정상적으로 렌더링되어야 함", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>전체 카드</CardTitle>
          <CardDescription>설명</CardDescription>
        </CardHeader>
        <CardContent>
          <p>본문</p>
        </CardContent>
        <CardFooter>
          <button>액션</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByRole("heading", { name: "전체 카드" })).toBeInTheDocument();
    expect(screen.getByText("설명")).toBeInTheDocument();
    expect(screen.getByText("본문")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "액션" })).toBeInTheDocument();
  });

  it("커스텀 className이 적용되어야 함", () => {
    render(<Card className="custom-class">커스텀 카드</Card>);
    const card = screen.getByText("커스텀 카드");
    expect(card).toHaveClass("custom-class");
  });
});

