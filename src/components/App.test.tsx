import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

function createSut() {
  return render(<App />);
}

async function waitForRender() {
  await screen.findByText("Investment panel")
}

describe("App", () => {
  it("should render", async () => {
    // when
    createSut();
    await waitForRender();

    // then
    expect(screen.getByText("Investment panel")).toBeInTheDocument();
  });

  it("should render investment annual growth", async () => {
    // given
    const amount = 312;
    const numberOfYears = 3;
    createSut();
    await waitForRender();

    // when
    fireEvent.change(screen.getByLabelText("Amount"), { target: { value: amount } });
    fireEvent.change(screen.getByLabelText("Number of years"), { target: { value: numberOfYears } });
    await waitForRender();

    // then
    const listItems = screen.getAllByRole("listitem");
    listItems.forEach((listItem, index) => {
      expect(listItem).toHaveTextContent(new RegExp(`.*year ${index}[0-9]+.*`, "i"));
    })
  })

  it.each`
    amount  | numberOfYears
    ${null} | ${1}
    ${1}    | ${null}
    ${2341} | ${0}
    ${5345} | ${-1}
    ${7543} | ${51}
    ${0}    | ${1}
    ${-1}   | ${1}
  `("should inform user when at least one of the inputs is empty or invalid", async ({ amount, numberOfYears }) => {
    // given
    createSut();
    await waitForRender();

    // when
    fireEvent.change(screen.getByLabelText("Amount"), { target: { value: amount } });
    fireEvent.change(screen.getByLabelText("Number of years"), { target: { value: numberOfYears } });
    await waitForRender();

    // then
    expect(screen.getByText("Please fill in investment form")).toBeInTheDocument();
  });

  it("should highlight error when numberOfYears is invalid", async () => {
    // given
    const numberOfYears = 423523;
    createSut();
    await waitForRender();

    // when
    fireEvent.change(screen.getByLabelText("Number of years"), { target: { value: numberOfYears } });
    await waitForRender();

    // then
    expect(screen.getByText('Input value between 1 and 50')).toHaveClass('Mui-error')
  })
});
