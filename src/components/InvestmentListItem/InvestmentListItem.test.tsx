import { render, screen } from "@testing-library/react";
import InvestmentListItem, { InvestmentListItemProps } from "./InvestmentListItem";

const DEFAULT_PROPS = {
  year: 423234,
  amount: 5435423,
};

function createSut(props: InvestmentListItemProps) {
  return render(<InvestmentListItem {...props} />);
}

describe("InvestmentListItem", () => {
  it("should contain given year", () => {
    // when
    createSut(DEFAULT_PROPS);

    // then
    expect(screen.getByText("year 423234")).toBeInTheDocument();
  });

  it("should contain given amount", () => {
    // when
    createSut(DEFAULT_PROPS);

    // then
    expect(screen.getByText("5435423")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    // when
    const { container } = createSut(DEFAULT_PROPS);

    // then
    expect(container.firstChild).toMatchInlineSnapshot(`
      <li
        class="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
      >
        <div
          class="MuiListItemText-root css-tlelie-MuiListItemText-root"
        >
          <span
            class="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"
          >
            year 
            423234
          </span>
        </div>
        <div
          class="MuiListItemText-root css-tlelie-MuiListItemText-root"
        >
          <span
            class="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"
          >
            5435423
          </span>
        </div>
      </li>
    `);
  });
});
