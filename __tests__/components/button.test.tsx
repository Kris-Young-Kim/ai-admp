import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";

/**
 * Button 컴포넌트 테스트
 * 
 * @file __tests__/components/button.test.tsx
 */

describe("Button", () => {
  it("텍스트가 있는 버튼을 렌더링해야 함", () => {
    render(<Button>클릭하세요</Button>);
    expect(screen.getByRole("button", { name: "클릭하세요" })).toBeInTheDocument();
  });

  it("클릭 이벤트가 정상적으로 작동해야 함", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>클릭</Button>);
    await user.click(screen.getByRole("button"));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 상태일 때 클릭되지 않아야 함", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button disabled onClick={handleClick}>비활성화</Button>);
    const button = screen.getByRole("button");
    
    expect(button).toBeDisabled();
    
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("다양한 variant가 정상적으로 적용되어야 함", () => {
    const { rerender } = render(<Button variant="default">기본</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");
    
    rerender(<Button variant="destructive">삭제</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
    
    rerender(<Button variant="outline">외곽선</Button>);
    expect(screen.getByRole("button")).toHaveClass("border");
  });

  it("다양한 size가 정상적으로 적용되어야 함", () => {
    const { rerender } = render(<Button size="sm">작은 버튼</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8");
    
    rerender(<Button size="lg">큰 버튼</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-10");
    
    rerender(<Button size="icon">아이콘</Button>);
    expect(screen.getByRole("button")).toHaveClass("size-9");
  });

  it("aria-label이 제공되면 접근성 속성이 적용되어야 함", () => {
    render(<Button aria-label="닫기">×</Button>);
    const button = screen.getByRole("button", { name: "닫기" });
    expect(button).toHaveAttribute("aria-label", "닫기");
  });

  it("키보드로 접근 가능해야 함", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>키보드 테스트</Button>);
    const button = screen.getByRole("button");
    
    button.focus();
    expect(button).toHaveFocus();
    
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

