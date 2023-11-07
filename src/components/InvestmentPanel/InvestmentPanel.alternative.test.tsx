import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import InvestmentPanel from "./InvestmentPanel";
import FETCH_GROWTH_RATE from "../../api/graphql/fetch-growth-rate";
import { ComponentType } from "react";

vi.mock("../../hocs/withPremiumAccountNotification", () => ({
  __esModule: true,
  default:
    <T extends object>(Component: ComponentType<T>) =>
    (props: T) => <Component {...props} />,
}));

function EnhancedComponent() {
  const mocks = [
    {
      request: {
        query: FETCH_GROWTH_RATE,
        variables: { id: 1 },
      },
      result: {
        data: {
          growthRate: {
            id: 134513,
            percentageRate: 53,
          },
        },
      },
    },
  ];

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <InvestmentPanel />
    </MockedProvider>
  );
}

function createSut() {
  return {
    user: userEvent.setup(),
    ...render(<EnhancedComponent />),
  };
}

async function waitForRender() {
  await screen.findByText("Investment panel");
}

describe("InvestmentPanel", () => {
  it("should render loading indicator", () => {
    // when
    createSut();

    // then
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should render growth rate", async () => {
    // when
    createSut();
    await waitForRender();

    // then
    await waitFor(() => {
      expect(screen.getByLabelText("Growth rate")).toHaveValue(0.53);
    });
  });

  it("should render investment annual growth", async () => {
    // given
    const amount = 312;
    const numberOfYears = 3;
    const { user } = createSut();
    await waitForRender();
    await user.type(screen.getByLabelText("Amount"), `${amount}`);
    await user.type(screen.getByLabelText("Number of years"), `${numberOfYears}`);

    // when
    await user.click(screen.getByRole("button", { name: "Calculate" }));

    // then
    const listItems = screen.getAllByRole("listitem");
    listItems.forEach((listItem, index) => {
      expect(listItem).toHaveTextContent(new RegExp(`.*year ${index}[0-9]+.*`, "i"));
    });
  });

  it.each`
    amount  | numberOfYears
    ${null} | ${1}
    ${1}    | ${null}
    ${2341} | ${0}
    ${5345} | ${-1}
    ${7543} | ${51}
    ${0}    | ${1}
    ${-1}   | ${1}
  `("should not calculate when at least one of the inputs is empty or invalid", async ({ amount, numberOfYears }) => {
    // given
    const { user } = createSut();
    await waitForRender();

    // when
    await user.type(screen.getByLabelText("Amount"), `${amount}`);
    await user.type(screen.getByLabelText("Number of years"), `${numberOfYears}`);
    await user.click(screen.getByRole("button", { name: "Calculate" }));

    // then
    expect(screen.getByText("Please fill in investment form")).toBeInTheDocument();
  });

  it.each([-0.1, 1.1])("should highlight error when growth rate=%s", async (growthRate) => {
    // given
    const { user } = createSut();
    await waitForRender();

    // when
    const input = screen.getByRole("spinbutton", { name: "Growth rate" });
    await user.clear(input);
    await user.type(input, `${growthRate}`);
    await user.click(screen.getByRole("button", { name: "Calculate" }));

    // then
    expect(screen.getByText("Input value should be between 0 and 1")).toHaveClass("Mui-error");
  });

  it("should highlight error when amount is invalid", async () => {
    // given
    const amount = 0;
    const { user } = createSut();
    await waitForRender();

    // when
    await user.type(screen.getByLabelText("Amount"), `${amount}`);
    await user.click(screen.getByRole("button", { name: "Calculate" }));

    // then
    expect(screen.getByText("Input value should be greater than 0")).toHaveClass("Mui-error");
  });

  it("should highlight error when numberOfYears is invalid", async () => {
    // given
    const numberOfYears = 423523;
    const { user } = createSut();
    await waitForRender();

    // when
    await user.type(screen.getByLabelText("Number of years"), `${numberOfYears}`);
    await user.click(screen.getByRole("button", { name: "Calculate" }));

    // then
    expect(screen.getByText("Input value between 1 and 50")).toHaveClass("Mui-error");
  });
});
