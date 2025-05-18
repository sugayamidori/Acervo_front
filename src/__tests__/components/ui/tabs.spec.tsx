import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@acervo/components/ui/tabs";

jest.mock("@acervo/lib/utils", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
}));

describe("Tabs Components", () => {
  const BasicTabs = ({ defaultValue = "tab1" }) => (
    <Tabs defaultValue={defaultValue} data-testid="tabs-root">
      <TabsList data-testid="tabs-list">
        <TabsTrigger value="tab1" data-testid="tab-trigger-1">
          Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" data-testid="tab-trigger-2">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3" data-testid="tab-trigger-3" disabled>
          Tab 3 (Disabled)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" data-testid="tab-content-1">
        Content for Tab 1
      </TabsContent>
      <TabsContent value="tab2" data-testid="tab-content-2">
        Content for Tab 2
      </TabsContent>
      <TabsContent value="tab3" data-testid="tab-content-3">
        Content for Tab 3
      </TabsContent>{" "}
    </Tabs>
  );

  test("renders the Tabs root, list, and triggers", () => {
    render(<BasicTabs />);

    expect(screen.getByTestId("tabs-root")).toBeInTheDocument();
    expect(screen.getByTestId("tabs-list")).toBeInTheDocument();
    expect(screen.getByTestId("tab-trigger-1")).toBeInTheDocument();
    expect(screen.getByTestId("tab-trigger-2")).toBeInTheDocument();
    expect(screen.getByTestId("tab-trigger-3")).toBeInTheDocument();
  });

  test("renders only the default active tab content", () => {
    render(<BasicTabs defaultValue="tab2" />);

    expect(screen.getByTestId("tab-content-1")).not.toBeVisible();
    expect(screen.getByTestId("tab-content-2")).toBeVisible();
    expect(screen.getByTestId("tab-content-3")).not.toBeVisible();
  });

  test("changes active tab and content on trigger click", async () => {
    render(<BasicTabs />);

    expect(screen.getByTestId("tab-trigger-1")).toHaveAttribute(
      "data-state",
      "active"
    );
    expect(screen.getByTestId("tab-content-1")).toBeVisible();
    expect(screen.getByTestId("tab-trigger-2")).toHaveAttribute(
      "data-state",
      "inactive"
    );
    expect(screen.getByTestId("tab-content-2")).not.toBeVisible();

    await userEvent.click(screen.getByTestId("tab-trigger-2"));

    await waitFor(() => {
      expect(screen.getByTestId("tab-trigger-1")).toHaveAttribute(
        "data-state",
        "inactive"
      );
      expect(screen.getByTestId("tab-content-1")).not.toBeVisible();
      expect(screen.getByTestId("tab-trigger-2")).toHaveAttribute(
        "data-state",
        "active"
      );
      expect(screen.getByTestId("tab-content-2")).toBeVisible();
    });
  });

  test("disables the disabled trigger", () => {
    render(<BasicTabs />);
    const disabledTrigger = screen.getByTestId("tab-trigger-3");

    expect(disabledTrigger).toHaveAttribute("data-disabled", "");
    expect(disabledTrigger).toBeDisabled();
  });

  test("clicking a disabled trigger does not change the active tab", async () => {
    render(<BasicTabs defaultValue="tab1" />);
    const disabledTrigger = screen.getByTestId("tab-trigger-3");
    const trigger1 = screen.getByTestId("tab-trigger-1");
    const content1 = screen.getByTestId("tab-content-1");
    const content2 = screen.getByTestId("tab-content-2");

    expect(trigger1).toHaveAttribute("data-state", "active");
    expect(content1).toBeVisible();
    expect(content2).not.toBeVisible();

    await userEvent.click(disabledTrigger);

    await waitFor(
      () => {
        expect(trigger1).toHaveAttribute("data-state", "active");
        expect(content1).toBeVisible();
        expect(content2).not.toBeVisible();
      },
      { timeout: 500 }
    );
  });

  test("passes className to components", async () => {
    render(
      <Tabs className="custom-tabs-class" data-testid="tabs-with-class">
        <TabsList className="custom-list-class" data-testid="list-with-class">
          <TabsTrigger
            value="test1"
            className="custom-trigger-class-1"
            data-testid="trigger-with-class-1"
          >
            Test 1
          </TabsTrigger>
          <TabsTrigger
            value="test2"
            className="custom-trigger-class-2"
            data-testid="trigger-with-class-2"
          >
            Test 2
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="test1"
          className="custom-content-class-1"
          data-testid="content-with-class-1"
        >
          Content 1
        </TabsContent>
        <TabsContent
          value="test2"
          className="custom-content-class-2"
          data-testid="content-with-class-2"
        >
          Content 2
        </TabsContent>
      </Tabs>
    );

    expect(screen.getByTestId("tabs-with-class")).toHaveClass(
      "custom-tabs-class"
    );
    expect(screen.getByTestId("list-with-class")).toHaveClass(
      "custom-list-class"
    );
    expect(screen.getByTestId("trigger-with-class-1")).toHaveClass(
      "custom-trigger-class-1"
    );
    expect(screen.getByTestId("trigger-with-class-2")).toHaveClass(
      "custom-trigger-class-2"
    );

    await userEvent.click(screen.getByTestId("trigger-with-class-1"));
    await waitFor(() => {
      expect(screen.getByTestId("content-with-class-1")).toHaveClass(
        "custom-content-class-1"
      );
      expect(screen.getByTestId("content-with-class-2")).not.toBeVisible();
    });

    await userEvent.click(screen.getByTestId("trigger-with-class-2"));
    await waitFor(() => {
      expect(screen.getByTestId("content-with-class-2")).toHaveClass(
        "custom-content-class-2"
      );
      expect(screen.getByTestId("content-with-class-1")).not.toBeVisible();
    });
  });
});
